// src/utils/urgencyLevel.js
// Classifies AI response text into urgency levels for the symptom checker
// This is deliberately client-side — just for display classification of AI output

import { URGENCY_LEVELS, EMERGENCY_KEYWORDS } from '@/constants'

/**
 * Detect if symptom text contains emergency keywords
 * @param {string} text - User symptom input OR AI response text
 * @returns {boolean}
 */
export const isEmergency = (text) => {
  if (!text) return false
  const lower = text.toLowerCase()
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw))
}

/**
 * Get urgency level config object for a given level key
 * @param {'LOW' | 'MODERATE' | 'HIGH' | 'EMERGENCY'} level
 * @returns {object} - { label, color, bg, border }
 */
export const getUrgencyConfig = (level) => {
  return URGENCY_LEVELS[level] || URGENCY_LEVELS.LOW
}

/**
 * Parse urgency level from AI response text
 * The Gemini prompt is designed to include a structured urgency field.
 * This is a fallback parser for when the structured response is unavailable.
 * @param {string} aiText
 * @returns {'LOW' | 'MODERATE' | 'HIGH' | 'EMERGENCY'}
 */
export const parseUrgencyFromText = (aiText) => {
  if (!aiText) return 'LOW'
  const lower = aiText.toLowerCase()

  if (
    lower.includes('emergency') ||
    lower.includes('immediate') ||
    lower.includes('911') ||
    lower.includes('108') ||
    isEmergency(lower)
  ) return 'EMERGENCY'

  if (lower.includes('urgent') || lower.includes('high') || lower.includes('serious')) return 'HIGH'
  if (lower.includes('moderate') || lower.includes('consult') || lower.includes('monitor')) return 'MODERATE'
  return 'LOW'
}
