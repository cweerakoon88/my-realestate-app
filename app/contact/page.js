'use client'

import Link from 'next/link'
import { useState } from 'react'
import NavBar from '@/components/NavBar'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
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
        body: JSON.stringify({ ...form, service: `Contact Us — ${form.subject || 'General Enquiry'}` }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setSuccess(true)
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }
        :root {
          --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
          --gold: #b8924a; --gold-light: #d4aa6a; --gold-pale: #f5ecd8; --border: #e8e0d0;
          --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
        }
        body { background: var(--cream); color: var(--ink); font-family: var(--sans); }
        .page { max-width: 1100px; margin: 0 auto; padding: 9rem 3rem 6rem; display: grid; grid-template-columns: 1fr 1.4fr; gap: 6rem; align-items: start; }
        .left-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 1.75rem; }
        .left-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }
        .left-title { font-family: var(--serif); font-size: clamp(2.5rem, 4vw, 4rem); font-weight: 300; line-height: 1.05; color: var(--ink); margin-bottom: 1.5rem; }
        .left-title em { font-style: italic; color: var(--gold); }
        .left-desc { font-family: var(--sans); font-size: 14px; font-weight: 300; color: var(--ink-light); line-height: 1.8; margin-bottom: 3rem; }
        .contact-methods { display: flex; flex-direction: column; gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 2rem; }
        .contact-method { background: var(--warm-white); padding: 1.5rem; display: flex; align-items: flex-start; gap: 1rem; }
        .method-icon { font-size: 1.25rem; flex-shrink: 0; margin-top: 2px; }
        .method-label { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); margin-bottom: 4px; }
        .method-value { font-family: var(--sans); font-size: 14px; color: var(--ink); font-weight: 400; text-decoration: none; }
        .method-value:hover { color: var(--gold); }
        .method-note { font-family: var(--sans); font-size: 12px; color: #bbb; margin-top: 3px; font-weight: 300; }
        .team-note { background: var(--gold-pale); border: 1px solid var(--border); padding: 1.5rem; }
        .team-note-title { font-family: var(--serif); font-size: 1.1rem; color: var(--ink); margin-bottom: 0.5rem; font-weight: 400; }
        .team-note-desc { font-family: var(--sans); font-size: 13px; color: var(--ink-light); line-height: 1.7; font-weight: 300; }
        .form-card { background: var(--warm-white); border: 1px solid var(--border); padding: 2.5rem; position: sticky; top: 8rem; }
        .form-title { font-family: var(--serif); font-size: 1.6rem; font-weight: 300; color: var(--ink); margin-bottom: 0.5rem; }
        .form-subtitle { font-family: var(--sans); font-size: 13px; color: var(--ink-light); font-weight: 300; margin-bottom: 2rem; line-height: 1.6; }
        .field { margin-bottom: 1.1rem; }
        .field-label { display: block; font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-light); margin-bottom: 6px; }
        .field-input { width: 100%; font-family: var(--sans); font-size: 14px; color: var(--ink); background: var(--cream); border: 1px solid var(--border); border-radius: 2px; padding: 10px 14px; outline: none; transition: border-color 0.15s; box-sizing: border-box; }
        .field-input:focus { border-color: var(--gold); background: var(--warm-white); }
        .field-input::placeholder { color: #bbb; }
        .field-textarea { height: 120px; resize: vertical; }
        .field-select { appearance: none; cursor: pointer; }
        .form-error { font-family: var(--sans); font-size: 13px; color: #c0392b; background: #fdf0ef; border: 1px solid #f5c6c2; border-radius: 2px; padding: 10px 14px; margin-bottom: 1rem; }
        .form-submit { width: 100%; font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--cream); background: var(--ink); border: 1px solid var(--ink); border-radius: 2px; padding: 14px 20px; cursor: pointer; transition: all 0.2s; }
        .form-submit:hover { background: var(--gold); border-color: var(--gold); }
        .form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .success-box { text-align: center; padding: 2rem 0; }
        .success-icon { width: 60px; height: 60px; background: var(--gold-pale); border: 1px solid var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 1.5rem; color: var(--gold); }
        .success-title { font-family: var(--serif); font-size: 1.8rem; font-weight: 300; color: var(--ink); margin-bottom: 0.75rem; }
        .success-desc { font-family: var(--sans); font-size: 14px; color: var(--ink-light); font-weight: 300; line-height: 1.7; }
        .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; flex-wrap: wrap; gap: 1rem; }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }
        .footer-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .footer-link { color: #bbb; text-decoration: none; }
        .footer-link:hover { color: var(--gold); }
        @media (max-width: 768px) {
          .page { grid-template-columns: 1fr; padding: 7rem 1.5rem 4rem; gap: 3rem; }
          .form-card { position: static; padding: 1.75rem; }
          .footer { padding: 1.5rem; flex-direction: column; text-align: center; }
        }
      `}</style>

      <NavBar />

      <div className="page">
        <div>
          <div className="left-eyebrow">Get in touch</div>
          <h1 className="left-title">We'd love to<br /><em>hear from you.</em></h1>
          <p className="left-desc">Whether you're a buyer looking for help posting your requirement, a seller wanting to list a property, or just curious about how PropOffer works — our team is here to help.</p>

          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon">✉</div>
              <div>
                <div className="method-label">Email us</div>
                <a href="mailto:hello@propoffer.com.au" className="method-value">hello@propoffer.com.au</a>
                <div className="method-note">We respond within 1 business day</div>
              </div>
            </div>
            <div className="contact-method">
              <div className="method-icon">📍</div>
              <div>
                <div className="method-label">Based in</div>
                <div className="method-value">Melbourne, Victoria, Australia</div>
                <div className="method-note">Serving buyers & sellers Australia-wide</div>
              </div>
            </div>
            <div className="contact-method">
              <div className="method-icon">🕐</div>
              <div>
                <div className="method-label">Response time</div>
                <div className="method-value">Within 1 business day</div>
                <div className="method-note">Mon – Fri, 9am – 5pm AEST</div>
              </div>
            </div>
          </div>

          <div className="team-note">
            <div className="team-note-title">👋 A note from the team</div>
            <p className="team-note-desc">We personally review every message that comes through. If you have a question, a suggestion, or just want to chat about your property situation — don't hesitate to reach out. We're real people who genuinely want to help.</p>
          </div>
        </div>

        <div className="form-card">
          {success ? (
            <div className="success-box">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Message sent!</h2>
              <p className="success-desc">Thanks for reaching out. We'll get back to you within 1 business day.</p>
            </div>
          ) : (
            <>
              <h2 className="form-title">Send us a message</h2>
              <p className="form-subtitle">Fill in the form and we'll get back to you within 1 business day.</p>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="field-label">Full name *</label>
                  <input className="field-input" name="name" placeholder="Jane Smith" value={form.name} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label className="field-label">Email address *</label>
                  <input className="field-input" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label className="field-label">Subject</label>
                  <select className="field-input field-select" name="subject" value={form.subject} onChange={handleChange}>
                    <option value="">Select a topic...</option>
                    <option value="Buyer enquiry">I'm a buyer — help posting a requirement</option>
                    <option value="Seller enquiry">I'm a seller — help listing a property</option>
                    <option value="Pricing question">Question about pricing</option>
                    <option value="Technical issue">Technical issue</option>
                    <option value="Partnership">Partnership or media enquiry</option>
                    <option value="General enquiry">General enquiry</option>
                  </select>
                </div>
                <div className="field">
                  <label className="field-label">Message *</label>
                  <textarea className="field-input field-textarea" name="message" placeholder="Tell us what's on your mind..." value={form.message} onChange={handleChange} required />
                </div>
                {error && <div className="form-error">{error}</div>}
                <button className="form-submit" type="submit" disabled={loading}>
                  {loading ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-logo">Prop<span>Offer</span></div>
        <div className="footer-links">
          <Link href="/marketplace" className="footer-link">Marketplace</Link>
          <Link href="/services" className="footer-link">Services</Link>
          <Link href="/pricing" className="footer-link">Pricing</Link>
          <Link href="/about" className="footer-link">About</Link>
        </div>
        <div>© 2025 PropOffer · Australia's buyer-first property platform</div>
      </footer>
    </>
  )
}