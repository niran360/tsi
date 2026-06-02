import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import VideoPlayer from './components/VideoPlayer'
import { useMatch } from './hooks/useMatches'
import './MinimalWatchPage.css'

function MinimalWatchPage() {
  const [searchParams] = useSearchParams()
  const matchId = searchParams.get('match') || '1'
  const navigate = useNavigate()

  const { match: stream, loading } = useMatch(matchId)
  const [fullscreen, setFullscreen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  if (loading) {
    return (
      <div className="minimal-watch-loading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a0c', color: '#fff' }}>
        <div className="spinner" style={{ border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #ff4b4b', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '1rem', color: '#8e8e93' }}>Loading match player...</p>
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
      <div className="minimal-watch-error" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a0c', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <h2>Match stream not found</h2>
        <p style={{ color: '#8e8e93', marginBottom: '1.5rem' }}>This match may not have a stream provisioned yet, or it is unavailable.</p>
        <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', background: '#ff4b4b', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className={`minimal-watch ${fullscreen ? 'fullscreen' : ''}`}>
      <div className="minimal-player">
        {/* Minimal Header */}
        <header className="minimal-header">
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

            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
        </header>

        <VideoPlayer 
          streamUrl={stream.streamUrl}
          layout="minimal"
          matchData={stream}
          onFullscreenChange={setFullscreen}
          showSidebar={showSidebar}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />
      </div>

      {/* Minimal Sidebar */}
      {showSidebar && !fullscreen && (
        <aside className="minimal-sidebar">
          <div className="sidebar-inner">
            <div className="stats-section">
              <h4>Possession</h4>
              <div className="possession-bar">
                <div className="bar-fill home" style={{ width: `${stream.stats?.possession?.home ?? 50}%` }}></div>
                <div className="bar-fill away" style={{ width: `${stream.stats?.possession?.away ?? 50}%` }}></div>
              </div>
              <div className="possession-text">
                {stream.stats?.possession?.home ?? 50}% — {stream.stats?.possession?.away ?? 50}%
              </div>
            </div>

            <div className="stats-section">
              <h4>Shots</h4>
              <div className="stat-row">
                <span>{stream.stats?.shots?.home ?? 0}</span>
                <span>—</span>
                <span>{stream.stats?.shots?.away ?? 0}</span>
              </div>
            </div>

            <div className="events-section">
              <h4>Events</h4>
              <div className="events-list">
                {stream.events && stream.events.length > 0 ? (
                  stream.events.map((event, i) => (
                    <div key={i} className="event-item">
                      <span className="event-time">{event.minute}'</span>
                      <span className="event-text">{event.player} ({event.type})</span>
                    </div>
                  ))
                ) : (
                  <p className="no-events" style={{ color: '#8e8e93', fontSize: '0.9rem', textAlign: 'center', padding: '1rem 0' }}>No major match events yet.</p>
                )}
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}

export default MinimalWatchPage
