import { useMemo } from 'react'
import styles from './WeatherMap.module.css'

/**
 * Cloud icon based on coverage percentage
 * @param {number} pct  0-100
 */
function cloudIcon(pct) {
  if (pct <= 10) return '☀️'
  if (pct <= 30) return '🌤️'
  if (pct <= 60) return '⛅'
  if (pct <= 85) return '🌥️'
  return '☁️'
}

/**
 * @param {{ latitude: number, longitude: number, hourly: object }} props
 */
export default function WeatherMap({ latitude, longitude, hourly }) {
  // Windy embed showing cloud overlay centred on the location
  const mapUrl = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=7&overlay=clouds&product=ecmwf&level=surface&lat=${latitude}&lon=${longitude}`

  // Pick the next 5 hours of cloud cover from hourly data
  const cloudHours = useMemo(() => {
    if (!hourly?.time || !hourly?.cloud_cover) return []

    const now = Date.now()
    const startIdx = hourly.time.findIndex(t => new Date(t).getTime() >= now)
    const from = startIdx === -1 ? 0 : startIdx

    return hourly.time.slice(from, from + 5).map((t, i) => ({
      hour: new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pct:  hourly.cloud_cover[from + i] ?? 0,
    }))
  }, [hourly])

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapTitle}>Cloud Cover — Next 5 Hours</div>

      <iframe
        title="Cloud cover forecast map"
        src={mapUrl}
        className={styles.mapIframe}
        loading="lazy"
        allowFullScreen
      />


    </div>
  )
}
