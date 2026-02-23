import { useState } from 'react'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { icon: '⊞', label: 'Overview' },
  { icon: '⚙️', label: 'Settings' },
]

/**
 * @param {{
 *   activeNav: string,
 *   onNavClick: (label: string) => void,
 *   history: string[],
 *   onLocationClick: (city: string) => void,
 * }} props
 */
export default function Sidebar({ activeNav, onNavClick, history, onLocationClick }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleNavClick = (label) => {
    onNavClick(label)
    setDrawerOpen(false)
  }

  const handleLocationClick = (loc) => {
    onLocationClick(loc.split(',')[0].trim())
    setDrawerOpen(false)
  }

  const navButtons = NAV_ITEMS.map(({ icon, label }) => (
    <button
      key={label}
      className={`${styles.navBtn} ${activeNav === label ? styles.navBtnActive : ''}`}
      onClick={() => handleNavClick(label)}
    >
      <span className={styles.navIcon}>{icon}</span>
      {label}
    </button>
  ))

  const recentButtons = history.slice(0, 3).map(loc => (
    <button
      key={loc}
      className={styles.recentBtn}
      onClick={() => handleLocationClick(loc)}
    >
      <span>{loc}</span>
      <span className={styles.recentIcon}>🕐</span>
    </button>
  ))

  return (
    <>
      {/* ── Desktop vertical sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>💧</div>
          <div className={styles.logoTitle}>WeatherPro</div>
        </div>

        <nav className={styles.nav}>{navButtons}</nav>

        <div className={styles.recent}>
          <div className={styles.recentTitle}>Recent Locations</div>
          {recentButtons}
        </div>
      </aside>

      {/* ── Mobile top bar (hidden on desktop) ── */}
      <div className={styles.mobileTopBar}>
        <div className={styles.mobileLogo}>
          <div className={styles.logoIcon}>💧</div>
          <span className={styles.logoTitle}>WeatherPro</span>
        </div>
        <button
          className={styles.hamburger}
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      {/* ── Backdrop ── */}
      {drawerOpen && (
        <div className={styles.backdrop} onClick={() => setDrawerOpen(false)} />
      )}

      {/* ── Mobile drawer ── */}
      <aside className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`} aria-hidden={!drawerOpen}>
        <button
          className={styles.drawerClose}
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <div className={styles.logo}>
          <div className={styles.logoIcon}>💧</div>
          <div className={styles.logoTitle}>WeatherPro</div>
          <div className={styles.logoSub}>Pro Weather Dashboard</div>
        </div>

        <nav className={styles.nav}>{navButtons}</nav>

        <div className={styles.recent}>
          <div className={styles.recentTitle}>Recent Locations</div>
          {recentButtons}
        </div>
      </aside>
    </>
  )
}
