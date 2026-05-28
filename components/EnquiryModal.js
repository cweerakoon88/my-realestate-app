'use client'

import { useState } from 'react'

export default function EnquiryModal({ service, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setSuccess(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="eq-backdrop" onClick={onClose}>
        <div className="eq-modal" onClick={e => e.stopPropagation()}>
          <button className="eq-close" onClick={onClose}>✕</button>

          {success ? (
            <div className="eq-success">
              <div className="eq-success-icon">✓</div>
              <h2 className="eq-title">Enquiry sent!</h2>
              <p className="eq-subtitle">We've received your enquiry for <strong>{service}</strong> and will be in touch shortly.</p>
              <button className="eq-btn" onClick={onClose}>Close</button>
            </div>
          ) : (
            <>
              <div className="eq-eyebrow">PropOffer Services</div>
              <h2 className="eq-title">Enquire about<br />{service}</h2>
              <p className="eq-subtitle">Fill in your details and we'll connect you with the right provider.</p>

              <form onSubmit={handleSubmit}>
                <div className="eq-field">
                  <label className="eq-label">Full name *</label>
                  <input className="eq-input" name="name" placeholder="Jane Smith" value={form.name} onChange={handleChange} required />
                </div>
                <div className="eq-field">
                  <label className="eq-label">Email address *</label>
                  <input className="eq-input" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="eq-field">
                  <label className="eq-label">Phone number</label>
                  <input className="eq-input" name="phone" type="tel" placeholder="0412 345 678" value={form.phone} onChange={handleChange} />
                </div>
                <div className="eq-field">
                  <label className="eq-label">Message *</label>
                  <textarea className="eq-input eq-textarea" name="message" placeholder={`Tell us more about what you need for ${service.toLowerCase()}...`} value={form.message} onChange={handleChange} required />
                </div>

                {error && <div className="eq-error">{error}</div>}

                <button className="eq-btn" type="submit" disabled={loading}>
                  {loading ? 'Sending…' : 'Send enquiry →'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400&family=DM+Sans:wght@300;400;500&display=swap');
  :root {
    --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
    --gold: #b8924a; --gold-pale: #f5ecd8; --border: #e8e0d0;
    --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
  }
  .eq-backdrop { position: fixed; inset: 0; z-index: 999; background: rgba(26,23,20,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 1rem; animation: eqFade 0.2s ease; }
  @keyframes eqFade { from { opacity: 0 } to { opacity: 1 } }
  .eq-modal { background: var(--warm-white); border: 1px solid var(--border); border-radius: 4px; padding: 2.5rem; width: 100%; max-width: 460px; position: relative; animation: eqSlide 0.25s ease; max-height: 90vh; overflow-y: auto; }
  @keyframes eqSlide { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
  .eq-close { position: absolute; top: 1.25rem; right: 1.25rem; background: none; border: none; cursor: pointer; font-size: 14px; color: var(--ink-light); width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 2px; transition: background 0.15s; }
  .eq-close:hover { background: var(--gold-pale); }
  .eq-eyebrow { font-family: var(--serif); font-size: 0.85rem; color: var(--gold); font-style: italic; margin-bottom: 0.5rem; }
  .eq-title { font-family: var(--serif); font-size: 1.8rem; font-weight: 300; color: var(--ink); line-height: 1.1; margin-bottom: 0.5rem; }
  .eq-subtitle { font-family: var(--sans); font-size: 13px; color: var(--ink-light); font-weight: 300; line-height: 1.6; margin-bottom: 1.75rem; }
  .eq-field { margin-bottom: 1rem; }
  .eq-label { display: block; font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-light); margin-bottom: 6px; }
  .eq-input { width: 100%; font-family: var(--sans); font-size: 14px; color: var(--ink); background: var(--cream); border: 1px solid var(--border); border-radius: 2px; padding: 10px 14px; outline: none; transition: border-color 0.15s; box-sizing: border-box; }
  .eq-input:focus { border-color: var(--gold); background: var(--warm-white); }
  .eq-input::placeholder { color: #bbb; }
  .eq-textarea { height: 100px; resize: vertical; }
  .eq-error { font-family: var(--sans); font-size: 13px; color: #c0392b; background: #fdf0ef; border: 1px solid #f5c6c2; border-radius: 2px; padding: 10px 14px; margin-bottom: 1rem; }
  .eq-btn { width: 100%; font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--cream); background: var(--ink); border: 1px solid var(--ink); border-radius: 2px; padding: 13px 20px; cursor: pointer; transition: background 0.2s, border-color 0.2s; }
  .eq-btn:hover { background: var(--gold); border-color: var(--gold); }
  .eq-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .eq-success { text-align: center; padding: 1rem 0; }
  .eq-success-icon { width: 56px; height: 56px; background: var(--gold-pale); border: 1px solid var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; color: var(--gold); margin: 0 auto 1.5rem; }
`