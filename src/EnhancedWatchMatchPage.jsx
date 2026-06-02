import { useState, useRef, useEffect } from 'react'
import './EnhancedWatchMatchPage.css'

// Mock subscription tiers
const subscriptionTiers = {
  free: { name: 'Free', price: 0, features: ['HD', 'Limited ads', '1 stream'] },
  standard: { name: 'Standard', price: 2499, features: ['Full HD', 'No ads', '2 streams', 'Offline'] },
  premium: { name: 'Premium', price: 4999, features: ['4K', 'Priority support', '4 streams', 'Offline', 'Early access'] },
}

// Mock OTT content library
const contentLibrary = [
  {
    id: 1,
    title: 'Ikoyi FC vs Lekki United',
    category: 'Premier League',
    thumbnail: '/thumb-1.jpg',
    rating: 4.8,
    duration: '90m',
    date: 'Today',
    status: 'live',
  },
  {
    id: 2,
    title: 'Mushin Elite vs Yaba United',
    category: 'Premier League',
    thumbnail: '/thumb-2.jpg',
    rating: 4.5,
    duration: '90m',
    date: 'Yesterday',
    status: 'replay',
  },
  {
    id: 3,
    title: 'VI Stars vs Surulere Warriors',
    category: 'Cup',
    thumbnail: '/thumb-3.jpg',
    rating: 4.2,
    duration: '90m',
    date: 'Tomorrow',
    status: 'upcoming',
  },
]

// Mock OTT streams with enhanced data
const ottStreams = {
  1: {
    name: 'Ikoyi FC vs Lekki United',
    homeClub: 'Ikoyi FC',
    awayClub: 'Lekki United',
    homeGoals: 2,
    awayGoals: 1,
    minute: 45,
    status: 'live',
    category: 'Premier League',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x3iu7z4.m3u8',
    qualities: ['Auto', '1080p', '720p', '480p', '360p'],
    audioTracks: [
      { id: 'en', name: 'English Commentary', active: true },
      { id: 'yo', name: 'Yoruba Commentary', active: false },
    ],
    subtitles: [
      { id: 'en', name: 'English', active: true },
      { id: 'es', name: 'Spanish', active: false },
    ],
    cameras: [
      { id: 'main', name: 'Main Camera', active: true },
      { id: 'tactical', name: 'Tactical View', active: false },
      { id: 'crowd', name: 'Crowd View', active: false },
    ],
    stats: {
      possession: { home: 55, away: 45 },
      shots: { home: 8, away: 5 },
      fouls: { home: 3, away: 5 },
      corners: { home: 4, away: 2 },
    },
    events: [
      { minute: 45, team: 'Ikoyi FC', type: 'goal', player: 'Ahmed Hassan', description: 'Header from corner' },
      { minute: 38, team: 'Lekki United', type: 'goal', player: 'Chisom Okoro', description: 'Penalty kick' },
      { minute: 23, team: 'Ikoyi FC', type: 'goal', player: 'Tunde Oladele', description: 'Volley strike' },
    ],
  },
}

function EnhancedWatchMatchPage() {
  const matchId = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('match')
  const stream = ottStreams[matchId] || ottStreams[1]

  const videoRef = useRef(null)
  const [userProfile, setUserProfile] = useState({
    isLoggedIn: false,
    subscription: 'free',
    watchlist: [],
    favorites: [],
  })
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [quality, setQuality] = useState('Auto')
  const [activeCamera, setActiveCamera] = useState('main')
  const [activeAudio, setActiveAudio] = useState('en')
  const [activeSubtitle, setActiveSubtitle] = useState('en')
  const [showStats, setShowStats] = useState(true)
  const [showCommentary, setShowCommentary] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.play().catch(err => console.log('Play failed:', err))
    } else {
      video.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const toggleFullscreen = () => {
    const elem = document.querySelector('.enhanced-video-container')
    if (!fullscreen) {
      elem?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setFullscreen(!fullscreen)
  }

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
    window.history.back()
  }

  return (
    <div className={`enhanced-watch-page ${fullscreen ? 'fullscreen' : ''}`}>
      {/* Header */}
      <header className="enhanced-header">
        <div className="header-left">
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
            <video
              ref={videoRef}
              className="enhanced-video-player"
              autoPlay
              muted={isMuted}
              crossOrigin="anonymous"
            >
              <source src={stream.streamUrl} type="application/x-mpegURL" />
              Your browser does not support the video tag.
            </video>

            {/* Live Score Overlay */}
            <div className="enhanced-score-overlay">
              <div className="score-card">
                <div className="team-info home">
                  <div className="team-name">{stream.homeClub}</div>
                  <div className="score">{stream.homeGoals}</div>
                </div>
                <div className="match-info">
                  <div className="minute">{stream.minute}'</div>
                  <div className="vs">vs</div>
                  <div className="category">{stream.category}</div>
                </div>
                <div className="team-info away">
                  <div className="score">{stream.awayGoals}</div>
                  <div className="team-name">{stream.awayClub}</div>
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="enhanced-controls">
              <div className="controls-top">
                <div className="camera-options">
                  {stream.cameras.map(cam => (
                    <button
                      key={cam.id}
                      className={`cam-btn ${activeCamera === cam.id ? 'active' : ''}`}
                      onClick={() => setActiveCamera(cam.id)}
                      title={cam.name}
                    >
                      📹 {cam.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="controls-bottom">
                <div className="left-controls">
                  <button
                    className="control-icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>

                  <div className="volume-control">
                    <button
                      className="control-icon"
                      onClick={() => setIsMuted(!isMuted)}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? '🔇' : '🔊'}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={e => setVolume(parseFloat(e.target.value))}
                      className="volume-slider"
                    />
                  </div>

                  <select value={quality} onChange={e => setQuality(e.target.value)} className="quality-select">
                    {stream.qualities.map(q => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="right-controls">
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
                  <button className="control-icon" onClick={toggleFullscreen} title="Fullscreen">
                    ⛶
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="settings-panel">
              <h3>Playback Settings</h3>

              <div className="settings-group">
                <label>Audio Track</label>
                <div className="options">
                  {stream.audioTracks.map(track => (
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
                  {stream.subtitles.map(sub => (
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
            <button className={`tab ${showCommentary ? 'active' : ''}`} onClick={() => setShowCommentary(true)}>
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
                  <button className={`plan-btn ${key === 'free' ? 'secondary' : ''}`}>
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
