'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import AuthModal from '@/components/AuthModal'
import NavBar from '@/components/NavBar'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const [showAuth, setShowAuth] = useState(false)

  const handlePostClick = (e) => {
    e?.preventDefault()
    if (user) router.push('/post')
    else setShowAuth(true)
  }

  return (
    <>
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => router.push('/post')}
          defaultMode="signup"
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; -webkit-text-size-adjust: 100%; }
        :root {
          --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
          --gold: #b8924a; --gold-light: #d4aa6a; --gold-pale: #f5ecd8; --border: #e8e0d0;
          --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
        }
        body { background: var(--cream); color: var(--ink); font-family: var(--sans); }
        .hero { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 8rem 3rem 4rem; gap: 4rem; max-width: 1300px; margin: 0 auto; }
        .hero-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 1.75rem; }
        .hero-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }
        .hero-title { font-family: var(--serif); font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 300; line-height: 1.05; color: var(--ink); margin-bottom: 1.5rem; }
        .hero-title em { font-style: italic; color: var(--gold); }
        .hero-subtitle { font-family: var(--sans); font-size: 1rem; font-weight: 300; line-height: 1.75; color: var(--ink-light); max-width: 420px; margin-bottom: 2.5rem; }
        .hero-actions { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
        .btn-primary { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; background: var(--ink); color: var(--cream); padding: 14px 32px; border-radius: 2px; text-decoration: none; transition: all 0.2s; border: 1px solid var(--ink); cursor: pointer; }
        .btn-primary:hover { background: var(--gold); border-color: var(--gold); }
        .btn-secondary { font-family: var(--sans); font-size: 13px; font-weight: 400; color: var(--ink-light); text-decoration: none; display: flex; align-items: center; gap: 8px; transition: color 0.2s; background: none; border: none; cursor: pointer; }
        .btn-secondary:hover { color: var(--gold); }
        .btn-secondary::after { content: '→'; }
        .hero-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 4px; padding: 2rem; position: relative; }
        .hero-card::before { content: ''; position: absolute; top: -12px; left: -12px; right: 12px; bottom: 12px; border: 1px solid var(--gold-pale); border-radius: 4px; z-index: -1; }
        .card-tag { font-family: var(--sans); font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); background: var(--gold-pale); padding: 4px 10px; border-radius: 2px; display: inline-block; margin-bottom: 1rem; }
        .card-title { font-family: var(--serif); font-size: 1.5rem; font-weight: 400; color: var(--ink); margin-bottom: 0.5rem; line-height: 1.3; }
        .card-location { font-family: var(--sans); font-size: 13px; color: var(--ink-light); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 6px; }
        .card-location::before { content: '◎'; color: var(--gold); font-size: 11px; }
        .card-specs { display: flex; gap: 1rem; margin-bottom: 1.5rem; padding: 1rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .card-spec { display: flex; flex-direction: column; gap: 3px; }
        .spec-value { font-family: var(--serif); font-size: 1.2rem; color: var(--ink); }
        .spec-label { font-family: var(--sans); font-size: 11px; color: #aaa; letter-spacing: 0.06em; text-transform: uppercase; }
        .card-budget { display: flex; justify-content: space-between; align-items: center; }
        .budget-label { font-family: var(--sans); font-size: 12px; color: var(--ink-light); }
        .budget-value { font-family: var(--serif); font-size: 1.4rem; color: var(--gold); font-weight: 600; }
        .offer-count { font-family: var(--sans); font-size: 12px; color: var(--gold); background: var(--gold-pale); padding: 4px 10px; border-radius: 2px; }
        .divider { display: flex; align-items: center; gap: 1.5rem; max-width: 1300px; margin: 0 auto; padding: 0 3rem; }
        .divider-line { flex: 1; height: 1px; background: var(--border); }
        .divider-text { font-family: var(--serif); font-size: 1rem; color: #bbb; font-style: italic; white-space: nowrap; }
        .section { max-width: 1300px; margin: 0 auto; padding: 6rem 3rem; }
        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .section-title { font-family: var(--serif); font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 300; color: var(--ink); line-height: 1.1; }
        .section-title em { font-style: italic; color: var(--gold); }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--border); border: 1px solid var(--border); }
        .step { background: var(--warm-white); padding: 2.5rem 2rem; position: relative; }
        .step-number { font-family: var(--serif); font-size: 4rem; font-weight: 300; color: var(--gold-pale); line-height: 1; position: absolute; top: 1.5rem; right: 1.5rem; }
        .step-icon { width: 40px; height: 40px; background: var(--gold-pale); border-radius: 2px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 1.25rem; }
        .step-title { font-family: var(--serif); font-size: 1.3rem; color: var(--ink); margin-bottom: 0.75rem; font-weight: 400; }
        .step-desc { font-family: var(--sans); font-size: 14px; color: var(--ink-light); line-height: 1.7; font-weight: 300; }
        .advantages { background: var(--ink); padding: 6rem 0; }
        .advantages-inner { max-width: 1300px; margin: 0 auto; padding: 0 3rem; }
        .advantages-header { margin-bottom: 4rem; }
        .advantages-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .advantages-title { font-family: var(--serif); font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 300; color: var(--cream); line-height: 1.1; }
        .advantages-title em { font-style: italic; color: var(--gold); }
        .advantages-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.08); }
        .advantage { padding: 2.5rem 2rem; background: var(--ink); transition: background 0.2s; }
        .advantage:hover { background: #242018; }
        .advantage-num { font-family: var(--serif); font-size: 0.85rem; color: var(--gold); margin-bottom: 1rem; font-style: italic; }
        .advantage-title { font-family: var(--serif); font-size: 1.3rem; color: var(--cream); margin-bottom: 0.75rem; font-weight: 400; }
        .advantage-desc { font-family: var(--sans); font-size: 14px; color: rgba(250,248,243,0.55); line-height: 1.7; font-weight: 300; }
        .stats { max-width: 1300px; margin: 0 auto; padding: 6rem 3rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--border); border: 1px solid var(--border); }
        .stat { background: var(--warm-white); padding: 2.5rem 2rem; text-align: center; }
        .stat-value { font-family: var(--serif); font-size: 3rem; font-weight: 300; color: var(--gold); line-height: 1; margin-bottom: 0.5rem; }
        .stat-label { font-family: var(--sans); font-size: 13px; color: var(--ink-light); font-weight: 300; }
        .cta-section { background: var(--gold-pale); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 6rem 3rem; text-align: center; }
        .cta-title { font-family: var(--serif); font-size: clamp(2rem, 3.5vw, 3.5rem); font-weight: 300; color: var(--ink); margin-bottom: 1rem; }
        .cta-title em { font-style: italic; color: var(--gold); }
        .cta-sub { font-family: var(--sans); font-size: 15px; color: var(--ink-light); font-weight: 300; margin-bottom: 2.5rem; line-height: 1.7; }
        .cta-note { font-family: var(--sans); font-size: 12px; color: #bbb; margin-top: 1rem; }
        .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; flex-wrap: wrap; gap: 1rem; }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }
        .footer-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .footer-link { color: #bbb; text-decoration: none; }
        .footer-link:hover { color: var(--gold); }
        @media (max-width: 768px) {
          .hero { grid-template-columns: 1fr; padding: 5.5rem 1.25rem 2.5rem; gap: 2rem; min-height: auto; }
          .hero-right { display: none; }
          .hero-title { font-size: 2.6rem; margin-bottom: 1rem; }
          .hero-subtitle { font-size: 0.95rem; margin-bottom: 2rem; max-width: 100%; }
          .hero-actions { flex-direction: column; align-items: stretch; gap: 0.75rem; }
          .btn-primary { text-align: center; padding: 15px 24px; font-size: 12px; }
          .btn-secondary { justify-content: center; }
          .divider { padding: 0 1.25rem; }
          .section { padding: 3.5rem 1.25rem; }
          .steps { grid-template-columns: 1fr; }
          .advantages { padding: 3.5rem 0; }
          .advantages-inner { padding: 0 1.25rem; }
          .advantages-grid { grid-template-columns: 1fr; }
          .stats { padding: 3.5rem 1.25rem; }
          .stats-grid { grid-template-columns: 1fr; }
          .cta-section { padding: 3.5rem 1.25rem; }
          .footer { padding: 1.5rem 1.25rem; flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>

      <NavBar onPostClick={handlePostClick} />

      <section>
        <div className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow">Australia's smarter property market</div>
            <h1 className="hero-title">Buyers post.<br />Sellers reach out.<br /><em>You choose.</em></h1>
            <p className="hero-subtitle">Post your property requirement — suburb, type and budget — and sellers with matching or similar properties will contact you directly. No more endless searching.</p>
            <div className="hero-actions">
              <button onClick={handlePostClick} className="btn-primary">Post your requirement</button>
              <Link href="/pricing" className="btn-secondary">See pricing</Link>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="card-tag">Buyer Requirement</div>
              <div className="card-title">3-bed house with a garden</div>
              <div className="card-location">Richmond, Melbourne VIC</div>
              <div className="card-specs">
                <div className="card-spec"><span className="spec-value">3</span><span className="spec-label">Bedrooms</span></div>
                <div className="card-spec"><span className="spec-value">2</span><span className="spec-label">Bathrooms</span></div>
                <div className="card-spec"><span className="spec-value">House</span><span className="spec-label">Type</span></div>
              </div>
              <div className="card-budget">
                <div><div className="budget-label">Budget range</div><div className="budget-value">$1.4M – $1.7M</div></div>
                <div className="offer-count">4 offers received</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"><div className="divider-line" /><div className="divider-text">How it works</div><div className="divider-line" /></div>

      <section className="section" id="how-it-works">
        <div className="section-header">
          <div className="section-eyebrow">The process</div>
          <h2 className="section-title">Three steps to your<br /><em>perfect property</em></h2>
        </div>
        <div className="steps">
          <div className="step"><div className="step-number">01</div><div className="step-icon">📋</div><h3 className="step-title">Post your requirement</h3><p className="step-desc">Tell us your ideal suburb, property type, number of bedrooms and your budget range. It takes less than 2 minutes and it's completely free.</p></div>
          <div className="step"><div className="step-number">02</div><div className="step-icon">🔍</div><h3 className="step-title">Sellers reach out to you</h3><p className="step-desc">Sellers and agents who have a matching or similar property see your requirement and contact you directly — no middlemen, no auctions, no pressure.</p></div>
          <div className="step"><div className="step-number">03</div><div className="step-icon">🤝</div><h3 className="step-title">You compare & choose</h3><p className="step-desc">Review everything sellers send you, compare properties at your own pace, and connect only with the ones that genuinely interest you.</p></div>
        </div>
      </section>

      <section className="advantages">
        <div className="advantages-inner">
          <div className="advantages-header">
            <div className="advantages-eyebrow">Why PropMatch</div>
            <h2 className="advantages-title">A smarter way to<br /><em>buy property</em></h2>
          </div>
          <div className="advantages-grid">
            {[
              { n: 'i.', t: "You set the terms", d: "Post your suburb, property type, bedrooms and budget. Sellers who have something matching or close to what you want will reach out to you — you stay in control the entire time." },
              { n: 'ii.', t: "Access off-market properties", d: "Many sellers don't want to list publicly. PropMatch lets them connect directly with serious, pre-qualified buyers like you — properties that never appear on Domain or realestate.com.au." },
              { n: 'iii.', t: "Know what's fair", d: "Our built-in suburb price guide shows median prices, market trends and recent sales before you post — so your budget is grounded in reality." },
              { n: 'iv.', t: "No more weekend open homes", d: "Stop spending weekends at inspections that don't match your needs. Post once and only engage with sellers whose properties genuinely fit what you're looking for." },
              { n: 'v.', t: "Direct seller contact", d: "Sellers contact you directly with what they have. No agents inflating prices, no bidding wars — just a straightforward conversation between buyer and seller." },
              { n: 'vi.', t: "Free for buyers, always", d: "Posting a requirement costs you nothing. Receive seller contacts, compare properties and connect — all at no cost to you, ever." },
            ].map((a, i) => (
              <div key={i} className="advantage">
                <div className="advantage-num">{a.n}</div>
                <h3 className="advantage-title">{a.t}</h3>
                <p className="advantage-desc">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-grid">
          <div className="stat"><div className="stat-value">2 min</div><div className="stat-label">Average time to post a requirement</div></div>
          <div className="stat"><div className="stat-value">Free</div><div className="stat-label">For all buyers, always</div></div>
          <div className="stat"><div className="stat-value">Direct</div><div className="stat-label">Seller contact, no agents required</div></div>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Ready to let sellers<br /><em>come to you?</em></h2>
        <p className="cta-sub">Post your property requirement for free. Sellers with matching properties will reach out to you directly — you compare and choose at your own pace.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <button onClick={handlePostClick} className="btn-primary">Post your requirement — it's free</button>
          <Link href="/pricing" style={{ fontFamily: 'var(--sans)', fontSize: '13px', fontWeight: '500', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', border: '1px solid var(--gold)', padding: '14px 28px', borderRadius: '2px', display: 'inline-block' }}>View pricing</Link>
        </div>
        <p className="cta-note">Buyers free forever · Sellers from $49 · No commissions</p>
      </section>

      <section style={{ background: 'var(--warm-white)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '3rem 1.25rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: '500', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }}>Simple, transparent pricing</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1px', flexWrap: 'wrap', background: 'var(--border)', border: '1px solid var(--border)', maxWidth: '700px', margin: '0 auto 2rem' }}>
          {[
            { label: 'Buyers', price: 'Free', sub: 'Post requirements · Always free', highlight: false },
            { label: 'Featured listing', price: '$99', sub: 'One-time · 60 day listing', highlight: true },
            { label: 'Agent bundle', price: '$199', sub: 'Per month · Up to 10 listings', highlight: false },
          ].map((tier, i) => (
            <div key={i} style={{ flex: 1, minWidth: '140px', background: tier.highlight ? 'var(--ink)' : 'var(--warm-white)', padding: '1.5rem 1rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', fontWeight: '500', letterSpacing: '0.12em', textTransform: 'uppercase', color: tier.highlight ? 'var(--gold)' : 'var(--ink-light)', marginBottom: '0.5rem' }}>{tier.label}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', fontWeight: '300', color: tier.highlight ? 'var(--gold)' : 'var(--ink)', lineHeight: 1, marginBottom: '0.4rem' }}>{tier.price}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: tier.highlight ? 'rgba(250,248,243,0.5)' : 'var(--ink-light)', fontWeight: '300' }}>{tier.sub}</div>
            </div>
          ))}
        </div>
        <Link href="/pricing" style={{ fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: '500', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--gold)', paddingBottom: '2px' }}>
          See full pricing & compare plans →
        </Link>
      </section>

      <footer className="footer">
        <div className="footer-logo">Prop<span>Match</span></div>
        <div className="footer-links">
          <Link href="/marketplace" className="footer-link">Marketplace</Link>
          <Link href="/services" className="footer-link">Services</Link>
          <Link href="/pricing" className="footer-link">Pricing</Link>
          <Link href="/about" className="footer-link">About</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
        </div>
        <div>© 2025 PropMatch · Australia's buyer-first property platform</div>
      </footer>
    </>
  )
}