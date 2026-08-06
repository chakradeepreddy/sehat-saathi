// src/utils/formatDate.js
// Pure date formatting utilities — no side effects, fully testable

/**
 * Format a date string to a human-readable format
 * @param {string} dateStr - ISO date string e.g. "2026-08-08"
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string}
 */
export const formatDate = (dateStr, options = {}) => {
  const defaults = { day: 'numeric', month: 'long', year: 'numeric' }
  return new Date(dateStr).toLocaleDateString('en-IN', { ...defaults, ...options })
}

/**
 * Format a date to short form: "Aug 8"
 */
export const formatDateShort = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

/**
 * Get relative time string: "2 days ago", "in 3 hours"
 * Uses Intl.RelativeTimeFormat for locale support
 */
export const formatRelativeTime = (dateStr) => {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = date - now
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  if (Math.abs(diffDays) < 1) {
    const diffHours = Math.round(diffMs / (1000 * 60 * 60))
    return rtf.format(diffHours, 'hour')
  }
  return rtf.format(diffDays, 'day')
}

/**
 * Check if a date is today
 */
export const isToday = (dateStr) => {
  const today = new Date()
  const date = new Date(dateStr)
  return today.toDateString() === date.toDateString()
}

/**
 * Format appointment date display: "Today", "Tomorrow", or "Aug 8"
 */
export const formatAppointmentDate = (dateStr) => {
  const date = new Date(dateStr)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
  return formatDateShort(dateStr)
}
