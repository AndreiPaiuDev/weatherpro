import { useState, useCallback } from 'react'

const STORAGE_KEY = 'liquidsky_settings'

const defaults = {
  theme:    'dark',   // 'light' | 'dark' | 'system'
  celsius:  true,
  windUnit: 'kmh',   // 'kmh' | 'mph' | 'ms'
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults
  } catch {
    return defaults
  }
}

function persist(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) } catch {}
}

/**
 * @returns {{ settings: object, updateSetting: function }}
 */
export function useSettings() {
  const [settings, setSettings] = useState(load)

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value }
      persist(next)
      return next
    })
  }, [])

  return { settings, updateSetting }
}
