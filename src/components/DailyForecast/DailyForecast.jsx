import { getWmo, formatDay, displayTemp } from '../../utils/weather.js'
import styles from './DailyForecast.module.css'

/**
 * @param {{ daily: object, settings: object }} props
 */
export default function DailyForecast({ daily, settings }) {
  return (
    <div className={styles.forecast}>
      <div className={styles.header}>
        <span className={styles.title}>5-Day Forecast</span>
      </div>

      {daily.time.slice(1, 6).map((dateStr, i) => {
        const idx  = i + 1
        const cond = getWmo(daily.weathercode[idx])
        return (
          <div key={dateStr} className={styles.dayRow}>
            <span className={styles.dayName}>{i === 0 ? 'Tomorrow' : formatDay(dateStr)}</span>
            <span className={styles.dayIcon}>{cond.icon}</span>
            <span className={styles.dayCondition}>{cond.label}</span>
            <span className={styles.dayMax}>{displayTemp(daily.temperature_2m_max[idx], settings.celsius)}°</span>
            <span className={styles.dayMin}>{displayTemp(daily.temperature_2m_min[idx], settings.celsius)}°</span>
          </div>
        )
      })}
    </div>
  )
}
