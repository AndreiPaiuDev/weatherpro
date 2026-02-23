import { useState, useCallback } from 'react'

const STORAGE_KEY = 'liquidsky_history'
const MAX_ITEMS   = 8

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : ['London, UK', 'Birmingham, UK', 'Paris, FR', 'Barcelona, ES']
  } catch {
    return ['London, UK', 'Birmingham, UK', 'Paris, FR', 'Barcelona, ES']
  }
}

function persist(arr) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)) } catch {}
}

/**
 * @returns {{ history: string[], addToHistory: function, clearHistory: function }}
 */
export function useHistory() {
  const [history, setHistory] = useState(load)

  const addToHistory = useCallback((label) => {
    setHistory(prev => {
      const next = [label, ...prev.filter(h => h.toLowerCase() !== label.toLowerCase())].slice(0, MAX_ITEMS)
      persist(next)
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    persist([])
  }, [])

  return { history, addToHistory, clearHistory }
}
