// src/constants/index.js
// ─────────────────────────────────────────────────────────────
// Single source of truth for all app-wide constants.
// Importing from here prevents magic strings scattered across files.
// ─────────────────────────────────────────────────────────────

export const ROUTES = {
  SPLASH:              '/',
  ROLE_SELECTION:      '/role',
  LOGIN:               '/login',
  
  // Citizen Routes
  DASHBOARD:           '/dashboard',
  DOCTOR_DIRECTORY:    '/doctors',
  DOCTOR_PROFILE:      '/doctors/:id',
  BOOK_APPOINTMENT:    '/doctors/:id/book',
  AI_SYMPTOM_CHECKER:  '/ai-checker',
  VIDEO_CONSULTATION:  '/consultation/:appointmentId',
  PRESCRIPTION:        '/prescriptions/:id',
  PRESCRIPTIONS_LIST:  '/prescriptions-list',
  PROFILE:             '/profile',
  MEDICINES:           '/medicines',

  // ASHA Routes
  ASHA_DASHBOARD:      '/asha/dashboard',
  ASHA_VILLAGERS:      '/asha/villagers',
  ASHA_VILLAGER_PROFILE:'/asha/villagers/:id',
  ASHA_VISITS:         '/asha/visits',
  ASHA_REPORTS:        '/asha/reports',
  ASHA_INSIGHTS:       '/asha/insights',
  ASHA_PROFILE:        '/asha/profile',

  // Doctor Routes
  DOCTOR_LOGIN:        '/doctor/login',
  DOCTOR_REGISTER:     '/doctor/register',
  DOCTOR_DASHBOARD:    '/doctor/dashboard',
  DOCTOR_PROFILE_MANAGE:'/doctor/profile-manage',
}

export const APP_NAME = 'Sehat Saathi'
export const APP_TAGLINE = 'Bringing Quality Healthcare Closer to Every Village.'

export const SPECIALIZATIONS = [
  'General Physician',
  'Pediatrician',
  'Gynecologist',
  'Orthopedic',
  'Cardiologist',
  'Dermatologist',
  'ENT Specialist',
  'Ophthalmologist',
  'Psychiatrist',
  'Neurologist',
  'Diabetologist',
  'Pulmonologist',
]

export const LANGUAGES = [
  'Hindi',
  'Punjabi',
  'English',
  'Haryanvi',
  'Urdu',
]

export const CONSULTATION_TYPES = [
  { id: 'video',    label: 'Video Call',   icon: 'Video',   description: 'Face-to-face consultation' },
  { id: 'audio',    label: 'Audio Call',   icon: 'Phone',   description: 'Voice consultation' },
  { id: 'chat',     label: 'Chat',         icon: 'MessageSquare', description: 'Text consultation' },
]

export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM',
]

export const URGENCY_LEVELS = {
  LOW:       { label: 'Low',       color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200' },
  MODERATE:  { label: 'Moderate',  color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  HIGH:      { label: 'High',      color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  EMERGENCY: { label: 'Emergency', color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200' },
}

// Keywords that trigger emergency warning in AI Symptom Checker
export const EMERGENCY_KEYWORDS = [
  'chest pain', 'heart attack', 'difficulty breathing', 'breathlessness',
  'stroke', 'unconscious', 'seizure', 'severe bleeding', 'high fever',
  'paralysis', 'severe headache', 'vomiting blood', 'fainting',
  'allergic reaction', 'anaphylaxis', 'overdose', 'poisoning',
]

export const AI_DISCLAIMER = 'This information is generated using AI and should not be considered a medical diagnosis. Please consult a qualified healthcare professional.'
export const AI_EMERGENCY_TEXT = 'EMERGENCY: Based on the symptoms described, please seek immediate emergency medical care. Call 108 (Ambulance) immediately.'
