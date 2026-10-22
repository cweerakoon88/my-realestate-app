'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import AuthModal from '@/components/AuthModal'
import { supabase } from '@/lib/supabase'

// Landing page for the link in the "reset your password" email. Supabase puts
// a recovery token in the URL hash; supabase-js turns it into a session, after
// which the user can set a new password.
export default function ResetPasswordPage() {
  const [status, setStatus] = useState('checking') // checking | ready | invalid | done
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // An expired or already-used link comes back with an error in the hash.
    if (/error_code=|error=/.test(window.location.hash)) {
      setStatus('invalid')
      return
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) setStatus('ready')
    })
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setStatus('ready')
    })
    // Give supabase-js a moment to read the token from the URL before giving up.
    const timer = setTimeout(() => setStatus(s => (s === 'checking' ? 'invalid' : s)), 4000)
    return () => { subscription.unsubscribe(); clearTimeout(timer) }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError("Passwords don't match."); return }
    setSaving(true)
    const { error } = await supabase.auth.updateUser({ password })
    setSaving(false)
    if (error) { setError(error.message); return }
    // Drop the token from the address bar.
    window.history.replaceState(null, '', '/reset-password')
    setStatus('done')
  }

  return (
    <>
      <style>{styles}</style>
      <NavBar />
      <main className="rp-wrap">
        <div className="rp-box">
          <div className="rp-eyebrow">PropOffer</div>

          {status === 'checking' && <p className="rp-text">Checking your reset link…</p>}

          {status === 'invalid' && (
            <>
              <h1 className="rp-title">This link has expired</h1>
              <p className="rp-text">Password reset links can only be used once and expire after an hour. Request a new one below.</p>
              <button className="rp-btn" onClick={() => setShowModal(true)}>Send a new link</button>
            </>
          )}

          {status === 'ready' && (
            <>
              <h1 className="rp-title">Choose a new password</h1>
              <p className="rp-text">Enter a new password for your account.</p>
              <form onSubmit={handleSubmit}>
                <label className="rp-label">New password</label>
                <input className="rp-input" type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} autoFocus autoComplete="new-password" />
                <label className="rp-label">Confirm new password</label>
                <input className="rp-input" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={8} autoComplete="new-password" />
                {error && <div className="rp-error">{error}</div>}
                <button className="rp-btn" type="submit" disabled={saving}>{saving ? 'Please wait…' : 'Update password'}</button>
              </form>
            </>
          )}

          {status === 'done' && (
            <>
              <div className="rp-check">✓</div>
              <h1 className="rp-title">Password updated</h1>
              <p className="rp-text">You're signed in with your new password.</p>
              <Link href="/account" className="rp-btn">Go to my account</Link>
            </>
          )}
        </div>
      </main>
      {showModal && <AuthModal defaultMode="forgot" onClose={() => setShowModal(false)} />}
    </>
  )
}

const styles = `
  .rp-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 8rem 16px 4rem; background: #faf8f3; }
  .rp-box { background: #fffefb; border: 1px solid #e8e0d0; border-radius: 4px; padding: 2.5rem; width: 100%; max-width: 420px; font-family: 'DM Sans', sans-serif; }
  .rp-eyebrow { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 0.85rem; color: #b8924a; font-style: italic; margin-bottom: 0.5rem; }
  .rp-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2rem; font-weight: 300; color: #1a1714; line-height: 1.1; margin-bottom: 0.5rem; }
  .rp-text { font-size: 13px; color: #4a4540; font-weight: 300; line-height: 1.6; margin-bottom: 1.5rem; }
  .rp-label { display: block; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #4a4540; margin-bottom: 6px; }
  .rp-input { width: 100%; font-family: inherit; font-size: 14px; color: #1a1714; background: #faf8f3; border: 1px solid #e8e0d0; border-radius: 2px; padding: 10px 14px; outline: none; margin-bottom: 1rem; }
  .rp-input:focus { border-color: #b8924a; background: #fffefb; }
  .rp-error { font-size: 13px; color: #c0392b; background: #fdf0ef; border: 1px solid #f5c6c2; border-radius: 2px; padding: 10px 14px; margin-bottom: 1rem; }
  .rp-btn { display: block; width: 100%; text-align: center; text-decoration: none; font-family: inherit; font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #faf8f3; background: #1a1714; border: 1px solid #1a1714; border-radius: 2px; padding: 13px 20px; cursor: pointer; }
  .rp-btn:hover { background: #b8924a; border-color: #b8924a; }
  .rp-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .rp-check { width: 56px; height: 56px; background: #f5ecd8; border: 1px solid #b8924a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; color: #b8924a; margin-bottom: 1rem; }
`
