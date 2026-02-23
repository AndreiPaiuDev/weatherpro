import { useEffect } from 'react'
import styles from './SettingsModal.module.css'

const THEMES = [
  { id: 'light',  icon: '☀️', label: 'Light Glass' },
  { id: 'dark',   icon: '🌙', label: 'Dark Glass'  },
  { id: 'system', icon: '🖥️', label: 'System'      },
]

const WIND_UNITS = [
  { id: 'kmh', label: 'Kilometers per hour (km/h)' },
  { id: 'mph', label: 'Miles per hour (mph)'       },
  { id: 'ms',  label: 'Meters per second (m/s)'    },
]

/**
 * @param {{
 *   settings: object,
 *   onSettingChange: (key: string, value: any) => void,
 *   history: string[],
 *   onClearHistory: () => void,
 *   onClose: () => void,
 * }} props
 */
export default function SettingsModal({ settings, onSettingChange, history, onClearHistory, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <aside className={styles.panel}>
        <div className={styles.glow} />

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <span>⚙️</span>
            <span>Settings</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close settings">
            ✕
          </button>
        </header>

        {/* Body */}
        <div className={styles.body}>

          {/* Theme */}
          <section className={styles.section}>
            <div className={styles.sectionLabel}>Theme</div>
            <div className={styles.themePicker}>
              {THEMES.map(t => (
                <button
                  key={t.id}
                  className={`${styles.themeBtn} ${settings.theme === t.id ? styles.themeBtnActive : ''}`}
                  onClick={() => onSettingChange('theme', t.id)}
                >
                  <span className={styles.themeBtnIcon}>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </section>

          {/* Temperature unit */}
          <section className={styles.section}>
            <div className={styles.sectionLabel}>Temperature Unit</div>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>
                {settings.celsius ? 'Celsius' : 'Fahrenheit'} / {settings.celsius ? 'Fahrenheit' : 'Celsius'}
              </span>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.celsius}
                  onChange={(e) => onSettingChange('celsius', e.target.checked)}
                />
                <span className={styles.toggleTrack} />
                <span className={styles.toggleThumb} />
              </label>
            </div>
          </section>

          {/* Wind speed unit */}
          <section className={styles.section}>
            <div className={styles.sectionLabel}>Wind Speed Unit</div>
            {WIND_UNITS.map(u => (
              <div
                key={u.id}
                className={`${styles.radioOption} ${settings.windUnit === u.id ? styles.radioOptionSelected : ''}`}
                onClick={() => onSettingChange('windUnit', u.id)}
                role="radio"
                aria-checked={settings.windUnit === u.id}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSettingChange('windUnit', u.id)}
              >
                <span className={styles.radioLabel}>{u.label}</span>
                <span className={styles.radioDot}>
                  {settings.windUnit === u.id && <span className={styles.radioDotInner} />}
                </span>
              </div>
            ))}
          </section>

          {/* History */}
          <section className={styles.section}>
            <div className={styles.historyHeader}>
              <div className={styles.sectionLabel} style={{ margin: 0 }}>History</div>
              {history.length > 0 && (
                <button className={styles.clearBtn} onClick={onClearHistory}>
                  🗑 CLEAR ALL
                </button>
              )}
            </div>
            <div className={styles.historyTags}>
              {history.length === 0
                ? <span className={styles.emptyHistory}>No history yet.</span>
                : history.map(loc => (
                    <span key={loc} className={styles.historyTag}>{loc}</span>
                  ))
              }
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className={styles.footer}>WeatherPro Version 1.0</footer>
      </aside>
    </div>
  )
}
