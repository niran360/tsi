import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import './AuthModal.css'

function AuthModal({ onSuccess, onClose }) {
  const { login, register } = useAuth()
  const [tab, setTab] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    let result
    if (tab === 'login') {
      result = login(form.email, form.password)
    } else {
      result = register(form.name, form.email, form.password)
    }

    setLoading(false)
    if (!result.ok) {
      setError(result.error)
    } else {
      onSuccess?.()
    }
  }

  return (
    <div className="auth-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className="auth-modal">
        {/* Header */}
        <div className="auth-modal-header">
          <img src="/logo.png" alt="TSI" className="auth-logo" />
          <p className="auth-subtitle">Sign in to watch live matches</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setError('') }}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => { setTab('register'); setError('') }}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div className="auth-field">
              <label htmlFor="auth-name">Full Name</label>
              <input
                id="auth-name"
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait…' : tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* PPV info */}
        <p className="auth-ppv-note">
          🎟️ PPV matches can be unlocked after signing in for <strong>₦500 / £3</strong>
        </p>

        {/* QR hint */}
        <p className="auth-qr-note">
          Have a reward QR code? Scan it to get instant access.
        </p>
      </div>
    </div>
  )
}

export default AuthModal
