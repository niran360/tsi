import { useEffect, useRef, useState } from 'react'
import './App.css'
import AboutPage from './AboutPage'
import BecomePartnerPage from './BecomePartnerPage'

const tracks = [
  {
    title: 'Street Talent Hunt',
    image: '/1.png',
    imageAlt: 'Players participating in street talent hunt',
    description:
      'Scouting and open Trials across Nigeria to discover raw football talent in underserved communities.',
  },
  {
    title: 'Training & Development',
    image: '/2.png',
    imageAlt: 'Structured football player development program',
    description:
      'Focused sessions in technical skill, tactical awareness, recovery habits, and match confidence.',
  },
  {
    title: 'Talent Showcase',
    image: '/3.png',
    imageAlt: 'Talent showcase for football players',
    description:
      'Tournaments and Matches against top local and regional teams to gain competitive experience and visibility with scouts.',
  },
  {
    title: 'Life Skills',
    image: '/4.png',
    imageAlt: 'Competitive match exposure opportunities',
    description:
      'Education and Guidance',
  },
]

const faqs = [
  {
    question: 'Who can apply?',
    answer:
      'Any committed player can start with trials. Age group windows and training level requirements are shared before each intake.',
  },
  {
    question: 'Do I need an agent to join?',
    answer:
      'No. Registration is direct and transparent. Players are selected based on merit during trials and development sessions.',
  },
  {
    question: 'How often are sessions held?',
    answer:
      'Core sessions run every week, with additional match days and workshops scheduled through each monthly cycle.',
  },
]

const aboutPillars = [
  {
    title: 'Talent Discovery',
    description:
      'We actively search for hidden gems with talent, drive, and long-term potential. Through structured screening and assessment, we identify candidates with technical quality, character, and commitment.',
  },
  {
    title: 'Inclusive Opportunity',
    description:
      'Opportunity should be accessible to everyone. We engage talent from underserved communities and underrepresented backgrounds, then provide career guidance, interview preparation, and professional support to level the playing field.',
  },
  {
    title: 'Skills Development',
    description:
      'Beyond identification, we invest in growth. Participants receive mentorship, targeted training, and practical coaching to strengthen technical ability, communication, leadership, and collaboration.',
  },
  {
    title: 'Career Impact',
    description:
      'We connect capable individuals to employers and pathways across technology, finance, engineering, sports, agriculture, and creative industries, helping organisations recruit motivated professionals efficiently.',
  },
]

const founders = [
  {
    name: 'Femi Adebayo Davies',
    role: 'Regional Strategist',
    email: 'fadebayodavies@talentsearchinitiative.org',
  },
  {
    name: 'Kunle Odeyinka',
    role: 'Country Business Development Expert',
    email: 'aodeyimka@talentsearchinitiative.org',
  },
]

const loopedTracks = [...tracks, ...tracks]

function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/'
  const isAboutPage = path === '/about'
  const isPartnerPage = path === '/become-a-partner'

  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', ageGroup: '', position: '', location: '' })
  const [submitted, setSubmitted] = useState(false)
  const [showHeroVideo, setShowHeroVideo] = useState(false)
  const [videoData, setVideoData] = useState({
    playerName: '',
    email: '',
    note: '',
    clip: null,
  })
  const [videoStatus, setVideoStatus] = useState({ type: '', message: '' })
  const [isVideoSubmitting, setIsVideoSubmitting] = useState(false)
  const tracksCarouselRef = useRef(null)

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const lowBandwidth = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType || '')
    const smallScreen = window.matchMedia('(max-width: 640px)').matches

    if (lowBandwidth || smallScreen) {
      setShowHeroVideo(false)
      return undefined
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => setShowHeroVideo(true), {
        timeout: 1200,
      })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = window.setTimeout(() => setShowHeroVideo(true), 700)
    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const carousel = tracksCarouselRef.current
    if (!carousel) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      const firstCard = carousel.querySelector('.track-card')
      if (!firstCard) {
        return
      }

      const styles = window.getComputedStyle(carousel)
      const gap = parseFloat(styles.gap || '0')
      const step = firstCard.clientWidth + gap
      const halfScroll = carousel.scrollWidth / 4

      if (carousel.scrollLeft >= halfScroll) {
        carousel.scrollLeft -= halfScroll
      }

      const nextScroll = carousel.scrollLeft + step

      carousel.scrollTo({
        left: nextScroll,
        behavior: 'smooth',
      })
    }, 3500)

    return () => window.clearInterval(intervalId)
  }, [])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('Registration submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', ageGroup: '', position: '', location: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleVideoChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'clip') {
      const file = files?.[0] || null
      setVideoData((prev) => ({ ...prev, clip: file }))
      if (file && file.size > 120 * 1024 * 1024) {
        setVideoStatus({
          type: 'error',
          message: 'Please upload a video under 120MB.',
        })
      } else {
        setVideoStatus({ type: '', message: '' })
      }
      return
    }

    setVideoData((prev) => ({ ...prev, [name]: value }))
  }

  const handleVideoSubmit = async (e) => {
    e.preventDefault()

    if (!videoData.clip) {
      setVideoStatus({ type: 'error', message: 'Please select a video file to upload.' })
      return
    }

    if (!videoData.clip.type.startsWith('video/')) {
      setVideoStatus({ type: 'error', message: 'Only video files are allowed.' })
      return
    }

    if (videoData.clip.size > 120 * 1024 * 1024) {
      setVideoStatus({ type: 'error', message: 'Video must be 120MB or less.' })
      return
    }

    const payload = new FormData()
    payload.append('playerName', videoData.playerName)
    payload.append('email', videoData.email)
    payload.append('note', videoData.note)
    payload.append('clip', videoData.clip)

    setIsVideoSubmitting(true)
    setVideoStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/video-submissions', {
        method: 'POST',
        body: payload,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      setVideoStatus({
        type: 'success',
        message: 'Video submitted successfully. We will review it shortly.',
      })
      setVideoData({ playerName: '', email: '', note: '', clip: null })
    } catch (error) {
      setVideoStatus({
        type: 'error',
        message: 'Upload could not be completed. Please try again.',
      })
    } finally {
      setIsVideoSubmitting(false)
    }
  }

  if (isAboutPage) {
    return <AboutPage aboutPillars={aboutPillars} founders={founders} />
  }

  if (isPartnerPage) {
    return (
      <BecomePartnerPage
        formData={formData}
        submitted={submitted}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
    )
  }

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
        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav id="primary-nav" className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/become-a-partner" onClick={() => setMenuOpen(false)}>Become a Partner</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-media">
            {showHeroVideo ? (
              <video
                className="hero-video"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster="/img.png"
              >
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                className="hero-video"
                src="/img.png"
                alt="Football development preview"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width="380"
                height="475"
              />
            )}
          </div>
          <div className="hero-content">
            <p className="kicker">Football Talent And Development</p>
            <h1>Discovering Talents, </h1>
            <h1>Changing Lives</h1>
            <p className="hero-text">
              We help young footballers move from raw potential to match-ready
              performance through structured coaching and clear progression steps.
            </p>
            <div className="hero-actions">
              <a className="cta" href="/become-a-partner">
                Register For Trials
              </a>
              <a className="ghost" href="#tracks">
                View Development Tracks
              </a>
            </div>
          </div>
        </section>

        <section id="tracks" className="section">
          <h2></h2>
          <div className="tracks-carousel" ref={tracksCarouselRef}>
            {loopedTracks.map((track, index) => (
              <article className="card track-card" key={`${track.title}-${index}`}>
                <img
                  className="card-image"
                  src={track.image}
                  alt={track.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width="640"
                  height="360"
                />
                <h3>{track.title}</h3>
                <p>{track.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section who-section">
          <h2>Who We Are</h2>
          <p className="who-text">
            Talent Search Initiative is a football talent and development platform
            focused on discovering promising players, building strong fundamentals,
            and creating real opportunities for growth on and off the pitch.
          </p>
          <div className="who-grid">
            <article className="who-card">
              <h3>Our Mission</h3>
              <p>
                To identify hidden football talent and provide structured coaching,
                mentorship, and exposure pathways.
              </p>
            </article>
            <article className="who-card">
              <h3>Our Vision</h3>
              <p>
                To become a trusted bridge between grassroots potential and elite
                football opportunities.
              </p>
            </article>
          </div>
          <div className="who-actions">
            <a className="ghost" href="/about">
              Learn More
            </a>
          </div>
        </section>

        <section id="pathway" className="section section-alt">
          <h2>Player Pathway</h2>
          <ol className="pathway-list">
            <li>
              <span>1</span>
              <div>
                <h3>Assessment</h3>
                <p>Initial evaluation to understand current level and growth areas.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>Development Block</h3>
                <p>Targeted coaching cycles for technique, movement, and game IQ.</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Match Exposure</h3>
                <p>Competitive games and showcase opportunities with performance review.</p>
              </div>
            </li>
          </ol>
        </section>

        <section id="live-matches" className="section live-section">
          <div className="live-content">
            <h2>Watch Live Matches</h2>
            <p className="live-text">
              Stream selected matches and follow player performance in real time.
              For the smoothest viewing quality, live notifications, and faster
              access on match day, we recommend downloading the TSI mobile app.
            </p>
            <div className="live-actions">
              <a className="cta live-cta" href="/live-matches">
                Go To Live Matches
              </a>
              <a className="ghost app-download" href="/app-download">
                Download The App
              </a>
            </div>
          </div>
          <div className="live-media" aria-hidden="true">
            <img src="/5.png" alt="" loading="lazy" decoding="async" width="640" height="280" />
          </div>
        </section>

        <section id="submit-video" className="section submit-video-section">
          <h2>Submit Video</h2>
          <p className="submit-video-text">
            Share your highlight clip for scouting review. All submitted videos are
            scanned for viruses and compressed before being stored in the database.
          </p>
          <form className="video-form" onSubmit={handleVideoSubmit}>
            <div className="form-group">
              <label htmlFor="playerName">Player Name</label>
              <input
                id="playerName"
                type="text"
                name="playerName"
                value={videoData.playerName}
                onChange={handleVideoChange}
                placeholder="Enter player name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={videoData.email}
                onChange={handleVideoChange}
                placeholder="Enter contact email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="clip">Upload Video</label>
              <input
                id="clip"
                type="file"
                name="clip"
                onChange={handleVideoChange}
                accept="video/*"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="note">Player Note</label>
              <textarea
                id="note"
                name="note"
                value={videoData.note}
                onChange={handleVideoChange}
                placeholder="Add position, strengths, and match context"
                rows={4}
              />
            </div>
            {videoStatus.message && (
              <p className={`upload-message ${videoStatus.type === 'error' ? 'upload-error' : 'upload-success'}`}>
                {videoStatus.message}
              </p>
            )}
            <button type="submit" className="cta" disabled={isVideoSubmitting}>
              {isVideoSubmitting ? 'Submitting...' : 'Submit Video'}
            </button>
          </form>
        </section>

        <section id="faq" className="section">
          <h2>Common Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

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

export default App
