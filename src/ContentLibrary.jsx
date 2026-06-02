import { useState } from 'react'
import './ContentLibrary.css'

const allContent = [
  {
    id: 1,
    title: 'Ikoyi FC vs Lekki United',
    category: 'Premier League',
    rating: 4.8,
    duration: '90m',
    date: 'Today',
    status: 'live',
    thumbnail: '🟢',
  },
  {
    id: 2,
    title: 'Mushin Elite vs Yaba United',
    category: 'Premier League',
    rating: 4.5,
    duration: '90m',
    date: 'Yesterday',
    status: 'replay',
    thumbnail: '🎬',
  },
  {
    id: 3,
    title: 'VI Stars vs Surulere Warriors',
    category: 'Cup',
    rating: 4.2,
    duration: '90m',
    date: 'Tomorrow',
    status: 'upcoming',
    thumbnail: '🔵',
  },
  {
    id: 4,
    title: 'Shomolu FC vs Bariga Strikers',
    category: 'League',
    rating: 4.0,
    duration: '90m',
    date: '3 days ago',
    status: 'replay',
    thumbnail: '🎬',
  },
  {
    id: 5,
    title: 'Training Session - Advanced Tactics',
    category: 'Training',
    rating: 4.7,
    duration: '45m',
    date: '5 days ago',
    status: 'replay',
    thumbnail: '📚',
  },
  {
    id: 6,
    title: 'Player Interviews & Behind the Scenes',
    category: 'Documentary',
    rating: 4.6,
    duration: '30m',
    date: '1 week ago',
    status: 'replay',
    thumbnail: '🎙️',
  },
]

const categories = ['All', 'Live', 'Upcoming', 'Replays', 'Training', 'Documentary']

function ContentLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRating, setSelectedRating] = useState(0)

  const filteredContent = allContent.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesStatus = selectedCategory === 'Live' ? item.status === 'live'
      : selectedCategory === 'Upcoming' ? item.status === 'upcoming'
      : selectedCategory === 'Replays' ? item.status === 'replay'
      : true
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRating = item.rating >= selectedRating

    return matchesCategory && matchesSearch && matchesRating && (selectedCategory === 'All' || matchesStatus)
  })

  const handleWatch = (id) => {
    window.location.href = `/watch-match-pro?match=${id}`
  }

  const goBack = () => {
    window.history.back()
  }

  return (
    <div className="library-page">
      {/* Header */}
      <header className="library-header">
        <button className="library-back-btn" onClick={goBack}>
          ← Back to Home
        </button>
        <h1>Content Library</h1>
        <div className="library-header-right">
          <span className="content-count">{filteredContent.length} items</span>
        </div>
      </header>

      {/* Filters */}
      <section className="library-filters">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search matches, teams, players..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="rating-filter">
          <label>Minimum Rating:</label>
          <div className="rating-options">
            {[0, 3.5, 4.0, 4.5, 4.8].map(rating => (
              <button
                key={rating}
                className={`rating-btn ${selectedRating === rating ? 'active' : ''}`}
                onClick={() => setSelectedRating(rating)}
              >
                {rating === 0 ? 'All' : `${rating}★+`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="library-grid">
        {filteredContent.length > 0 ? (
          filteredContent.map(item => (
            <div key={item.id} className="content-card">
              <div className="card-thumbnail">
                <div className="thumbnail-emoji">{item.thumbnail}</div>
                {item.status === 'live' && <span className="live-badge">● LIVE</span>}
                {item.status === 'upcoming' && <span className="upcoming-badge">⏰ Soon</span>}
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>

                <div className="card-meta">
                  <span className="category-tag">{item.category}</span>
                  <span className="duration">{item.duration}</span>
                </div>

                <div className="card-info">
                  <div className="rating">
                    {'★'.repeat(Math.floor(item.rating))}
                    <span className="rating-value">{item.rating}</span>
                  </div>
                  <span className="date">{item.date}</span>
                </div>

                <button
                  className={`watch-btn ${item.status === 'upcoming' ? 'disabled' : ''}`}
                  onClick={() => handleWatch(item.id)}
                  disabled={item.status === 'upcoming'}
                >
                  {item.status === 'live' ? 'Watch Now' : item.status === 'upcoming' ? 'Coming Soon' : 'Watch Replay'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No content found matching your filters.</p>
            <button className="reset-btn" onClick={() => {
              setSelectedCategory('All')
              setSearchQuery('')
              setSelectedRating(0)
            }}>
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default ContentLibrary
