// src/services/gemini.js
// This file is intentionally minimal — it's kept for frontend reference only.
// All actual Gemini API calls happen server-side in server/routes/ai.js
// to protect the API key. This file is where we'd add client-side streaming
// support in a future iteration.

export const GEMINI_ENDPOINT = '/api/ai/symptoms'

/**
 * Build a structured symptom analysis prompt for Gemini.
 * This is exported so the server can import it — but since server is Node.js,
 * this would need to be duplicated there. The canonical prompt is in server/routes/ai.js.
 * This copy is for documentation and potential future streaming use.
 */
export const buildSymptomPrompt = (symptoms, patientContext = {}) => {
  const { age = 'Unknown', gender = 'Unknown', existingConditions = [] } = patientContext

  return `You are a preliminary AI health assistant for Sehat Saathi, a rural healthcare platform serving communities in Nabha, Punjab, India.

IMPORTANT RULES:
- NEVER diagnose diseases. Only provide preliminary guidance.
- Always recommend consulting a qualified doctor.
- If symptoms suggest an emergency, clearly state it.
- Be sensitive to rural Indian healthcare context.
- Keep language simple and understandable.

Patient Context:
- Age: ${age}
- Gender: ${gender}
- Pre-existing Conditions: ${existingConditions.length > 0 ? existingConditions.join(', ') : 'None reported'}

Patient's Symptoms:
${symptoms}

Please provide a JSON response with the following structure:
{
  "urgencyLevel": "LOW | MODERATE | HIGH | EMERGENCY",
  "isEmergency": boolean,
  "emergencyMessage": "string or null",
  "possibleConditions": ["array of possible conditions (non-diagnostic)"],
  "generalAdvice": ["array of general advice points"],
  "suggestedSpecialist": "string (specialist type to consult)",
  "homeCareRecommendations": ["array of home care steps"],
  "whenToSeekHelp": "string describing when to seek immediate care",
  "disclaimer": "This is AI-generated preliminary information and not a medical diagnosis. Please consult a qualified healthcare professional."
}

Respond ONLY with valid JSON. No markdown, no code blocks, no extra text.`
}
