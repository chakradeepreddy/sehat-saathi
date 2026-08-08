// src/context/RoleContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const RoleContext = createContext(null)

export const RoleProvider = ({ children }) => {
  // Try to load role from local storage on mount
  const [role, setRoleState] = useState(() => {
    try {
      const stored = localStorage.getItem('ss_role')
      // Only return valid roles
      if (stored === 'CITIZEN' || stored === 'ASHA' || stored === 'DOCTOR') return stored
    } catch (error) {
      console.warn('Could not read role from localStorage', error)
    }
    return null
  })

  // Whenever role changes, persist it
  useEffect(() => {
    if (role) {
      localStorage.setItem('ss_role', role)
    } else {
      localStorage.removeItem('ss_role')
    }
  }, [role])

  const setRole = (newRole) => {
    if (newRole === 'CITIZEN' || newRole === 'ASHA' || newRole === 'DOCTOR' || newRole === null) {
      setRoleState(newRole)
    }
  }

  const isCitizen = role === 'CITIZEN'
  const isAsha = role === 'ASHA'
  const isDoctor = role === 'DOCTOR'

  return (
    <RoleContext.Provider value={{ role, setRole, isCitizen, isAsha, isDoctor }}>
      {children}
    </RoleContext.Provider>
  )
}

export const useRole = () => {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within a RoleProvider')
  return ctx
}
