import { useState } from 'react'
import './LiveMatchesPage.css'

const lagosClubs = [
  { id: 'all', name: 'All Clubs' },
  { id: 'ikoyi', name: 'Ikoyi FC' },
  { id: 'lekki', name: 'Lekki United' },
  { id: 'vi', name: 'VI Stars' },
  { id: 'surulere', name: 'Surulere Warriors' },
  { id: 'mushin', name: 'Mushin Elite' },
  { id: 'yaba', name: 'Yaba United' },
  { id: 'shomolu', name: 'Shomolu FC' },
  { id: 'bariga', name: 'Bariga Strikers' },
  { id: 'ibadan', name: 'Ibadan City FC' },
]

const allMatches = [
  {
    id: 1,
    homeClub: 'Ikoyi FC',
    awayClub: 'Lekki United',
    homeGoals: 2,
    awayGoals: 1,
    status: 'live',
    minute: 45,
    category: 'Premier League',
    time: '3:45 PM',
  },
  {
    id: 2,
    homeClub: 'VI Stars',
    awayClub: 'Surulere Warriors',
    homeGoals: null,
    awayGoals: null,
    status: 'upcoming',
    category: 'Premier League',
    time: 'Today, 6:00 PM',
  },
  {
    id: 3,
    homeClub: 'Mushin Elite',
    awayClub: 'Yaba United',
    homeGoals: 3,
    awayGoals: 2,
    status: 'completed',
    category: 'Premier League',
    time: 'Yesterday',
  },
  {
    id: 4,
    homeClub: 'Shomolu FC',
    awayClub: 'Bariga Strikers',
    homeGoals: 1,
    awayGoals: 1,
    status: 'completed',
    category: 'Cup',
    time: '2 days ago',
  },
  {
    id: 5,
    homeClub: 'Ikoyi FC',
    awayClub: 'Mushin Elite',
    homeGoals: null,
    awayGoals: null,
    status: 'upcoming',
    category: 'Premier League',
    time: 'Tomorrow, 4:00 PM',
  },
  {
    id: 6,
    homeClub: 'Lekki United',
    awayClub: 'VI Stars',
    homeGoals: 2,
    awayGoals: 0,
    status: 'completed',
    category: 'Premier League',
    time: '3 days ago',
  },
]

function LiveMatchesPage() {
  const [selectedClub, setSelectedClub] = useState('all')

  const filteredMatches = selectedClub === 'all'
    ? allMatches
    : allMatches.filter(match => {
        const clubName = selectedClub === 'ikoyi' ? 'Ikoyi FC'
          : selectedClub === 'lekki' ? 'Lekki United'
          : selectedClub === 'vi' ? 'VI Stars'
          : selectedClub === 'surulere' ? 'Surulere Warriors'
          : selectedClub === 'mushin' ? 'Mushin Elite'
          : selectedClub === 'yaba' ? 'Yaba United'
          : selectedClub === 'shomolu' ? 'Shomolu FC'
          : selectedClub === 'bariga' ? 'Bariga Strikers'
          : 'Ibadan City FC'
        return match.homeClub === clubName || match.awayClub === clubName
      })

  const liveMatch = filteredMatches.find(m => m.status === 'live')
  const upcomingMatches = filteredMatches.filter(m => m.status === 'upcoming')
  const completedMatches = filteredMatches.filter(m => m.status === 'completed')

  return (
    <div className="site">
      <header className="topbar">
        <div className="brand">
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
          <span>TSI Football Development</span>
        </div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/become-a-partner">Become a Partner</a>
        </nav>
      </header>

      <main>
        <section className="section live-matches-hero">
          <h1>Live Matches</h1>
          <p className="hero-description">
            Watch live amateur football in Lagos. Stream matches from top local clubs, track player performances, and stay connected with the action.
          </p>
        </section>

        <section className="section">
          <h2>Filter by Club</h2>
          <div className="club-selector">
            {lagosClubs.map(club => (
              <button
                key={club.id}
                className={`club-button ${selectedClub === club.id ? 'active' : ''}`}
                onClick={() => setSelectedClub(club.id)}
              >
                {club.name}
              </button>
            ))}
          </div>
        </section>

        {liveMatch && (
          <section className="section live-match-featured">
            <div className="live-badge">🔴 LIVE</div>
            <div className="featured-match">
              <div className="match-team">
                <div className="team-name">{liveMatch.homeClub}</div>
                <div className="team-score">{liveMatch.homeGoals}</div>
              </div>
              <div className="match-info">
                <div className="match-minute">{liveMatch.minute}'</div>
                <div className="match-category">{liveMatch.category}</div>
              </div>
              <div className="match-team away">
                <div className="team-score">{liveMatch.awayGoals}</div>
                <div className="team-name">{liveMatch.awayClub}</div>
              </div>
            </div>
            <div className="featured-actions">
              <a href="/watch-match-pro?match=1" className="cta">Watch Live (Enhanced)</a>
              <a href="/watch-match?match=1" className="ghost">Standard Player</a>
            </div>
          </section>
        )}

        {upcomingMatches.length > 0 && (
          <section className="section upcoming-matches-section">
            <h2>Upcoming Matches</h2>
            <div className="matches-list">
              {upcomingMatches.map(match => (
                <article key={match.id} className="match-card upcoming">
                  <div className="match-card-content">
                    <div className="match-teams">
                      <div className="team">
                        <span className="team-name">{match.homeClub}</span>
                      </div>
                      <div className="match-center">
                        <span className="vs-text">VS</span>
                        <span className="match-time">{match.time}</span>
                      </div>
                      <div className="team">
                        <span className="team-name">{match.awayClub}</span>
                      </div>
                    </div>
                    <div className="match-meta">
                      <span className="category">{match.category}</span>
                      <button className="cta-small">Reminder</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {completedMatches.length > 0 && (
          <section className="section completed-matches-section">
            <h2>Recent Results</h2>
            <div className="matches-list">
              {completedMatches.map(match => (
                <article key={match.id} className="match-card completed">
                  <div className="match-card-content">
                    <div className="match-teams">
                      <div className="team">
                        <span className="team-name">{match.homeClub}</span>
                        <span className="team-score">{match.homeGoals}</span>
                      </div>
                      <div className="match-center">
                        <span className="vs-text">-</span>
                        <span className="match-time">{match.time}</span>
                      </div>
                      <div className="team">
                        <span className="team-score">{match.awayGoals}</span>
                        <span className="team-name">{match.awayClub}</span>
                      </div>
                    </div>
                    <button className="cta-small">Replay</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {filteredMatches.length === 0 && (
          <section className="section no-matches">
            <p>No matches found for the selected club. Check back soon!</p>
          </section>
        )}
      </main>

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

export default LiveMatchesPage
