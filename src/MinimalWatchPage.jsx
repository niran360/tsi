import { useState, useRef, useEffect } from 'react'
import './MinimalWatchPage.css'

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
    stats: {
      possession: { home: 55, away: 45 },
      shots: { home: 8, away: 5 },
    },
    events: [
      { minute: 45, team: 'Ikoyi FC', player: 'Ahmed Hassan' },
      { minute: 38, team: 'Lekki United', player: 'Chisom Okoro' },
      { minute: 23, team: 'Ikoyi FC', player: 'Tunde Oladele' },
    ],
  },
}

function MinimalWatchPage() {
  const matchId = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('match')
  const stream = ottStreams[matchId] || ottStreams[1]

  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)
  const controlsTimeoutRef = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.play().catch(() => {})
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

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(controlsTimeoutRef.current)
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying && fullscreen) setShowControls(false)
      }, 3000)
    }

    playerRef.current?.addEventListener('mousemove', handleMouseMove)
    return () => playerRef.current?.removeEventListener('mousemove', handleMouseMove)
  }, [isPlaying, fullscreen])

  const toggleFullscreen = async () => {
    if (!fullscreen) {
      try {
        await playerRef.current?.requestFullscreen?.()
      } catch (e) {
        console.log('Fullscreen error:', e)
      }
    } else {
      try {
        await document.exitFullscreen?.()
      } catch (e) {
        console.log('Exit fullscreen error:', e)
      }
    }
    setFullscreen(!fullscreen)
  }

  return (
    <div className={`minimal-watch ${fullscreen ? 'fullscreen' : ''}`}>
      <div className="minimal-player" ref={playerRef}>
        <video
          ref={videoRef}
          className="minimal-video"
          autoPlay
          muted={isMuted}
          crossOrigin="anonymous"
        >
          <source src={stream.streamUrl} type="application/x-mpegURL" />
        </video>

        {/* Minimal Score */}
        <div className="minimal-score">
          <span className="team-info">
            <span className="name">{stream.homeClub}</span>
            <span className="goals">{stream.homeGoals}</span>
          </span>
          <span className="divider">–</span>
          <span className="team-info">
            <span className="goals">{stream.awayGoals}</span>
            <span className="name">{stream.awayClub}</span>
          </span>
        </div>

        {/* Minimal Controls - Auto-hide */}
        <div className={`minimal-controls ${showControls ? 'visible' : ''}`}>
          <div className="control-group top">
            <button className="ctrl-btn" onClick={() => window.history.back()}>
              ←
            </button>
            <div className="live-info">● {stream.minute}'</div>
            <button className="ctrl-btn" onClick={() => setShowSidebar(!showSidebar)}>
              {showSidebar ? '◀' : '▶'}
            </button>
          </div>

          <div className="control-group bottom">
            <div className="left">
              <button className="ctrl-btn" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? '⏸' : '▶'}
              </button>
              <div className="volume-group">
                <button className="ctrl-btn" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? '🔇' : '🔊'}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="volume-slider"
                />
              </div>
            </div>
            <button className="ctrl-btn fs-btn" onClick={toggleFullscreen}>
              ⛶
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Sidebar */}
      {showSidebar && (
        <aside className="minimal-sidebar">
          <div className="sidebar-inner">
            <div className="stats-section">
              <h4>Possession</h4>
              <div className="possession-bar">
                <div className="bar-fill home" style={{ width: `${stream.stats.possession.home}%` }}></div>
                <div className="bar-fill away" style={{ width: `${stream.stats.possession.away}%` }}></div>
              </div>
              <div className="possession-text">
                {stream.stats.possession.home}% — {stream.stats.possession.away}%
              </div>
            </div>

            <div className="stats-section">
              <h4>Shots</h4>
              <div className="stat-row">
                <span>{stream.stats.shots.home}</span>
                <span>—</span>
                <span>{stream.stats.shots.away}</span>
              </div>
            </div>

            <div className="events-section">
              <h4>Events</h4>
              <div className="events-list">
                {stream.events.map((event, i) => (
                  <div key={i} className="event-item">
                    <span className="event-time">{event.minute}'</span>
                    <span className="event-text">{event.player}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}

export default MinimalWatchPage
