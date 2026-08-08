// src/utils/location.js
// ─────────────────────────────────────────────────────────────
// Location utilities for calculating distances between coordinates
// using the Haversine formula.
// ─────────────────────────────────────────────────────────────

/**
 * Calculates the great-circle distance between two points on the Earth's surface.
 * @param {number} lat1 - Latitude of point 1 in decimal degrees
 * @param {number} lon1 - Longitude of point 1 in decimal degrees
 * @param {number} lat2 - Latitude of point 2 in decimal degrees
 * @param {number} lon2 - Longitude of point 2 in decimal degrees
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
    return null
  }
  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    return null
  }

  const R = 6371 // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  
  return distance
}

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180)
}

/**
 * Formats a distance in kilometers for display.
 * @param {number} distanceInKm 
 * @returns {string} Formatted distance (e.g., "1.2 km", "500 m")
 */
export const formatDistance = (distanceInKm) => {
  if (distanceInKm === null || distanceInKm === undefined) return 'Unknown'
  
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m`
  }
  return `${distanceInKm.toFixed(1)} km`
}

// Pre-defined fallback locations for the SIH prototype
export const LOCATIONS = {
  NABHA: { lat: 30.3752, lon: 76.1481, name: 'Nabha, Punjab' },
  PATIALA: { lat: 30.3398, lon: 76.3869, name: 'Patiala, Punjab' },
  RAJPURA: { lat: 30.4851, lon: 76.5928, name: 'Rajpura, Punjab' },
  SANGRUR: { lat: 30.2458, lon: 75.8436, name: 'Sangrur, Punjab' },
  CHANDIGARH: { lat: 30.7333, lon: 76.7794, name: 'Chandigarh' }
}
