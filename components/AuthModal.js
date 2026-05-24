'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthModal({ onClose, onSuccess, defaultMode = 'signin' }) {
  const [mode, setMode] = useState(defaultMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleEmailAuth = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error

        if (data.user) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: fullName,
            email,
            created_at: new Date().toISOString(),
          })
        }
        setEmailSent(true)
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onSuccess?.()
        onClose()
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/account`,
      },
    })
    if (error) setError(error.message)
  }

  if (emailSent) {
    return (
      <>
        <style>{modalStyles}</style>
        <div className="modal-backdrop" onClick={onClose}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>✕</button>
            <div className="modal-check">✉</div>
            <h2 className="modal-title">Check your email</h2>
            <p className="modal-subtitle">We've sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{modalStyles}</style>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>✕</button>

          <div className="modal-eyebrow">PropMatch</div>
          <h2 className="modal-title">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="modal-subtitle">
            {mode === 'signin'
              ? 'Sign in to manage your requirements and offers.'
              : 'Join thousands of buyers finding property their way.'}
          </p>

          <button className="btn-google" onClick={handleGoogle} disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="modal-divider"><span>or</span></div>

          <form onSubmit={handleEmailAuth}>
            {mode === 'signup' && (
              <div className="field">
                <label className="field-label">Full name</label>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Jane Smith"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="field">
              <label className="field-label">Email address</label>
              <input
                className="field-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label className="field-label">Password</label>
              <input
                className="field-input"
                type="password"
                placeholder={mode === 'signup' ? 'Min. 8 characters' : '••••••••'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            {error && <div className="modal-error">{error}</div>}

            <button className="btn-primary-modal" type="submit" disabled={loading}>
              {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="modal-switch">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              className="modal-switch-btn"
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError('') }}
            >
              {mode === 'signin' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}

const modalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  :root {
    --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
    --gold: #b8924a; --gold-light: #d4aa6a; --gold-pale: #f5ecd8; --border: #e8e0d0;
    --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
  }
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 999;
    background: rgba(26,23,20,0.6); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; padding: 1rem;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  .modal-box {
    background: var(--warm-white); border: 1px solid var(--border); border-radius: 4px;
    padding: 2.5rem; width: 100%; max-width: 420px; position: relative;
    animation: slideUp 0.25s ease;
  }
  @keyframes slideUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
  .modal-close {
    position: absolute; top: 1.25rem; right: 1.25rem;
    background: none; border: none; cursor: pointer; font-size: 14px; color: var(--ink-light);
    width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
    border-radius: 2px; transition: background 0.15s;
  }
  .modal-close:hover { background: var(--gold-pale); color: var(--ink); }
  .modal-check { font-size: 2.5rem; margin-bottom: 1rem; }
  .modal-eyebrow { font-family: var(--serif); font-size: 0.85rem; color: var(--gold); font-style: italic; margin-bottom: 0.5rem; }
  .modal-title { font-family: var(--serif); font-size: 2rem; font-weight: 300; color: var(--ink); line-height: 1.1; margin-bottom: 0.5rem; }
  .modal-subtitle { font-family: var(--sans); font-size: 13px; color: var(--ink-light); font-weight: 300; line-height: 1.6; margin-bottom: 1.75rem; }
  .btn-google {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
    font-family: var(--sans); font-size: 13px; font-weight: 500; color: var(--ink);
    background: var(--warm-white); border: 1px solid var(--border); border-radius: 2px;
    padding: 11px 20px; cursor: pointer; transition: border-color 0.15s, background 0.15s;
  }
  .btn-google:hover { border-color: var(--ink); background: var(--cream); }
  .btn-google:disabled { opacity: 0.6; cursor: not-allowed; }
  .modal-divider { display: flex; align-items: center; gap: 1rem; margin: 1.25rem 0; }
  .modal-divider::before, .modal-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .modal-divider span { font-family: var(--sans); font-size: 11px; color: #bbb; letter-spacing: 0.08em; text-transform: uppercase; }
  .field { margin-bottom: 1rem; }
  .field-label { display: block; font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-light); margin-bottom: 6px; }
  .field-input { width: 100%; font-family: var(--sans); font-size: 14px; color: var(--ink); background: var(--cream); border: 1px solid var(--border); border-radius: 2px; padding: 10px 14px; outline: none; transition: border-color 0.15s; }
  .field-input:focus { border-color: var(--gold); background: var(--warm-white); }
  .field-input::placeholder { color: #bbb; }
  .modal-error { font-family: var(--sans); font-size: 13px; color: #c0392b; background: #fdf0ef; border: 1px solid #f5c6c2; border-radius: 2px; padding: 10px 14px; margin-bottom: 1rem; }
  .btn-primary-modal {
    width: 100%; font-family: var(--sans); font-size: 13px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase; color: var(--cream);
    background: var(--ink); border: 1px solid var(--ink); border-radius: 2px;
    padding: 13px 20px; cursor: pointer; margin-top: 0.25rem;
    transition: background 0.2s, border-color 0.2s;
  }
  .btn-primary-modal:hover { background: var(--gold); border-color: var(--gold); }
  .btn-primary-modal:disabled { opacity: 0.6; cursor: not-allowed; }
  .modal-switch { font-family: var(--sans); font-size: 13px; color: var(--ink-light); text-align: center; margin-top: 1.25rem; font-weight: 300; }
  .modal-switch-btn { background: none; border: none; cursor: pointer; font-family: var(--sans); font-size: 13px; font-weight: 500; color: var(--gold); border-bottom: 1px solid var(--gold-pale); padding: 0; transition: color 0.15s; }
  .modal-switch-btn:hover { color: var(--ink); }
`