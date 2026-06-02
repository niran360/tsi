import { useState, useRef, useEffect } from 'react'
import './WatchMatchPage.css'

// Mock OTT Streaming Service
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
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x3iu7z4.m3u8', // Test HLS stream
    qualities: ['Auto', '1080p', '720p', '480p', '360p'],
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
      { minute: 12, team: 'Lekki United', type: 'yellow', player: 'David Adebayo', description: 'Rough tackle' },
    ],
  },
}

function WatchMatchPage() {
  const matchId = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('match')
  const stream = ottStreams[matchId] || ottStreams[1]

  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.8)
  const [fullscreen, setFullscreen] = useState(false)
  const [quality, setQuality] = useState('Auto')
  const [activeCamera, setActiveCamera] = useState('main')
  const [showStats, setShowStats] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

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
    const elem = document.querySelector('.video-container')
    if (!fullscreen) {
      elem?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setFullscreen(!fullscreen)
  }

  const goBack = () => {
    window.history.back()
  }

  return (
    <div className={`watch-match-page ${fullscreen ? 'fullscreen' : ''}`}>
      <header className="watch-header">
        <button className="back-button" onClick={goBack}>
          ← Back to Matches
        </button>
        <div className="match-title">
          <span className="live-indicator">● LIVE</span>
          <h1>{stream.homeClub} vs {stream.awayClub}</h1>
        </div>
        <div className="header-actions">
          <button className="action-btn" title="Share">
            📤
          </button>
          <button className="action-btn" title="Fullscreen">
            ⛶
          </button>
        </div>
      </header>

      <div className="watch-container">
        <div className={`main-content ${fullscreen ? 'fullscreen-mode' : ''}`}>
          {/* Video Player */}
          <div className="video-container">
            <video
              ref={videoRef}
              className="video-player"
              autoPlay
              muted={isMuted}
              crossOrigin="anonymous"
            >
              <source src={stream.streamUrl} type="application/x-mpegURL" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <div className="video-controls">
              {/* Live Score Overlay */}
              <div className="live-score-overlay">
                <div className="score-display">
                  <div className="team-score home">
                    <div className="team-name">{stream.homeClub}</div>
                    <div className="goals">{stream.homeGoals}</div>
                  </div>
                  <div className="time-display">
                    <div className="minute">{stream.minute}'</div>
                    <div className="status">LIVE</div>
                  </div>
                  <div className="team-score away">
                    <div className="goals">{stream.awayGoals}</div>
                    <div className="team-name">{stream.awayClub}</div>
                  </div>
                </div>
              </div>

              {/* Camera Selection */}
              <div className="camera-selector">
                {stream.cameras.map(camera => (
                  <button
                    key={camera.id}
                    className={`camera-btn ${activeCamera === camera.id ? 'active' : ''}`}
                    onClick={() => setActiveCamera(camera.id)}
                    title={camera.name}
                  >
                    📷 {camera.name}
                  </button>
                ))}
              </div>

              {/* Control Bar */}
              <div className="control-bar">
                <div className="left-controls">
                  <button
                    className="control-btn"
                    onClick={() => setIsPlaying(!isPlaying)}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>

                  <div className="volume-control">
                    <button
                      className="control-btn"
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
                      title="Volume"
                    />
                  </div>

                  <div className="quality-selector">
                    <select
                      value={quality}
                      onChange={e => setQuality(e.target.value)}
                      className="quality-dropdown"
                      title="Video Quality"
                    >
                      {stream.qualities.map(q => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="right-controls">
                  <button
                    className="control-btn"
                    onClick={() => setShowStats(!showStats)}
                    title="Toggle Stats"
                  >
                    📊
                  </button>
                  <button
                    className="control-btn"
                    onClick={() => setShowChat(!showChat)}
                    title="Toggle Chat"
                  >
                    💬
                  </button>
                  <button
                    className="control-btn"
                    onClick={toggleFullscreen}
                    title="Fullscreen"
                  >
                    ⛶
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          {showStats && !fullscreen && (
            <div className="stats-panel">
              <h3>Match Statistics</h3>
              <div className="stats-grid">
                <div className="stat-row">
                  <div className="stat-item">
                    <div className="stat-label">Possession</div>
                    <div className="stat-bars">
                      <div className="stat-bar home" style={{ width: `${stream.stats.possession.home}%` }}>
                        {stream.stats.possession.home}%
                      </div>
                      <div className="stat-bar away" style={{ width: `${stream.stats.possession.away}%` }}>
                        {stream.stats.possession.away}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stat-row-inline">
                  <div className="stat-item small">
                    <div className="stat-label">Shots</div>
                    <div className="stat-value">
                      <span className="home">{stream.stats.shots.home}</span>
                      <span className="divider">-</span>
                      <span className="away">{stream.stats.shots.away}</span>
                    </div>
                  </div>
                  <div className="stat-item small">
                    <div className="stat-label">Fouls</div>
                    <div className="stat-value">
                      <span className="home">{stream.stats.fouls.home}</span>
                      <span className="divider">-</span>
                      <span className="away">{stream.stats.fouls.away}</span>
                    </div>
                  </div>
                  <div className="stat-item small">
                    <div className="stat-label">Corners</div>
                    <div className="stat-value">
                      <span className="home">{stream.stats.corners.home}</span>
                      <span className="divider">-</span>
                      <span className="away">{stream.stats.corners.away}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        {!fullscreen && (
          <aside className="sidebar">
            {showChat ? (
              <div className="chat-panel">
                <h3>Live Commentary</h3>
                <div className="events-list">
                  {stream.events.map((event, idx) => (
                    <div key={idx} className={`event-item ${event.type}`}>
                      <div className="event-minute">{event.minute}'</div>
                      <div className="event-content">
                        <div className="event-team">{event.team}</div>
                        <div className="event-description">
                          <strong>{event.player}</strong> - {event.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="info-panel">
                <h3>Match Details</h3>
                <div className="details-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{stream.category}</span>
                </div>
                <div className="details-item">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">
                    <span className="live-badge">● {stream.status.toUpperCase()}</span>
                  </span>
                </div>

                <h4 style={{ marginTop: '1.5rem' }}>Key Events</h4>
                <div className="events-timeline">
                  {stream.events.slice(0, 4).map((event, idx) => (
                    <div key={idx} className="timeline-event">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <small className="event-time">{event.minute}'</small>
                        <div className="event-text">{event.player}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="match-details-btn">View Full Match Details →</button>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  )
}

export default WatchMatchPage
