/**
 * Serialize data
 * @param data
 * @returns {object}
 */
export const serializeData = data => {
  const region = new Intl.DisplayNames(['en'], { type: 'region' })
  const regionName = region.of(data.sys.country.toUpperCase())

  return {
    id: data.id,
    name: data.name,
    country: regionName,
    countryAbbr: data.sys.country,
    weather: data.weather[0].main,
    temp: Math.round(data.main.temp),
    humidity: data.main.humidity,
    createdAt: new Date().toISOString()
  }
}

/**
 * Get geolocation
 * @returns {Promise<unknown>}
 */
export const getGeolocation = () => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  } else {
    console.warn('Geolocation is not supported by this browser.')
    return new Promise(resolve => resolve({}))
  }
}

/**
 * Get coords
 * @returns {Promise<{lon: number, lat: number}>}
 */
export const getCoords = async () => {
  try {
    const position = await getGeolocation()

    if (position.coords) {
      return {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
    }
  } catch (error) {
    console.error(`ERROR (${error.code}): ${error.message}`)
  }
}
