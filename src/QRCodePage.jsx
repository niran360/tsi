import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'

// Predefined reward tokens — add more for different events
const REWARD_TOKENS = [
  { token: 'TSI-REWARD-2025', label: 'General Reward 2025' },
  { token: 'TSI-EVENT-A',     label: 'Event A – VIP Access' },
  { token: 'TSI-EVENT-B',     label: 'Event B – VIP Access' },
  { token: 'TSI-VIP-2025',    label: 'VIP Season Pass 2025' },
]

function QRCodeCard({ token, label }) {
  const canvasRef = useRef(null)
  const [url, setUrl] = useState('')

  useEffect(() => {
    const joinUrl = `${window.location.origin}/join?token=${token}`
    setUrl(joinUrl)
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, joinUrl, {
        width: 220,
        margin: 2,
        color: { dark: '#0a0e27', light: '#ffffff' },
      })
    }
  }, [token])

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `tsi-qr-${token}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div style={styles.card}>
      <p style={styles.label}>{label}</p>
      <canvas ref={canvasRef} style={styles.canvas} />
      <p style={styles.tokenText}>{token}</p>
      <p style={styles.urlText}>{url}</p>
      <div style={styles.btnRow}>
        <button style={styles.downloadBtn} onClick={handleDownload}>
          ⬇ Download PNG
        </button>
        <button style={styles.copyBtn} onClick={() => navigator.clipboard?.writeText(url)}>
          Copy Link
        </button>
      </div>
    </div>
  )
}

function QRCodePage() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <img src="/logo.png" alt="TSI" style={styles.logo} />
        <h1 style={styles.heading}>QR Reward Codes</h1>
        <p style={styles.subtitle}>
          Print or share these QR codes at events. Scanning grants instant authenticated
          access to Live Matches.
        </p>
      </div>

      <div style={styles.grid}>
        {REWARD_TOKENS.map(({ token, label }) => (
          <QRCodeCard key={token} token={token} label={label} />
        ))}
      </div>

      <p style={styles.footer}>
        Internal use only · Talent Search Initiative
      </p>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0e27',
    padding: '2rem 1.5rem 4rem',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.6rem',
  },
  logo: {
    width: '56px',
    height: '56px',
    objectFit: 'contain',
    borderRadius: '12px',
  },
  heading: {
    margin: 0,
    fontSize: 'clamp(1.4rem, 4vw, 2rem)',
    fontWeight: 700,
    color: '#FC9005',
  },
  subtitle: {
    margin: 0,
    maxWidth: '480px',
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.5,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '900px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.8rem',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
  },
  label: {
    margin: 0,
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#0a0e27',
    textAlign: 'center',
  },
  canvas: {
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  tokenText: {
    margin: 0,
    fontSize: '0.78rem',
    fontFamily: 'monospace',
    color: '#FC9005',
    background: '#fff8ee',
    padding: '0.3rem 0.7rem',
    borderRadius: '6px',
    letterSpacing: '0.05em',
  },
  urlText: {
    margin: 0,
    fontSize: '0.7rem',
    color: '#aaa',
    wordBreak: 'break-all',
    textAlign: 'center',
  },
  btnRow: {
    display: 'flex',
    gap: '0.6rem',
    width: '100%',
  },
  downloadBtn: {
    flex: 1,
    background: '#FC9005',
    color: '#000',
    border: 'none',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    fontWeight: 700,
    fontSize: '0.82rem',
    cursor: 'pointer',
  },
  copyBtn: {
    flex: 1,
    background: '#f0f0f0',
    color: '#333',
    border: 'none',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.82rem',
    cursor: 'pointer',
  },
  footer: {
    margin: 0,
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.2)',
    textAlign: 'center',
  },
}

export default QRCodePage
