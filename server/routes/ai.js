// server/routes/ai.js
// Express route handler for Gemini AI symptom analysis
// This is the ONLY place where the Gemini API key is used — server-side only

const express = require('express')
const { GoogleGenerativeAI } = require('@google/generative-ai')

const router = express.Router()

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

/**
 * Build the symptom analysis prompt
 */
const buildPrompt = (symptoms, patientContext = {}, hasEmergencyKeyword = false) => {
  const { age = 'Unknown', gender = 'Unknown', existingConditions = [] } = patientContext

  return `You are a preliminary AI health assistant for Sehat Saathi, a rural healthcare platform serving communities in Nabha, Punjab, India.

IMPORTANT RULES:
- NEVER diagnose diseases. Only provide preliminary guidance.
- Always recommend consulting a qualified doctor.
- If symptoms suggest an emergency (chest pain, difficulty breathing, stroke, unconsciousness, seizures, severe bleeding), clearly state it with urgencyLevel: EMERGENCY.
- Be sensitive to rural Indian healthcare context.
- Keep advice practical for people with limited medical access.
- Client has already detected emergency keywords: ${hasEmergencyKeyword}

Patient Context:
- Age: ${age}
- Gender: ${gender}
- Pre-existing Conditions: ${existingConditions.length > 0 ? existingConditions.join(', ') : 'None reported'}

Patient Symptoms:
${symptoms}

Respond ONLY with valid JSON in this exact structure:
{
  "urgencyLevel": "LOW | MODERATE | HIGH | EMERGENCY",
  "isEmergency": false,
  "emergencyMessage": null,
  "possibleConditions": ["list up to 3 possible general conditions, phrased non-diagnostically"],
  "generalAdvice": ["3-4 practical advice points"],
  "suggestedSpecialist": "which type of doctor to see",
  "homeCareRecommendations": ["2-3 safe home care steps if appropriate"],
  "whenToSeekHelp": "clear guidance on when to seek immediate care",
  "disclaimer": "This is AI-generated preliminary information and not a medical diagnosis. Please consult a qualified healthcare professional."
}

No markdown. No code fences. Pure JSON only.`
}

/**
 * POST /api/ai/symptoms
 * Body: { symptoms, patientContext, hasEmergencyKeyword }
 */
router.post('/symptoms', async (req, res) => {
  const { symptoms, patientContext, hasEmergencyKeyword } = req.body

  if (!symptoms || symptoms.trim().length < 3) {
    return res.status(400).json({ message: 'Please describe your symptoms in more detail.' })
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const prompt = buildPrompt(symptoms, patientContext, hasEmergencyKeyword)

    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()

    // Clean potential markdown code fences that Gemini sometimes adds
    const cleanedText = text
      .replace(/^```json\n?/, '')
      .replace(/^```\n?/, '')
      .replace(/\n?```$/, '')
      .trim()

    let parsed
    try {
      parsed = JSON.parse(cleanedText)
    } catch (parseErr) {
      console.error('[AI Route] Failed to parse Gemini response:', cleanedText)
      return res.status(500).json({
        message: 'AI response format error. Please try again.',
        raw: cleanedText,
      })
    }

    // Safety override: if client detected emergency keyword, force EMERGENCY level
    if (hasEmergencyKeyword && parsed.urgencyLevel !== 'EMERGENCY') {
      parsed.urgencyLevel = 'HIGH'
      parsed.isEmergency = false
    }

    return res.json(parsed)

  } catch (err) {
    console.error('[AI Route] Gemini API error:', err.message)

    // Check for quota/auth errors
    if (err.message?.includes('API_KEY')) {
      return res.status(500).json({ message: 'AI service configuration error.' })
    }
    if (err.message?.includes('quota') || err.status === 429) {
      return res.status(429).json({ message: 'AI service is busy. Please wait a moment and try again.' })
    }

    return res.status(500).json({ message: 'AI service temporarily unavailable. Please try again.' })
  }
})

module.exports = router
