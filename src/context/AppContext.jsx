// src/context/AppContext.jsx
// Global app state — user session, appointments, language preference
// Using Context + useReducer pattern for predictable state management
// Deliberately lightweight — no Redux overhead for a prototype

import { createContext, useContext, useReducer, useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useTranslation } from '@/utils/translations'
import appointmentsData from '@/data/appointments.json'

// ── Default user (mock — simulates logged-in rural patient) ──────────────────
const DEFAULT_USER = {
  id: 'u001',
  name: 'Simran Kaur',
  phone: '+91 98765 43210',
  age: 28,
  gender: 'Female',
  bloodGroup: 'B+',
  village: 'Barnala Road, Nabha',
  district: 'Patiala, Punjab',
  abhaId: 'ABHA-2345-6789-0123',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=simran&backgroundColor=ffd5dc',
  medicalHistory: ['Iron Deficiency Anemia', 'Seasonal Allergies'],
  allergies: ['Penicillin'],
  emergencyContact: { name: 'Ranjit Singh', relation: 'Husband', phone: '+91 87654 32109' },
  family: [
    { id: 'u002', name: 'Daljit Singh', relation: 'Father-in-law', age: 68, bloodGroup: 'O+', abhaId: 'ABHA-9876-5432-1098' },
    { id: 'u003', name: 'Aarav Singh', relation: 'Son', age: 4, bloodGroup: 'B+', abhaId: 'ABHA-4567-8901-2345' }
  ]
}

const initialState = {
  isAshaMode: false,
  isLowBandwidthMode: false,
  activeProfileId: 'u1',
  family: [
    { id: 'f1', name: 'Ramesh Singh', age: 45, gender: 'Male', relationship: 'Father', abhaId: '21-4321-8765-0987', bloodGroup: 'B+', village: 'Nabha', phone: '9876543210' },
    { id: 'f2', name: 'Sita Devi', age: 40, gender: 'Female', relationship: 'Mother', abhaId: 'Unlinked', bloodGroup: 'O+', village: 'Nabha', phone: '9876543211' }
  ],
  medicines: [
    { id: 1, name: 'Paracetamol 500mg', time: '08:00', period: 'Morning', type: 'After food', status: 'taken', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], dosage: '1 Tablet' },
    { id: 2, name: 'Amoxicillin 250mg', time: '13:00', period: 'Afternoon', type: 'After food', status: 'missed', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], dosage: '1 Capsule' },
    { id: 3, name: 'Vitamin C', time: '20:00', period: 'Night', type: 'Before food', status: 'upcoming', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], dosage: '1 Tablet' },
  ]
}

// ── Context ──────────────────────────────────────────────────────────────────
const AppContext = createContext(null)

// ── Reducer ──────────────────────────────────────────────────────────────────
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, activeProfile: action.payload }
    case 'LOGIN':
      return { ...state, user: action.payload, activeProfile: action.payload, isAuthenticated: true }
    case 'LOGOUT':
      return { ...state, user: null, activeProfile: null, isAuthenticated: false }
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [action.payload, ...state.appointments] }
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    case 'TOGGLE_ASHA_MODE':
      const newAshaMode = !state.isAshaMode
      return { 
        ...state, 
        isAshaMode: newAshaMode, 
        activeProfile: newAshaMode ? { name: 'New Patient (ASHA)', isAshaPatient: true, abhaId: 'Unlinked', village: 'Nabha Rural' } : state.user 
      }
    case 'TOGGLE_LOW_BANDWIDTH_MODE':
      return { ...state, isLowBandwidthMode: !state.isLowBandwidthMode }
    case 'SET_ACTIVE_PROFILE':
      return { ...state, activeProfileId: action.payload }
    case 'ADD_MEDICINE':
      return { ...state, medicines: [...state.medicines, action.payload] }
    case 'REMOVE_MEDICINE':
      return { ...state, medicines: state.medicines.filter(m => m.id !== action.payload) }
    case 'TOGGLE_MEDICINE':
      return {
        ...state,
        medicines: state.medicines.map(m => {
          if (m.id === action.payload) {
            return { ...m, status: m.status === 'taken' ? 'upcoming' : 'taken' }
          }
          return m;
        })
      }
    default:
      return state
  }
}

// ── Provider ─────────────────────────────────────────────────────────────────
export const AppProvider = ({ children }) => {
  const [persistedAuth, setPersistedAuth] = useLocalStorage('ss_auth', {
    isAuthenticated: false,
    user: null,
  })

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isAuthenticated: persistedAuth.isAuthenticated,
    user: persistedAuth.user || DEFAULT_USER,
    activeProfile: persistedAuth.user || DEFAULT_USER,
    appointments: appointmentsData,
    language: persistedAuth.language || 'en',
  })

  // We persist language in local storage as well for convenience
  const setPersistedLang = (lang) => {
    setPersistedAuth(prev => ({ ...prev, language: lang }))
  }

  const login = useCallback((userData = DEFAULT_USER) => {
    dispatch({ type: 'LOGIN', payload: userData })
    setPersistedAuth(prev => ({ ...prev, isAuthenticated: true, user: userData }))
  }, [setPersistedAuth])

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
    setPersistedAuth(prev => ({ ...prev, isAuthenticated: false, user: null }))
  }, [setPersistedAuth])

  const addAppointment = useCallback((appointment) => {
    dispatch({ type: 'ADD_APPOINTMENT', payload: appointment })
  }, [])

  const setLanguage = useCallback((lang) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang })
    setPersistedLang(lang)
  }, [setPersistedAuth])

  const toggleAshaMode = () => dispatch({ type: 'TOGGLE_ASHA_MODE' })
  const toggleLowBandwidthMode = () => dispatch({ type: 'TOGGLE_LOW_BANDWIDTH_MODE' })
  const setActiveProfile = (profile) => dispatch({ type: 'SET_ACTIVE_PROFILE', payload: profile.id })
  const addMedicine = (med) => dispatch({ type: 'ADD_MEDICINE', payload: med })
  const removeMedicine = (id) => dispatch({ type: 'REMOVE_MEDICINE', payload: id })
  const toggleMedicineStatus = (id) => dispatch({ type: 'TOGGLE_MEDICINE', payload: id })

  const t = useTranslation(state.language)

  return (
    <AppContext.Provider value={{ 
      ...state, 
      login, 
      logout, 
      addAppointment, 
      setLanguage, 
      toggleAshaMode, 
      toggleLowBandwidthMode, 
      setActiveProfile,
      medicines: state.medicines,
      addMedicine,
      removeMedicine,
      toggleMedicineStatus,
      t 
    }}>
      {children}
    </AppContext.Provider>
  )
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
