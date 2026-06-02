import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import VideoPlayer from './components/VideoPlayer'
import { useMatch } from './hooks/useMatches'
import './WatchMatchPage.css'

function WatchMatchPage() {
  const [searchParams] = useSearchParams()
  const matchId = searchParams.get('match') || '1'
  const navigate = useNavigate()

  const { match: stream, loading } = useMatch(matchId)
  const [fullscreen, setFullscreen] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const goBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="watch-match-page-loading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a0c', color: '#fff' }}>
        <div className="spinner" style={{ border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #ff4b4b', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '1rem', color: '#8e8e93' }}>Loading match stream...</p>
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
      <div className="watch-match-page-error" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a0c', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <h2>Stream not found</h2>
        <p style={{ color: '#8e8e93', marginBottom: '1.5rem' }}>This match may not have a stream provisioned yet, or it is unavailable.</p>
        <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', background: '#ff4b4b', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className={`watch-match-page ${fullscreen ? 'fullscreen' : ''}`}>
      <header className="watch-header">
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
          <h2>{stream.homeClub} vs {stream.awayClub}</h2>
        </div>
        <div className="header-actions">
          <button className="action-btn" title="Share">
            📤
          </button>
        </div>
      </header>

      <div className="watch-container">
        <div className={`main-content ${fullscreen ? 'fullscreen-mode' : ''}`}>
          {/* Video Player Component */}
          <VideoPlayer 
            streamUrl={stream.streamUrl}
            cameras={stream.cameras}
            layout="standard"
            matchData={stream}
            onFullscreenChange={setFullscreen}
          />

          {/* Stats Panel */}
          {showStats && !fullscreen && (
            <div className="stats-panel">
              <h3>Match Statistics</h3>
              <div className="stats-grid">
                <div className="stat-row">
                  <div className="stat-item">
                    <div className="stat-label">Possession</div>
                    <div className="stat-bars">
                      <div className="stat-bar home" style={{ width: `${stream.stats?.possession?.home ?? 50}%` }}>
                        {stream.stats?.possession?.home ?? 50}%
                      </div>
                      <div className="stat-bar away" style={{ width: `${stream.stats?.possession?.away ?? 50}%` }}>
                        {stream.stats?.possession?.away ?? 50}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stat-row-inline">
                  <div className="stat-item small">
                    <div className="stat-label">Shots</div>
                    <div className="stat-value">
                      <span className="home">{stream.stats?.shots?.home ?? 0}</span>
                      <span className="divider">-</span>
                      <span className="away">{stream.stats?.shots?.away ?? 0}</span>
                    </div>
                  </div>
                  <div className="stat-item small">
                    <div className="stat-label">Fouls</div>
                    <div className="stat-value">
                      <span className="home">{stream.stats?.fouls?.home ?? 0}</span>
                      <span className="divider">-</span>
                      <span className="away">{stream.stats?.fouls?.away ?? 0}</span>
                    </div>
                  </div>
                  <div className="stat-item small">
                    <div className="stat-label">Corners</div>
                    <div className="stat-value">
                      <span className="home">{stream.stats?.corners?.home ?? 0}</span>
                      <span className="divider">-</span>
                      <span className="away">{stream.stats?.corners?.away ?? 0}</span>
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
            <div className="sidebar-toggle">
              <button className={showChat ? 'active' : ''} onClick={() => {setShowChat(true); setShowStats(false)}}>Chat</button>
              <button className={!showChat ? 'active' : ''} onClick={() => {setShowChat(false); setShowStats(true)}}>Info</button>
            </div>
            {showChat ? (
              <div className="chat-panel">
                <h3>Live Commentary</h3>
                <div className="events-list">
                  {stream.events && stream.events.length > 0 ? (
                    stream.events.map((event, idx) => (
                      <div key={idx} className={`event-item ${event.type}`}>
                        <div className="event-minute">{event.minute}'</div>
                        <div className="event-content">
                          <div className="event-team">{event.team}</div>
                          <div className="event-description">
                            <strong>{event.player}</strong> - {event.description}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#8e8e93', padding: '2rem 0', textAlign: 'center' }}>No commentary available yet.</p>
                  )}
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
                    <span className="live-badge">● {(stream.status || 'unknown').toUpperCase()}</span>
                  </span>
                </div>

                <h4 style={{ marginTop: '1.5rem' }}>Key Events</h4>
                <div className="events-timeline">
                  {stream.events && stream.events.length > 0 ? (
                    stream.events.slice(0, 4).map((event, idx) => (
                      <div key={idx} className="timeline-event">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <small className="event-time">{event.minute}'</small>
                          <div className="event-text">{event.player} ({event.type})</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#8e8e93', fontSize: '0.9rem' }}>No events recorded.</p>
                  )}
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
