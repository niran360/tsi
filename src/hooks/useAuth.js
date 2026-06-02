/**
 * useAuth — localStorage-backed auth hook for TSI Live Matches.
 * Supports login, register, logout, PPV activation, and QR token login.
 */

import { useState, useCallback } from 'react'

const STORAGE_KEY = 'tsi_user'
const QR_TOKENS = ['TSI-REWARD-2025', 'TSI-EVENT-A', 'TSI-EVENT-B', 'TSI-VIP-2025']

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

function clearUser() {
  localStorage.removeItem(STORAGE_KEY)
}

// Separate key for all registered accounts
const ACCOUNTS_KEY = 'tsi_accounts'

function loadAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveAccount(email, record) {
  const accounts = loadAccounts()
  accounts[email.toLowerCase()] = record
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export function useAuth() {
  const [user, setUser] = useState(() => loadUser())

  const login = useCallback((email, password) => {
    const accounts = loadAccounts()
    const record = accounts[email.toLowerCase()]
    if (!record) return { ok: false, error: 'No account found with that email.' }
    if (record.password !== password) return { ok: false, error: 'Incorrect password.' }
    const sessionUser = { email: record.email, name: record.name, ppv: record.ppv || [] }
    saveUser(sessionUser)
    setUser(sessionUser)
    return { ok: true }
  }, [])

  const register = useCallback((name, email, password) => {
    if (!name || !email || !password) return { ok: false, error: 'All fields are required.' }
    const accounts = loadAccounts()
    if (accounts[email.toLowerCase()]) return { ok: false, error: 'An account with that email already exists.' }
    const record = { name, email, password, ppv: [] }
    saveAccount(email, record)
    const sessionUser = { email, name, ppv: [] }
    saveUser(sessionUser)
    setUser(sessionUser)
    return { ok: true }
  }, [])

  const loginWithToken = useCallback((token) => {
    if (!QR_TOKENS.includes(token)) return { ok: false, error: 'Invalid or expired reward token.' }
    // Check if there's already a registered account using this token email
    const email = `qr-${token.toLowerCase()}@tsi.app`
    const accounts = loadAccounts()
    if (!accounts[email]) {
      const record = { name: 'VIP Guest', email, password: token, ppv: [] }
      saveAccount(email, record)
    }
    const sessionUser = { email, name: 'VIP Guest', ppv: [], qrAccess: true, token }
    saveUser(sessionUser)
    setUser(sessionUser)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    clearUser()
    setUser(null)
  }, [])

  const activatePPV = useCallback((matchId) => {
    setUser(prev => {
      if (!prev) return prev
      const updated = { ...prev, ppv: [...(prev.ppv || []), matchId] }
      saveUser(updated)
      // Also persist to accounts store
      const accounts = loadAccounts()
      if (accounts[prev.email.toLowerCase()]) {
        accounts[prev.email.toLowerCase()].ppv = updated.ppv
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
      }
      return updated
    })
  }, [])

  const hasPPV = useCallback((matchId) => {
    return user?.ppv?.includes(matchId) ?? false
  }, [user])

  return { user, login, register, logout, loginWithToken, activatePPV, hasPPV }
}
