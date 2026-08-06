// src/hooks/useLocalStorage.js
// Syncs state to localStorage — used for persisting user session across reloads

import { useState, useEffect } from 'react'

/**
 * A useState replacement that persists state to localStorage.
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value if key doesn't exist
 * @returns {[value, setter]} - same interface as useState
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (err) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (err) {
      console.warn(`[useLocalStorage] Error writing key "${key}":`, err)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
