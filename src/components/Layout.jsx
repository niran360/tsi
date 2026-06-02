import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Do not show layout wrapper for Watch pages as they are full screen / customized
  const isWatchPage = location.pathname.startsWith('/watch-match')

  if (isWatchPage) {
    return <Outlet />
  }

  return (
    <div className="site">
      <header className="topbar">
        <div className="brand">
          <Link to="/">
            <img
              src="/logo.png"
              alt="TSI Logo"
              className="logo-image"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width="86"
              height="86"
            />
          </Link>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <span>TSI Football Development</span>
          </Link>
        </div>
        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav id="primary-nav" className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/live-matches" onClick={() => setMenuOpen(false)}>Live Matches</Link>
          <Link to="/become-a-partner" onClick={() => setMenuOpen(false)}>Become a Partner</Link>
        </nav>
      </header>

      <Outlet />

      <footer className="footer">
        <p>Built for football talent discovery and responsible player growth.</p>
        <div className="footer-socials" aria-label="Social links">
          <span>Follow us:</span>
          <div className="footer-social-links">
            <a href="https://instagram.com/talentsearchinitiative" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://facebook.com/talentsearchinitiative" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://x.com/talentsearchng" target="_blank" rel="noreferrer">X</a>
            <a href="https://linkedin.com/company/talent-search-initiative" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <small>2026 Talent Search Initiative</small>
      </footer>
    </div>
  )
}
