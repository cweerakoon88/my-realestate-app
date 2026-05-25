'use client'

import Link from 'next/link'
import { useState } from 'react'
import EnquiryModal from '@/components/EnquiryModal'

export default function Services() {
  const [activeEnquiry, setActiveEnquiry] = useState(null)

  const services = [
    {
      num: '01', icon: '🏦',
      name: 'Mortgage', nameEm: 'Broking',
      tagline: 'Get the right loan, not just any loan.',
      badge: 'Free for buyers',
      desc: "Our accredited mortgage brokers compare hundreds of loan products across major banks and non-bank lenders to find you the most competitive rate and structure. Whether you're a first home buyer, upgrading, or investing — we match you with a broker who specialises in your situation.",
      features: [
        'Free borrowing capacity assessment before you post your requirement',
        'Access to 40+ lenders including major banks, credit unions & non-banks',
        'Pre-approval support so you can make offers with confidence',
        'Guidance on first home buyer grants & stamp duty concessions',
        'Ongoing support through to settlement and beyond',
      ],
      note: 'No cost to you — brokers are paid by the lender',
      cta: 'Get in touch →',
    },
    {
      num: '02', icon: '🔍',
      name: 'Building & Pest', nameEm: 'Inspections',
      tagline: "Know exactly what you're buying.",
      badge: 'Book in 24 hrs',
      desc: 'Before you commit to any property, our licensed inspectors give you a thorough, plain-English report on the structural condition of the building and any pest activity. We cover all Australian states and can typically complete an inspection within 24–48 hours of your request.',
      features: [
        'Full structural building inspection by a licensed builder',
        'Timber pest & termite inspection to Australian Standard AS 4349',
        'Roof, subfloor, and drainage assessment',
        'Same-day report with photos and priority findings highlighted',
        'Inspector debrief call to walk you through the findings',
      ],
      note: 'Combined reports from $450 · Results same day',
      cta: 'Book inspection →',
    },
    {
      num: '03', icon: '📜',
      name: 'Conveyancing', nameEm: '& Settlement',
      tagline: 'Expert hands on your paperwork.',
      badge: 'All states covered',
      desc: "Buying property involves a mountain of legal documentation. Our licensed conveyancers and property solicitors handle every step of the legal transfer — from reviewing the contract of sale and conducting title searches, right through to settlement day — so you don't miss a thing.",
      features: [
        'Contract of sale review and plain-English summary before you sign',
        'Title search, certificate of title & encumbrance checks',
        'Council, water, and land tax certificate searches',
        "Liaison with your lender's solicitors and the seller's conveyancer",
        'Settlement day coordination and key handover confirmation',
      ],
      note: 'Fixed fee from $990 · No hidden charges',
      cta: 'Get a quote →',
    },
    {
      num: '04', icon: '🌿',
      name: 'Landscaping', nameEm: '& Gardens',
      tagline: 'Transform your outdoor space from day one.',
      badge: 'Free consultation',
      desc: "First impressions start outside. Whether you're preparing a property for sale, settling into a new home, or simply want to bring your garden to life, our network of professional landscapers delivers beautiful, low-maintenance outdoor spaces tailored to your budget and lifestyle.",
      features: [
        'Free on-site consultation and design concept',
        'Garden design, planting, and lawn installation',
        'Irrigation systems and water-wise landscaping',
        'Paving, decking, retaining walls, and outdoor structures',
        'Ongoing maintenance plans available',
      ],
      note: 'Quotes from $500 · All metro areas covered',
      cta: 'Get a quote →',
    },
    {
      num: '05', icon: '🔧',
      name: 'Handyman', nameEm: 'Services',
      tagline: 'Every property needs a little TLC.',
      badge: 'Same week booking',
      desc: "Moving into a new property always reveals a to-do list. Our trusted handyman network handles everything from minor repairs and painting to flat-pack assembly and general maintenance — so your new home is move-in ready without the stress of finding reliable tradespeople yourself.",
      features: [
        'General repairs — doors, windows, locks, tiling, grouting',
        'Interior and exterior painting & touch-ups',
        'Flat-pack furniture assembly (IKEA, Bunnings & more)',
        'Picture hanging, shelving, and TV wall mounting',
        'Pre-sale property preparation and minor renovations',
      ],
      note: 'From $95/hr · No call-out fee for PropMatch clients',
      cta: 'Book now →',
    },
  ]

  const bundleItems = [
    { icon: '🏦', name: 'Mortgage Broking', desc: 'Best rate from 40+ lenders · Free for buyers' },
    { icon: '🔍', name: 'Building & Pest Inspection', desc: 'Licensed inspectors · Same-day report' },
    { icon: '📜', name: 'Conveyancing & Settlement', desc: 'Fixed fee · All states covered' },
    { icon: '🌿', name: 'Landscaping & Gardens', desc: 'Free consultation · All metro areas' },
    { icon: '🔧', name: 'Handyman Services', desc: 'Same week · No call-out fee' },
  ]

  return (
    <>
      <style>{styles}</style>

      {activeEnquiry && (
        <EnquiryModal
          service={activeEnquiry}
          onClose={() => setActiveEnquiry(null)}
        />
      )}

      <nav className="nav">
        <a href="/" className="nav-logo">Prop<span>Match</span></a>
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/services" className="nav-link active">Services</Link>
          <Link href="/post" className="nav-cta">Post Requirement</Link>
        </div>
      </nav>

      <div className="page-header">
        <div>
          <div className="header-eyebrow">Full service property support</div>
          <h1 className="header-title">Everything you need,<br /><em>all in one place.</em></h1>
        </div>
        <p className="header-desc">
          Finding the property is just the beginning. We've partnered with trusted professionals
          to guide you through every step — finance, inspections, settlement, landscaping and maintenance.
        </p>
      </div>

      <div className="divider"><div className="divider-line" /></div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '4rem 3rem 6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {services.map((s) => (
            <div className="service-card" key={s.num}>
              <div className="service-left">
                <div>
                  <div className="service-icon-wrap">{s.icon}</div>
                  <h2 className="service-name">{s.name}<br /><em>{s.nameEm}</em></h2>
                  <p className="service-tagline">{s.tagline}</p>
                </div>
                <span className="service-badge">{s.badge}</span>
                <div className="service-bg-num">{s.num}</div>
              </div>
              <div className="service-right">
                <p className="service-desc">{s.desc}</p>
                <div>
                  <div className="features-title">What's included</div>
                  <ul className="features-list">
                    {s.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
                <div className="service-footer">
                  <span className="service-note">{s.note}</span>
                  <button
                    className="service-cta"
                    onClick={() => setActiveEnquiry(`${s.name} ${s.nameEm}`)}
                  >
                    {s.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="bundle">
        <div className="bundle-inner">
          <div>
            <div className="bundle-eyebrow">The complete package</div>
            <h2 className="bundle-title">Use all five.<br /><em>Save thousands.</em></h2>
            <p className="bundle-desc">When you bundle our services together, our team coordinates everything on your behalf. One point of contact from offer to keys — and beyond.</p>
            <button className="bundle-cta" onClick={() => setActiveEnquiry('Full Service Bundle')}>
              Enquire about the bundle
            </button>
          </div>
          <div className="bundle-checklist">
            {bundleItems.map((item, i) => (
              <div className="bundle-item" key={i}>
                <span className="bundle-item-icon">{item.icon}</span>
                <div>
                  <div className="bundle-item-name">{item.name}</div>
                  <div className="bundle-item-desc">{item.desc}</div>
                </div>
                <span className="bundle-tick">✦</span>
              </div>
            ))}
            <div className="bundle-item" style={{ background: 'rgba(184,146,74,0.08)', borderTop: '1px solid rgba(184,146,74,0.2)' }}>
              <span className="bundle-item-icon">👋</span>
              <div>
                <div className="bundle-item-name">Dedicated coordinator</div>
                <div className="bundle-item-desc">Melina & Mikayla manage your entire journey</div>
              </div>
              <span className="bundle-tick">✦</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">Prop<span>Match</span></div>
        <div>© 2025 PropMatch · Australia's buyer-first property platform</div>
      </footer>
    </>
  )
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
    --gold: #b8924a; --gold-light: #d4aa6a; --gold-pale: #f5ecd8; --border: #e8e0d0;
    --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
  }
  body { background: var(--cream); color: var(--ink); font-family: var(--sans); }
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 3rem; background: rgba(250,248,243,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
  .nav-logo { font-family: var(--serif); font-size: 1.4rem; font-weight: 600; color: var(--ink); letter-spacing: 0.02em; text-decoration: none; }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; align-items: center; gap: 2rem; }
  .nav-link { font-family: var(--sans); font-size: 13px; color: var(--ink-light); text-decoration: none; transition: color 0.2s; }
  .nav-link:hover, .nav-link.active { color: var(--gold); }
  .nav-cta { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink); text-decoration: none; border: 1px solid var(--ink); padding: 8px 20px; border-radius: 2px; transition: all 0.2s; }
  .nav-cta:hover { background: var(--ink); color: var(--cream); }
  .page-header { padding: 10rem 3rem 5rem; max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: end; }
  .header-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem; }
  .header-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }
  .header-title { font-family: var(--serif); font-size: clamp(2.5rem, 4vw, 4rem); font-weight: 300; line-height: 1.05; color: var(--ink); }
  .header-title em { font-style: italic; color: var(--gold); }
  .header-desc { font-family: var(--sans); font-size: 15px; font-weight: 300; color: var(--ink-light); line-height: 1.8; max-width: 420px; align-self: end; }
  .divider { display: flex; align-items: center; gap: 1.5rem; max-width: 1300px; margin: 0 auto; padding: 0 3rem; }
  .divider-line { flex: 1; height: 1px; background: var(--border); }
  .service-card { background: var(--warm-white); display: grid; grid-template-columns: 1fr 1.4fr; overflow: hidden; }
  .service-left { padding: 3rem; border-right: 1px solid var(--border); display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; }
  .service-bg-num { position: absolute; bottom: -1rem; right: -0.5rem; font-family: var(--serif); font-size: 8rem; font-weight: 300; color: var(--gold-pale); line-height: 1; pointer-events: none; user-select: none; }
  .service-icon-wrap { width: 52px; height: 52px; background: var(--gold-pale); border-radius: 2px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 1.5rem; }
  .service-name { font-family: var(--serif); font-size: 1.8rem; font-weight: 300; color: var(--ink); line-height: 1.2; margin-bottom: 0.75rem; }
  .service-name em { font-style: italic; color: var(--gold); }
  .service-tagline { font-family: var(--sans); font-size: 13px; font-weight: 300; color: var(--ink-light); line-height: 1.6; margin-bottom: 2rem; }
  .service-badge { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); background: var(--gold-pale); padding: 5px 12px; border-radius: 2px; display: inline-block; }
  .service-right { padding: 3rem; display: flex; flex-direction: column; gap: 2rem; }
  .service-desc { font-family: var(--sans); font-size: 14px; font-weight: 300; color: var(--ink-light); line-height: 1.8; }
  .features-title { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #bbb; margin-bottom: 0.75rem; }
  .features-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .features-list li { font-family: var(--sans); font-size: 14px; color: var(--ink-light); font-weight: 300; display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; }
  .features-list li::before { content: '✦'; color: var(--gold); font-size: 9px; margin-top: 4px; flex-shrink: 0; }
  .service-footer { margin-top: auto; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
  .service-note { font-family: var(--sans); font-size: 12px; color: #bbb; font-weight: 300; }
  .service-cta { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; background: var(--ink); color: var(--cream); padding: 10px 24px; border-radius: 2px; text-decoration: none; transition: all 0.2s; border: 1px solid var(--ink); cursor: pointer; }
  .service-cta:hover { background: var(--gold); border-color: var(--gold); }
  .bundle { background: var(--ink); padding: 6rem 0; }
  .bundle-inner { max-width: 1300px; margin: 0 auto; padding: 0 3rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .bundle-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.25rem; }
  .bundle-title { font-family: var(--serif); font-size: clamp(2rem, 3vw, 3rem); font-weight: 300; color: var(--cream); line-height: 1.1; margin-bottom: 1.25rem; }
  .bundle-title em { font-style: italic; color: var(--gold); }
  .bundle-desc { font-family: var(--sans); font-size: 14px; color: rgba(250,248,243,0.6); font-weight: 300; line-height: 1.8; margin-bottom: 2rem; }
  .bundle-cta { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; background: var(--gold); color: var(--cream); padding: 14px 32px; border-radius: 2px; border: none; cursor: pointer; transition: all 0.2s; display: inline-block; }
  .bundle-cta:hover { background: var(--gold-light); }
  .bundle-checklist { display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.06); }
  .bundle-item { background: rgba(255,255,255,0.03); padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1rem; }
  .bundle-item-icon { font-size: 20px; flex-shrink: 0; }
  .bundle-item-name { font-family: var(--serif); font-size: 1.1rem; color: var(--cream); margin-bottom: 2px; }
  .bundle-item-desc { font-family: var(--sans); font-size: 12px; color: rgba(250,248,243,0.45); font-weight: 300; }
  .bundle-tick { margin-left: auto; color: var(--gold); font-size: 16px; flex-shrink: 0; }
  .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; }
  .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
  .footer-logo span { color: var(--gold); }
  @media (max-width: 900px) {
    .nav { padding: 1rem 1.5rem; } .nav-links { gap: 1rem; }
    .page-header { grid-template-columns: 1fr; padding: 8rem 1.5rem 3rem; gap: 1.5rem; }
    .service-card { grid-template-columns: 1fr; }
    .service-left { border-right: none; border-bottom: 1px solid var(--border); }
    .bundle-inner { grid-template-columns: 1fr; padding: 0 1.5rem; gap: 2rem; }
    .footer { padding: 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }
    .divider { padding: 0 1.5rem; }
  }
`