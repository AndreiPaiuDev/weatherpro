import { useState, useEffect, useCallback } from 'react'
import { buildMockWeather } from '../utils/weather'

const GEO_URL  = 'https://geocoding-api.open-meteo.com/v1/search'
const WTHR_URL = 'https://api.open-meteo.com/v1/forecast'
const TIMEOUT_MS = 7000

/**
 * Fetches weather for a given city string.
 * Falls back to mock data when the API is unreachable.
 *
 * @param {string} city
 * @returns {{ weather: object|null, loading: boolean, notice: {type,msg}|null }}
 */
export function useWeather(city) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notice,  setNotice]  = useState(null)

  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName?.trim()) return

    setLoading(true)
    setNotice(null)

    try {
      const ctrl  = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)

      const geoRes  = await fetch(`${GEO_URL}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`, { signal: ctrl.signal })
      const geoData = await geoRes.json()

      if (!geoData.results?.length) throw new Error('CITY_NOT_FOUND')

      const { latitude, longitude, name, country } = geoData.results[0]

      const params = new URLSearchParams({
        latitude, longitude,
        current:      'temperature_2m,weathercode,windspeed_10m,relativehumidity_2m,uv_index,surface_pressure,visibility,dewpoint_2m',
        hourly:       'temperature_2m,weathercode,cloud_cover',
        daily:        'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset',
        timezone:     'auto',
        forecast_days: '6',
      })
      const wthrRes  = await fetch(`${WTHR_URL}?${params}`, { signal: ctrl.signal })
      const wthrData = await wthrRes.json()

      clearTimeout(timer)
      setWeather({ ...wthrData, cityName: name, country })

    } catch {
      const mock = buildMockWeather(cityName)

      if (mock) {
        setWeather(mock)
        setNotice({
          type: 'warn',
          msg:  'Live API unavailable — showing demo data. Works fully when run locally with internet access.',
        })
      } else {
        const fallback = buildMockWeather('london')
        setWeather(fallback)
        setNotice({
          type: 'err',
          msg:  `"${cityName}" not in demo set. Showing London. Try: London, New York, Tokyo, Paris, Sydney, Dubai, Berlin, Mumbai.`,
        })
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWeather(city)
  }, [city, fetchWeather])

  return { weather, loading, notice }
}
