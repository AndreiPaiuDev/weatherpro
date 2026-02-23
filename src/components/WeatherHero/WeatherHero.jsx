import { getWmo, formatFullDate, displayTemp, displayWind } from '../../utils/weather.js'
import styles from './WeatherHero.module.css'
import DailyForecast from '../DailyForecast'

/**
 * @param {{ weather: object, settings: object }} props
 */
export default function WeatherHero({ weather, settings }) {
  const { current: c, daily, cityName, country } = weather
  const condition = getWmo(c.weathercode)
  const tempUnit  = settings.celsius ? 'C' : 'F'

  return (
    <div className={styles.hero}>
      <div className={styles.left}>
        {/* Location + date */}
        <div className={styles.locationRow}>
          <span className={styles.pin}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M536.5-503.5Q560-527 560-560t-23.5-56.5Q513-640 480-640t-56.5 23.5Q400-593 400-560t23.5 56.5Q447-480 480-480t56.5-23.5ZM480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg></span>
          <span className={styles.location}>{cityName}, {country}</span>
        </div>
        <div className={styles.date}>
          {daily?.time?.[0] ? formatFullDate(daily.time[0]) : ''}
        </div>

        {/* Temperature */}
        <div className={styles.tempRow}>
          <div className={styles.temp}>
            {displayTemp(c.temperature_2m, settings.celsius)}
            <span className={styles.tempUnit}>°{tempUnit}</span>
          </div>
          <div className={styles.conditionIcon}>{condition.icon}</div>
        </div>
        <div className={styles.conditionLabel}>{condition.label}</div>

        {/* Metric cards */}
        <div className={styles.metrics}>
          <MetricCard icon="💧" label="Humidity"   value={`${c.relativehumidity_2m}%`} />
          <MetricCard icon="💨" label="Wind Speed" value={displayWind(c.windspeed_10m, settings.windUnit)} />
          <MetricCard icon="☀️" label="UV Index"   value={`Low ${Math.round(c.uv_index)}`} />
        </div>
      </div>
      <div className={styles.right}>
        <DailyForecast daily={daily} settings={settings} />
      </div>
    </div>
  )
}

function MetricCard({ icon, label, value }) {
  return (
    <div className={styles.metricCard}>
      <div className={styles.metricIcon}>{icon}</div>
      <div className={styles.metricLabel}>{label}</div>
      <div className={styles.metricValue}>{value}</div>
    </div>
  )
}
