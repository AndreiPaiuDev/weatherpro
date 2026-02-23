import { useState, useCallback, useEffect } from 'react'

import { useWeather }  from './hooks/useWeather'
import { useSettings } from './hooks/useSettings'
import { useHistory }  from './hooks/useHistory'

import Sidebar        from './components/Sidebar'
import SearchBar      from './components/SearchBar'
import WeatherHero    from './components/WeatherHero'
import DailyForecast  from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import StatCards      from './components/StatCards'
import SettingsModal  from './components/SettingsModal'
import WeatherMap     from './components/WeatherMap'

import styles from './App.module.css'

export default function App() {
  const [city, setCity]               = useState('London')
  const [activeNav, setActiveNav]     = useState('Overview')
  const [showSettings, setShowSettings] = useState(false)

  const { weather, loading, notice }  = useWeather(city)
  const { settings, updateSetting }   = useSettings()
  const { history, addToHistory, clearHistory } = useHistory()

  // Apply theme to <html> so CSS variables resolve correctly
  useEffect(() => {
    const root = document.documentElement
    if (settings.theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
      const handler = (e) => root.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
    root.setAttribute('data-theme', settings.theme)
  }, [settings.theme])

  const handleSearch = useCallback((query) => {
    setCity(query)
    addToHistory(query.charAt(0).toUpperCase() + query.slice(1))
  }, [addToHistory])

  const handleNavClick = useCallback((label) => {
    setActiveNav(label)
    if (label === 'Settings') setShowSettings(true)
  }, [])

  const handleCloseSettings = useCallback(() => {
    setShowSettings(false)
    setActiveNav('Overview')
  }, [])

  return (
    
    <div className="app-layout">
      <div className="light-orbs">
        <div className="orb blue"></div>
        <div className="orb cyan"></div>
        <div className="orb teal"></div>
        <div className="orb seal"></div>
      </div>



      <Sidebar
        activeNav={activeNav}
        onNavClick={handleNavClick}
        history={history}
        onLocationClick={handleSearch}
      />

      <div className="main-wrapper">
        <SearchBar onSearch={handleSearch} />

        <div className="scroll-area">
          {/* Notice banner */}
          {notice && (
            <div className={`notice notice--${notice.type}`}>
              <span>{notice.type === 'warn' ? '⚠️' : '❌'}</span>
              <span>{notice.msg}</span>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner" />
              <span>Loading weather data…</span>
            </div>
          )}

          {/* Content */}
          {!loading && weather && (
            <>
              {/* Hero panel: current weather + 5-day side-by-side */}
              <div className={styles.heroRow}>
                <WeatherHero weather={weather} settings={settings} />
              </div>

              <HourlyForecast hourly={weather.hourly} settings={settings} />

              {/* Weather map for next 5 hours cloud cover */}
              <WeatherMap
                latitude={weather.latitude || 0}
                longitude={weather.longitude || 0}
                hourly={weather.hourly}
              />

              <StatCards
                current={weather.current}
                daily={weather.daily}
                settings={settings}
              />
            </>
          )}
        </div>
      </div>

      {showSettings && (
        <SettingsModal
          settings={settings}
          onSettingChange={updateSetting}
          history={history}
          onClearHistory={clearHistory}
          onClose={handleCloseSettings}
        />
      )}
    </div>
  )
}
