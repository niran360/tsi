import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

function QRJoinPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { loginWithToken } = useAuth()
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      setStatus('error')
      setErrorMsg('No reward token found in this link.')
      return
    }

    const result = loginWithToken(token)
    if (!result.ok) {
      setStatus('error')
      setErrorMsg(result.error)
      return
    }

    setStatus('success')
    // Redirect to live matches after a short splash
    const timer = setTimeout(() => navigate('/live-matches', { replace: true }), 1800)
    return () => clearTimeout(timer)
  }, [searchParams, loginWithToken, navigate])

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="TSI" style={styles.logo} />

        {status === 'loading' && (
          <>
            <div style={styles.spinner} />
            <p style={styles.text}>Verifying your reward…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={styles.successIcon}>🎉</div>
            <h1 style={styles.heading}>Welcome!</h1>
            <p style={styles.text}>Your QR reward has been verified. You're now signed in.</p>
            <p style={styles.subtext}>Redirecting to Live Matches…</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={styles.errorIcon}>⚠️</div>
            <h1 style={{ ...styles.heading, color: '#c0392b' }}>Invalid QR Code</h1>
            <p style={styles.text}>{errorMsg}</p>
            <button style={styles.btn} onClick={() => navigate('/live-matches')}>
              Go to Live Matches
            </button>
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0e27',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '2.5rem 2rem',
    maxWidth: '360px',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
  },
  logo: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    borderRadius: '12px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(252,144,5,0.2)',
    borderTop: '4px solid #FC9005',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  successIcon: {
    fontSize: '3rem',
    lineHeight: 1,
  },
  errorIcon: {
    fontSize: '3rem',
    lineHeight: 1,
  },
  heading: {
    margin: 0,
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  text: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#555',
    lineHeight: 1.5,
  },
  subtext: {
    margin: 0,
    fontSize: '0.82rem',
    color: '#aaa',
  },
  btn: {
    background: '#FC9005',
    color: '#fff',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '10px',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
  },
}

// Inject keyframe for spinner
const styleEl = document.createElement('style')
styleEl.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }'
document.head.appendChild(styleEl)

export default QRJoinPage
