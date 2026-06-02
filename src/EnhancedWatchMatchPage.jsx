import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import VideoPlayer from './components/VideoPlayer'
import { useMatch } from './hooks/useMatches'
import './EnhancedWatchMatchPage.css'

// Mock subscription tiers
const subscriptionTiers = {
  free: { name: 'Free', price: 0, features: ['HD', 'Limited ads', '1 stream'] },
  standard: { name: 'Standard', price: 2499, features: ['Full HD', 'No ads', '2 streams', 'Offline'] },
  premium: { name: 'Premium', price: 4999, features: ['4K', 'Priority support', '4 streams', 'Offline', 'Early access'] },
}

function EnhancedWatchMatchPage() {
  const [searchParams] = useSearchParams()
  const matchId = searchParams.get('match') || '1'
  const navigate = useNavigate()

  const { match: stream, loading } = useMatch(matchId)

  const [userProfile, setUserProfile] = useState({
    isLoggedIn: false,
    subscription: 'free',
    watchlist: [],
    favorites: [],
  })

  const [menuOpen, setMenuOpen] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [activeAudio, setActiveAudio] = useState('en')
  const [activeSubtitle, setActiveSubtitle] = useState('en')

  const handleLogin = () => {
    setUserProfile(prev => ({
      ...prev,
      isLoggedIn: true,
      subscription: 'standard',
    }))
  }

  const toggleWatchlist = () => {
    if (!userProfile.isLoggedIn) {
      setShowPremiumModal(true)
      return
    }
    setIsInWatchlist(!isInWatchlist)
  }

  const toggleFavorite = () => {
    if (!userProfile.isLoggedIn) {
      setShowPremiumModal(true)
      return
    }
    setIsFavorite(!isFavorite)
  }

  const goBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="enhanced-watch-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a0c', color: '#fff' }}>
        <div className="spinner" style={{ border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #ff4b4b', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '1rem', color: '#8e8e93' }}>Loading premium playback options...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!stream) {
    return (
      <div className="enhanced-watch-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a0c', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <h2>Premium stream not found</h2>
        <p style={{ color: '#8e8e93', marginBottom: '1.5rem' }}>This premium match may not have a stream provisioned yet, or it is unavailable.</p>
        <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', background: '#ff4b4b', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className={`enhanced-watch-page ${fullscreen ? 'fullscreen' : ''}`}>
      {/* Header */}
      <header className="enhanced-header">
        <div className="header-left">
          <button
            className={`watch-menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`watch-nav ${menuOpen ? 'nav-open' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/live-matches" onClick={() => setMenuOpen(false)}>Live Matches</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          </nav>

          <button className="back-btn" onClick={goBack}>
            ← Back
          </button>
          <div className="header-title">
            <span className="live-badge">● LIVE</span>
            <h1>{stream.homeClub} vs {stream.awayClub}</h1>
          </div>
        </div>

        <div className="header-right">
          <div className="user-section">
            {userProfile.isLoggedIn ? (
              <>
                <span className="subscription-badge">{subscriptionTiers[userProfile.subscription].name}</span>
                <div className="user-avatar">👤</div>
              </>
            ) : (
              <button className="login-btn" onClick={handleLogin}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="enhanced-watch-container">
        {/* Main Video Area */}
        <div className="main-watch-area">
          <div className="enhanced-video-container">
            <VideoPlayer 
              streamUrl={stream.streamUrl}
              cameras={stream.cameras}
              layout="enhanced"
              matchData={stream}
              onFullscreenChange={setFullscreen}
            />

            {/* Custom Controls Overlay for Enhanced Page (Favorites, Watchlist, Settings) */}
            <div className={`enhanced-custom-controls ${fullscreen ? 'fullscreen' : ''}`}>
               <button
                  className={`control-icon ${isFavorite ? 'active' : ''}`}
                  onClick={toggleFavorite}
                  title="Add to Favorites"
                >
                  {isFavorite ? '❤️' : '🤍'}
                </button>
                <button
                  className={`control-icon ${isInWatchlist ? 'active' : ''}`}
                  onClick={toggleWatchlist}
                  title="Add to Watchlist"
                >
                  📌
                </button>
                <button
                  className="control-icon"
                  onClick={() => setShowSettings(!showSettings)}
                  title="Settings"
                >
                  ⚙️
                </button>
                <button className="control-icon" title="Share" onClick={() => alert('Share: Coming soon!')}>
                  📤
                </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="settings-panel">
              <h3>Playback Settings</h3>

              <div className="settings-group">
                <label>Audio Track</label>
                <div className="options">
                  {stream.audioTracks?.map(track => (
                    <button
                      key={track.id}
                      className={`option-btn ${activeAudio === track.id ? 'active' : ''}`}
                      onClick={() => setActiveAudio(track.id)}
                    >
                      {track.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="settings-group">
                <label>Subtitles</label>
                <div className="options">
                  <button
                    className={`option-btn ${activeSubtitle === 'off' ? 'active' : ''}`}
                    onClick={() => setActiveSubtitle('off')}
                  >
                    Off
                  </button>
                  {stream.subtitles?.map(sub => (
                    <button
                      key={sub.id}
                      className={`option-btn ${activeSubtitle === sub.id ? 'active' : ''}`}
                      onClick={() => setActiveSubtitle(sub.id)}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Match Info Tabs */}
          <div className="match-info-tabs">
            <button className={`tab ${showStats ? 'active' : ''}`} onClick={() => setShowStats(true)}>
              Statistics
            </button>
            <button className={`tab ${!showStats ? 'active' : ''}`} onClick={() => setShowStats(false)}>
              Commentary
            </button>
          </div>
        </div>

        {/* Sidebar */}
        {!fullscreen && (
          <aside className="enhanced-sidebar">
            {showStats ? (
              <div className="stats-content">
                <h3>Match Statistics</h3>

                <div className="stat-group">
                  <div className="stat-row">
                    <span className="label">Possession</span>
                    <div className="bars">
                      <div className="bar home" style={{ width: `${stream.stats.possession.home}%` }}>
                        {stream.stats.possession.home}%
                      </div>
                      <div className="bar away" style={{ width: `${stream.stats.possession.away}%` }}>
                        {stream.stats.possession.away}%
                      </div>
                    </div>
                  </div>

                  <div className="stat-inline">
                    <div className="inline-stat">
                      <span className="label">Shots</span>
                      <span className="value">
                        {stream.stats.shots.home} - {stream.stats.shots.away}
                      </span>
                    </div>
                    <div className="inline-stat">
                      <span className="label">Fouls</span>
                      <span className="value">
                        {stream.stats.fouls.home} - {stream.stats.fouls.away}
                      </span>
                    </div>
                    <div className="inline-stat">
                      <span className="label">Corners</span>
                      <span className="value">
                        {stream.stats.corners.home} - {stream.stats.corners.away}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="commentary-content">
                <h3>Live Commentary</h3>
                <div className="events-feed">
                  {stream.events.map((event, idx) => (
                    <div key={idx} className={`event ${event.type}`}>
                      <div className="event-time">{event.minute}'</div>
                      <div className="event-details">
                        <div className="event-team">{event.team}</div>
                        <div className="event-desc">
                          <strong>{event.player}</strong> - {event.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Premium Recommendation */}
            {userProfile.subscription === 'free' && (
              <div className="premium-banner">
                <h4>Upgrade to Premium</h4>
                <p>Unlock 4K streaming and offline viewing</p>
                <button className="upgrade-btn" onClick={() => setShowPremiumModal(true)}>
                  See Plans →
                </button>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="modal-overlay" onClick={() => setShowPremiumModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPremiumModal(false)}>
              ✕
            </button>

            <h2>Choose Your Plan</h2>
            <div className="plans-grid">
              {Object.entries(subscriptionTiers).map(([key, tier]) => (
                <div key={key} className={`plan-card ${key === userProfile.subscription ? 'active' : ''}`}>
                  <h3>{tier.name}</h3>
                  <div className="price">
                    ₦{tier.price.toLocaleString()}
                    <span className="period">/month</span>
                  </div>
                  <ul className="features">
                    {tier.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                  <button className={`plan-btn ${key === 'free' ? 'secondary' : ''}`} onClick={() => setUserProfile(p => ({...p, subscription: key}))}>
                    {key === userProfile.subscription ? 'Current Plan' : 'Subscribe'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnhancedWatchMatchPage

