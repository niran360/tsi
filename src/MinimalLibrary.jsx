import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMatches } from './hooks/useMatches'
import { useAuth } from './hooks/useAuth'
import AuthModal from './components/AuthModal'
import PPVModal from './components/PPVModal'
import './MinimalLibrary.css'

const categories = ['All', 'Live', 'Upcoming', 'Replay', 'Training']

// PPV-gated match IDs — extend as needed
const PPV_MATCH_IDS = ['2', '3']

function MinimalLibrary() {
  const navigate = useNavigate()
  const { matches, loading } = useMatches()
  const { user, logout, activatePPV, hasPPV } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  const [ppvMatch, setPPVMatch] = useState(null) // match object awaiting PPV activation

  const filtered = matches.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchSearch) return false
    if (selectedCategory === 'All') return true
    if (selectedCategory === 'Live') return item.status === 'live'
    if (selectedCategory === 'Upcoming') return item.status === 'upcoming'
    if (selectedCategory === 'Replay') return item.status === 'replay'
    return item.category.toLowerCase() === selectedCategory.toLowerCase()
  })

  function handleWatch(item) {
    if (!user) {
      setShowAuth(true)
      return
    }
    if (item.status === 'upcoming') return
    // Check PPV gate
    if (PPV_MATCH_IDS.includes(String(item.id)) && !hasPPV(String(item.id))) {
      setPPVMatch(item)
      return
    }
    navigate(`/watch-match?match=${item.id}`)
  }

  function handlePPVActivate(matchId) {
    activatePPV(String(matchId))
    setPPVMatch(null)
    navigate(`/watch-match?match=${matchId}`)
  }

  return (
    <div className="minimal-library">
      <header className="library-header">
        <div className="banner-container">
          <img src="/img.png" alt="Live Matches" className="live-match-banner" />
          <div className="banner-overlay">
            <h1>Live Matches</h1>
          </div>

          {/* User chip in top-right of banner */}
          <div className="banner-user-area">
            {user ? (
              <div className="user-chip">
                <span className="user-avatar">👤</span>
                <span className="user-name">{user.name}</span>
                <button className="logout-btn" onClick={logout}>Sign out</button>
              </div>
            ) : (
              <button className="signin-chip" onClick={() => setShowAuth(true)}>
                Sign in
              </button>
            )}
          </div>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-box"
        />
      </header>

      <div className="filters-row">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-tag ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Auth wall — shown when no user AND they try to interact */}
      {!user && (
        <div className="auth-wall">
          <div className="auth-wall-inner">
            <div className="auth-wall-icon">📺</div>
            <h2>Members Only</h2>
            <p>Sign in or create a free account to watch live matches, replays, and exclusive content.</p>
            <button className="auth-wall-btn" onClick={() => setShowAuth(true)}>
              Sign In / Register
            </button>
            <p className="auth-wall-qr-hint">
              Got a reward QR code? Scan it for instant access.
            </p>
          </div>
        </div>
      )}

      {/* Grid — only shown when logged in */}
      {user && (
        <>
          {loading ? (
            <div className="loading-state" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <div className="spinner" style={{ border: '4px solid rgba(0,0,0,0.08)', borderTop: '4px solid #FC9005', borderRadius: '50%', width: '36px', height: '36px', margin: '0 auto 1rem', animation: 'spin 1s linear infinite' }} />
              <p>Loading talent matches...</p>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <div className="library-grid">
              {filtered.length > 0 ? (
                filtered.map(item => {
                  const isPPV = PPV_MATCH_IDS.includes(String(item.id))
                  const unlocked = hasPPV(String(item.id))
                  return (
                    <div key={item.id} className="library-card">
                      <div className="card-top">
                        <span className="card-badge">{item.category}</span>
                        {item.status === 'live' && <span className="live-dot">● LIVE</span>}
                        {isPPV && !unlocked && <span className="ppv-tag">PPV</span>}
                        {isPPV && unlocked && <span className="ppv-tag unlocked">✓ Unlocked</span>}
                      </div>
                      <h3>{item.title}</h3>
                      <div className="card-footer">
                        <span className="rating">★ {item.rating || 'N/A'}</span>
                        <span className="date">{item.date}</span>
                      </div>
                      <button
                        className={`card-btn ${item.status === 'upcoming' ? 'disabled' : ''}`}
                        onClick={() => handleWatch(item)}
                        disabled={item.status === 'upcoming'}
                      >
                        {item.status === 'upcoming' ? 'Soon' : isPPV && !unlocked ? '🎟️ PPV' : item.status === 'live' ? 'Watch' : 'Replay'}
                      </button>
                    </div>
                  )
                })
              ) : (
                <div className="empty-state">
                  <p>No matches found</p>
                  <button onClick={() => { setSelectedCategory('All'); setSearchQuery('') }}>
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onSuccess={() => setShowAuth(false)}
          onClose={() => setShowAuth(false)}
        />
      )}

      {/* PPV Modal */}
      {ppvMatch && (
        <PPVModal
          match={ppvMatch}
          onActivate={handlePPVActivate}
          onClose={() => setPPVMatch(null)}
        />
      )}
    </div>
  )
}

export default MinimalLibrary
