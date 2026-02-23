import { getWmo, displayTemp } from '../../utils/weather.js'
import styles from './HourlyForecast.module.css'

/**
 * @param {{ hourly: object, settings: object }} props
 */
export default function HourlyForecast({ hourly, settings }) {
  const nowHour = new Date().getHours()

  const cards = Array.from({ length: 6 }, (_, i) => {
    const idx = Math.min(nowHour + i, (hourly.time?.length ?? 1) - 1)
    return {
      key:    i,
      time:   i === 0 ? 'NOW' : `${String((nowHour + i) % 24).padStart(2, '0')}:00`,
      temp:   hourly.temperature_2m?.[idx] ?? 0,
      wc:     hourly.weathercode?.[idx] ?? 0,
      active: i === 2,
    }
  })

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Hourly Forecast</h3>
      <div className={styles.scroll}>
        {cards.map(card => (
          <div key={card.key} className={`${styles.card} ${card.active ? styles.cardActive : ''}`}>
            <div className={`${styles.time} ${card.active ? styles.timeActive : ''}`}>{card.time}</div>
            <div className={styles.icon}>{getWmo(card.wc).icon}</div>
            <div className={styles.temp}>{displayTemp(card.temp, settings.celsius)}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}
