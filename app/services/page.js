import Link from 'next/link'

export default function Services() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #faf8f3;
          --warm-white: #fffefb;
          --ink: #1a1714;
          --ink-light: #4a4540;
          --gold: #b8924a;
          --gold-light: #d4aa6a;
          --gold-pale: #f5ecd8;
          --border: #e8e0d0;
          --serif: 'Cormorant Garamond', Georgia, serif;
          --sans: 'DM Sans', sans-serif;
        }

        body { background: var(--cream); color: var(--ink); font-family: var(--sans); }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 3rem;
          background: rgba(250,248,243,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo { font-family: var(--serif); font-size: 1.4rem; font-weight: 600; color: var(--ink); letter-spacing: 0.02em; text-decoration: none; }
        .nav-logo span { color: var(--gold); }
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .nav-link { font-family: var(--sans); font-size: 13px; color: var(--ink-light); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: var(--gold); }
        .nav-link.active { color: var(--gold); }
        .nav-cta { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink); text-decoration: none; border: 1px solid var(--ink); padding: 8px 20px; border-radius: 2px; transition: all 0.2s; }
        .nav-cta:hover { background: var(--ink); color: var(--cream); }

        /* PAGE HEADER */
        .page-header {
          padding: 10rem 3rem 5rem;
          max-width: 1300px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: end;
        }
        .header-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem; }
        .header-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }
        .header-title { font-family: var(--serif); font-size: clamp(2.5rem, 4vw, 4rem); font-weight: 300; line-height: 1.05; color: var(--ink); }
        .header-title em { font-style: italic; color: var(--gold); }
        .header-desc { font-family: var(--sans); font-size: 15px; font-weight: 300; color: var(--ink-light); line-height: 1.8; max-width: 420px; align-self: end; }

        /* DIVIDER */
        .divider { display: flex; align-items: center; gap: 1.5rem; max-width: 1300px; margin: 0 auto; padding: 0 3rem; }
        .divider-line { flex: 1; height: 1px; background: var(--border); }

        /* SERVICE CARDS */
        .services { max-width: 1300px; margin: 0 auto; padding: 4rem 3rem 6rem; display: flex; flex-direction: column; gap: 2px; background: var(--border); border: 1px solid var(--border); }

        .service-card {
          background: var(--warm-white);
          display: grid; grid-template-columns: 1fr 1.4fr;
          overflow: hidden;
        }

        .service-left {
          padding: 3rem;
          border-right: 1px solid var(--border);
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
        }
        .service-bg-num {
          position: absolute; bottom: -1rem; right: -0.5rem;
          font-family: var(--serif); font-size: 8rem; font-weight: 300;
          color: var(--gold-pale); line-height: 1; pointer-events: none; user-select: none;
        }
        .service-icon-wrap {
          width: 52px; height: 52px; background: var(--gold-pale);
          border-radius: 2px; display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin-bottom: 1.5rem;
        }
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

        .service-footer {
          margin-top: auto; padding-top: 1.5rem; border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        .service-note { font-family: var(--sans); font-size: 12px; color: #bbb; font-weight: 300; }
        .service-cta {
          font-family: var(--sans); font-size: 13px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          background: var(--ink); color: var(--cream);
          padding: 10px 24px; border-radius: 2px;
          text-decoration: none; transition: all 0.2s; border: 1px solid var(--ink);
        }
        .service-cta:hover { background: var(--gold); border-color: var(--gold); }

        /* BUNDLE SECTION */
        .bundle { background: var(--ink); padding: 6rem 0; }
        .bundle-inner { max-width: 1300px; margin: 0 auto; padding: 0 3rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .bundle-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.25rem; }
        .bundle-title { font-family: var(--serif); font-size: clamp(2rem, 3vw, 3rem); font-weight: 300; color: var(--cream); line-height: 1.1; margin-bottom: 1.25rem; }
        .bundle-title em { font-style: italic; color: var(--gold); }
        .bundle-desc { font-family: var(--sans); font-size: 14px; color: rgba(250,248,243,0.6); font-weight: 300; line-height: 1.8; margin-bottom: 2rem; }
        .bundle-cta { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; background: var(--gold); color: var(--cream); padding: 14px 32px; border-radius: 2px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .bundle-cta:hover { background: var(--gold-light); }

        .bundle-checklist { display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.06); }
        .bundle-item { background: rgba(255,255,255,0.03); padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1rem; }
        .bundle-item-icon { font-size: 20px; flex-shrink: 0; }
        .bundle-item-text { }
        .bundle-item-name { font-family: var(--serif); font-size: 1.1rem; color: var(--cream); margin-bottom: 2px; }
        .bundle-item-desc { font-family: var(--sans); font-size: 12px; color: rgba(250,248,243,0.45); font-weight: 300; }
        .bundle-tick { margin-left: auto; color: var(--gold); font-size: 16px; flex-shrink: 0; }

        /* FOOTER */
        .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }

        @media (max-width: 900px) {
          .nav { padding: 1rem 1.5rem; }
          .nav-links { gap: 1rem; }
          .page-header { grid-template-columns: 1fr; padding: 8rem 1.5rem 3rem; gap: 1.5rem; }
          .services { padding: 2rem 1.5rem 4rem; margin: 0 1.5rem; }
          .service-card { grid-template-columns: 1fr; }
          .service-left { border-right: none; border-bottom: 1px solid var(--border); }
          .bundle-inner { grid-template-columns: 1fr; padding: 0 1.5rem; gap: 2rem; }
          .footer { padding: 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }
          .divider { padding: 0 1.5rem; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-logo">Prop<span>Match</span></a>
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/services" className="nav-link active">Services</Link>
          <Link href="/post" className="nav-cta">Post Requirement</Link>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <div className="header-eyebrow">Full service property support</div>
          <h1 className="header-title">Everything you need,<br /><em>all in one place.</em></h1>
        </div>
        <p className="header-desc">
          Finding the property is just the beginning. We've partnered with trusted professionals
          to guide you through every step — finance, inspections, and settlement — so nothing falls through the cracks.
        </p>
      </div>

      <div className="divider"><div className="divider-line" /></div>

      {/* SERVICE CARDS */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '4rem 3rem 6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: 'var(--border)', border: '1px solid var(--border)' }}>

          {/* MORTGAGE */}
          <div className="service-card">
            <div className="service-left">
              <div>
                <div className="service-icon-wrap">🏦</div>
                <h2 className="service-name">Mortgage<br /><em>Broking</em></h2>
                <p className="service-tagline">Get the right loan, not just any loan.</p>
              </div>
              <span className="service-badge">Free for buyers</span>
              <div className="service-bg-num">01</div>
            </div>
            <div className="service-right">
              <p className="service-desc">
                Our accredited mortgage brokers compare hundreds of loan products across major banks and non-bank lenders to find you the most competitive rate and structure. Whether you're a first home buyer, upgrading, or investing — we match you with a broker who specialises in your situation.
              </p>
              <div>
                <div className="features-title">What's included</div>
                <ul className="features-list">
                  <li>Free borrowing capacity assessment before you post your requirement</li>
                  <li>Access to 40+ lenders including major banks, credit unions & non-banks</li>
                  <li>Pre-approval support so you can make offers with confidence</li>
                  <li>Guidance on first home buyer grants & stamp duty concessions</li>
                  <li>Ongoing support through to settlement and beyond</li>
                </ul>
              </div>
              <div className="service-footer">
                <span className="service-note">No cost to you — brokers are paid by the lender</span>
                <a href="mailto:hello@propmatch.com.au?subject=Mortgage Broking Enquiry" className="service-cta">Get in touch →</a>
              </div>
            </div>
          </div>

          {/* BUILDING & PEST */}
          <div className="service-card">
            <div className="service-left">
              <div>
                <div className="service-icon-wrap">🔍</div>
                <h2 className="service-name">Building & Pest<br /><em>Inspections</em></h2>
                <p className="service-tagline">Know exactly what you're buying.</p>
              </div>
              <span className="service-badge">Book in 24 hrs</span>
              <div className="service-bg-num">02</div>
            </div>
            <div className="service-right">
              <p className="service-desc">
                Before you commit to any property, our licensed inspectors give you a thorough, plain-English report on the structural condition of the building and any pest activity. We cover all Australian states and can typically complete an inspection within 24–48 hours of your request.
              </p>
              <div>
                <div className="features-title">What's included</div>
                <ul className="features-list">
                  <li>Full structural building inspection by a licensed builder</li>
                  <li>Timber pest & termite inspection to Australian Standard AS 4349</li>
                  <li>Roof, subfloor, and drainage assessment</li>
                  <li>Same-day report with photos and priority findings highlighted</li>
                  <li>Inspector debrief call to walk you through the findings</li>
                </ul>
              </div>
              <div className="service-footer">
                <span className="service-note">Combined reports from $450 · Results same day</span>
                <a href="mailto:hello@propmatch.com.au?subject=Building and Pest Inspection Enquiry" className="service-cta">Book inspection →</a>
              </div>
            </div>
          </div>

          {/* CONVEYANCING */}
          <div className="service-card">
            <div className="service-left">
              <div>
                <div className="service-icon-wrap">📜</div>
                <h2 className="service-name">Conveyancing<br /><em>& Settlement</em></h2>
                <p className="service-tagline">Expert hands on your paperwork.</p>
              </div>
              <span className="service-badge">All states covered</span>
              <div className="service-bg-num">03</div>
            </div>
            <div className="service-right">
              <p className="service-desc">
                Buying property involves a mountain of legal documentation. Our licensed conveyancers and property solicitors handle every step of the legal transfer — from reviewing the contract of sale and conducting title searches, right through to settlement day — so you don't miss a thing.
              </p>
              <div>
                <div className="features-title">What's included</div>
                <ul className="features-list">
                  <li>Contract of sale review and plain-English summary before you sign</li>
                  <li>Title search, certificate of title & encumbrance checks</li>
                  <li>Council, water, and land tax certificate searches</li>
                  <li>Liaison with your lender's solicitors and the seller's conveyancer</li>
                  <li>Settlement day coordination and key handover confirmation</li>
                </ul>
              </div>
              <div className="service-footer">
                <span className="service-note">Fixed fee from $990 · No hidden charges</span>
                <a href="mailto:hello@propmatch.com.au?subject=Conveyancing Enquiry" className="service-cta">Get a quote →</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BUNDLE */}
      <section className="bundle">
        <div className="bundle-inner">
          <div>
            <div className="bundle-eyebrow">The complete package</div>
            <h2 className="bundle-title">Use all three.<br /><em>Save thousands.</em></h2>
            <p className="bundle-desc">
              When you bundle our mortgage broking, building & pest inspection, and conveyancing services together, our team coordinates everything on your behalf. One point of contact from offer to keys.
            </p>
            <a href="mailto:hello@propmatch.com.au?subject=Full Service Bundle Enquiry" className="bundle-cta">Enquire about the bundle</a>
          </div>
          <div className="bundle-checklist">
            <div className="bundle-item">
              <span className="bundle-item-icon">🏦</span>
              <div className="bundle-item-text">
                <div className="bundle-item-name">Mortgage Broking</div>
                <div className="bundle-item-desc">Best rate from 40+ lenders · Free for buyers</div>
              </div>
              <span className="bundle-tick">✦</span>
            </div>
            <div className="bundle-item">
              <span className="bundle-item-icon">🔍</span>
              <div className="bundle-item-text">
                <div className="bundle-item-name">Building & Pest Inspection</div>
                <div className="bundle-item-desc">Licensed inspectors · Same-day report</div>
              </div>
              <span className="bundle-tick">✦</span>
            </div>
            <div className="bundle-item">
              <span className="bundle-item-icon">📜</span>
              <div className="bundle-item-text">
                <div className="bundle-item-name">Conveyancing & Settlement</div>
                <div className="bundle-item-desc">Fixed fee · All states covered</div>
              </div>
              <span className="bundle-tick">✦</span>
            </div>
            <div className="bundle-item" style={{ background: 'rgba(184,146,74,0.08)', borderTop: '1px solid rgba(184,146,74,0.2)' }}>
              <span className="bundle-item-icon">👋</span>
              <div className="bundle-item-text">
                <div className="bundle-item-name">Dedicated coordinator</div>
                <div className="bundle-item-desc">Melina & Mikayla manage your entire journey</div>
              </div>
              <span className="bundle-tick">✦</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Prop<span>Match</span></div>
        <div>© 2025 PropMatch · Australia's buyer-first property platform</div>
      </footer>
    </>
  )
}