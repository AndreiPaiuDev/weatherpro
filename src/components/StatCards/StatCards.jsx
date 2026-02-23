import { displayTemp } from '../../utils/weather.js'
import styles from './StatCards.module.css'

/**
 * @param {{ current: object, daily: object, settings: object }} props
 */
export default function StatCards({ current: c, daily, settings }) {
  const sunrise = daily?.sunrise?.[0]?.split('T')[1] ?? '06:42'
  const visKm   = ((c.visibility ?? 10000) / 1000).toFixed(0)
  const unit    = settings.celsius ? 'C' : 'F'

  const cards = [
    { icon: '🌅', colorClass: styles.orange, label: 'Sunrise',    value: sunrise },
    { icon: '👁️',  colorClass: styles.blue,   label: 'Visibility', value: `${visKm} km` },
    { icon: '🔃', colorClass: styles.green,  label: 'Pressure',   value: `${Math.round(c.surface_pressure)} hPa` },
    { icon: '🌡️', colorClass: styles.purple, label: 'Dew Point',  value: `${displayTemp(c.dewpoint_2m, settings.celsius)}°${unit}` },
  ]

  return (
    <div className={styles.row}>
      {cards.map(card => (
        <div key={card.label} className={styles.card}>
          <div className={`${styles.iconWrap} ${card.colorClass}`}>{card.icon}</div>
          <div>
            <div className={styles.label}>{card.label}</div>
            <div className={styles.value}>{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
