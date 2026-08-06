import { useState } from 'react'
import Groq from 'groq-sdk'

// Initialize Groq. In production, this should ideally be called from a secure backend.
// For this prototype, we use Vite's env vars.
const API_KEY = import.meta.env.VITE_GROQ_API_KEY
const groq = API_KEY ? new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true }) : null

export const useGemini = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [response, setResponse] = useState(null)

  const analyzeSymptoms = async (symptoms, patientContext = {}, imageBase64 = null, imageMimeType = null) => {
    setLoading(true)
    setError(null)
    setResponse(null)

    if (!groq) {
      setError("Groq API key is missing. Add VITE_GROQ_API_KEY to .env.local")
      setLoading(false)
      throw new Error("Missing API Key")
    }

    try {
      const prompt = `You are an expert medical triage AI for a rural healthcare platform in India. Analyze the following symptoms and optionally an image (if provided).
      Patient Context: Age ${patientContext.age}, Gender ${patientContext.gender}.
      Symptoms/Query: ${symptoms}

      Respond strictly with this JSON schema:
      {
        "urgencyLevel": "LOW | MODERATE | HIGH | EMERGENCY",
        "isEmergency": boolean,
        "emergencyMessage": "String (actionable instructions if emergency) or null",
        "triageSummary": "Brief, compassionate overview of what this might be",
        "localTranslation": "Translate the triageSummary into simple Hindi",
        "possibleConditions": [
          { "name": "Condition name", "probability": number (0-100), "description": "Brief description" }
        ],
        "redFlags": ["List of warning signs that would require immediate care"],
        "timeline": "Expected timeline or when to see a doctor (e.g. 'Resolves in 3-5 days' or 'See a doctor within 24h')",
        "doctorPrep": "What the patient should track or prepare before seeing a doctor",
        "suggestedSpecialist": "E.g. General Physician, Dermatologist, Cardiologist",
        "doctorId": null,
        "homeCareRecommendations": ["List of actionable, safe home care advice (e.g. rest, ORS, paracetamol)"],
        "disclaimer": "This is AI-generated preliminary information and not a medical diagnosis. Please consult a qualified healthcare professional."
      }
      Ensure the output is valid JSON.`

      let modelToUse = "llama-3.3-70b-versatile"
      let content = [{ type: "text", text: prompt }]

      if (imageBase64 && imageMimeType) {
        modelToUse = "llama-3.2-11b-vision-preview"
        const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64
        content.push({
          type: "image_url",
          image_url: {
            url: `data:${imageMimeType};base64,${base64Data}`
          }
        })
      }

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: content
          }
        ],
        model: modelToUse,
        // response_format: { type: "json_object" } is only strictly supported on non-vision models currently
        // so we omit it for safety across both models and rely on prompting + stripping
      })

      let rawContent = completion.choices[0].message.content.trim()
      
      // Strip markdown code block if the model wraps the JSON
      if (rawContent.startsWith('```json')) {
        rawContent = rawContent.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
      } else if (rawContent.startsWith('```')) {
        rawContent = rawContent.replace(/^```\n?/, '').replace(/\n?```$/, '').trim()
      }

      const data = JSON.parse(rawContent)
      
      setResponse(data)
      setLoading(false)
      return data
    } catch (err) {
      console.error(err)
      setLoading(false)
      setError('Unable to analyze symptoms. Please check your API key and network connection.')
      throw err
    }
  }

  const reset = () => {
    setLoading(false)
    setError(null)
    setResponse(null)
  }

  return { analyzeSymptoms, loading, error, response, reset }
}
