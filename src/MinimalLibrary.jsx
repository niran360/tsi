import { useState } from 'react'
import './MinimalLibrary.css'

const allContent = [
  { id: 2, title: 'Mushin Elite vs Yaba United', category: 'Replay', rating: 4.5, date: 'Yesterday', status: 'replay' },
  { id: 3, title: 'VI Stars vs Surulere Warriors', category: 'Upcoming', rating: 4.2, date: 'Tomorrow', status: 'upcoming' },
  { id: 4, title: 'Shomolu FC vs Bariga Strikers', category: 'Replay', rating: 4.0, date: '3 days ago', status: 'replay' },
  { id: 5, title: 'Training Session - Advanced Tactics', category: 'Training', rating: 4.7, date: '5 days ago', status: 'replay' },
  { id: 6, title: 'Player Interviews & Behind the Scenes', category: 'Documentary', rating: 4.6, date: '1 week ago', status: 'replay' },
]

const categories = ['All', 'Upcoming', 'Replay', 'Training']

function MinimalLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = allContent.filter(item => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="minimal-library">
      <header className="library-header">
        <div className="header-top">
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back
          </button>
          <h1>Library</h1>
          <div></div>
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

      <div className="library-grid">
        {filtered.length > 0 ? (
          filtered.map(item => (
            <div key={item.id} className="library-card">
              <div className="card-top">
                <div className="card-badge">{item.category}</div>
                {item.status === 'live' && <div className="live-dot">●</div>}
              </div>
              <h3>{item.title}</h3>
              <div className="card-footer">
                <span className="rating">★ {item.rating}</span>
                <span className="date">{item.date}</span>
              </div>
              <button
                className={`card-btn ${item.status === 'upcoming' ? 'disabled' : ''}`}
                onClick={() => item.status !== 'upcoming' && (window.location.href = `/watch-match?match=${item.id}`)}
                disabled={item.status === 'upcoming'}
              >
                {item.status === 'live' ? 'Watch' : item.status === 'upcoming' ? 'Soon' : 'Replay'}
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No matches found</p>
            <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MinimalLibrary
