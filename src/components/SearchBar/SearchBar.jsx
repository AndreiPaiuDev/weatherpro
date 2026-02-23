import { useState } from 'react'
import styles from './SearchBar.module.css'

/**
 * @param {{ onSearch: (city: string) => void }} props
 */
export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = value.trim()
    if (q) { onSearch(q); setValue('') }
  }

  return (
    <div className={styles.topbar}>
      <form className={styles.searchWrap} onSubmit={handleSubmit}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Search for cities, airports, or coordinates..."
        />
      </form>
      <button type="button" className={styles.currentBtn} onClick={() => onSearch('London')}>
        📍 Use Current
      </button>
    </div>
  )
}
