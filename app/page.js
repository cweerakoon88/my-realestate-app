import Link from 'next/link'

export default function Home() {
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
        .nav-logo {
          font-family: var(--serif); font-size: 1.4rem; font-weight: 600;
          color: var(--ink); letter-spacing: 0.02em; text-decoration: none;
        }
        .nav-logo span { color: var(--gold); }
        .nav-cta {
          font-family: var(--sans); font-size: 13px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--ink); text-decoration: none;
          border: 1px solid var(--ink); padding: 8px 20px; border-radius: 2px;
          transition: all 0.2s;
        }
        .nav-cta:hover { background: var(--ink); color: var(--cream); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: grid; grid-template-columns: 1fr 1fr; align-items: center;
          padding: 8rem 3rem 4rem;
          gap: 4rem;
          max-width: 1300px; margin: 0 auto;
        }
        .hero-left { position: relative; }
        .hero-eyebrow {
          font-family: var(--sans); font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold);
          display: flex; align-items: center; gap: 10px; margin-bottom: 1.75rem;
        }
        .hero-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }
        .hero-title {
          font-family: var(--serif); font-size: clamp(3rem, 5vw, 5rem);
          font-weight: 300; line-height: 1.05; color: var(--ink);
          margin-bottom: 1.5rem;
        }
        .hero-title em { font-style: italic; color: var(--gold); }
        .hero-subtitle {
          font-family: var(--sans); font-size: 1rem; font-weight: 300;
          line-height: 1.75; color: var(--ink-light); max-width: 420px;
          margin-bottom: 2.5rem;
        }
        .hero-actions { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
        .btn-primary {
          font-family: var(--sans); font-size: 13px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          background: var(--ink); color: var(--cream);
          padding: 14px 32px; border-radius: 2px;
          text-decoration: none; transition: all 0.2s;
          border: 1px solid var(--ink);
        }
        .btn-primary:hover { background: var(--gold); border-color: var(--gold); }
        .btn-secondary {
          font-family: var(--sans); font-size: 13px; font-weight: 400;
          color: var(--ink-light); text-decoration: none;
          display: flex; align-items: center; gap: 8px;
          transition: color 0.2s;
        }
        .btn-secondary:hover { color: var(--gold); }
        .btn-secondary::after { content: '→'; }

        /* HERO VISUAL */
        .hero-right { position: relative; }
        .hero-card {
          background: var(--warm-white);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 2rem;
          position: relative;
        }
        .hero-card::before {
          content: '';
          position: absolute; top: -12px; left: -12px; right: 12px; bottom: 12px;
          border: 1px solid var(--gold-pale);
          border-radius: 4px; z-index: -1;
        }
        .card-tag {
          font-family: var(--sans); font-size: 10px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--gold); background: var(--gold-pale);
          padding: 4px 10px; border-radius: 2px; display: inline-block;
          margin-bottom: 1rem;
        }
        .card-title {
          font-family: var(--serif); font-size: 1.5rem; font-weight: 400;
          color: var(--ink); margin-bottom: 0.5rem; line-height: 1.3;
        }
        .card-location {
          font-family: var(--sans); font-size: 13px; color: var(--ink-light);
          margin-bottom: 1.25rem; display: flex; align-items: center; gap: 6px;
        }
        .card-location::before { content: '◎'; color: var(--gold); font-size: 11px; }
        .card-specs {
          display: flex; gap: 1rem; margin-bottom: 1.5rem;
          padding: 1rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .card-spec {
          display: flex; flex-direction: column; gap: 3px;
        }
        .spec-value { font-family: var(--serif); font-size: 1.2rem; color: var(--ink); }
        .spec-label { font-family: var(--sans); font-size: 11px; color: #aaa; letter-spacing: 0.06em; text-transform: uppercase; }
        .card-budget {
          display: flex; justify-content: space-between; align-items: center;
        }
        .budget-label { font-family: var(--sans); font-size: 12px; color: var(--ink-light); }
        .budget-value { font-family: var(--serif); font-size: 1.4rem; color: var(--gold); font-weight: 600; }
        .offer-count {
          font-family: var(--sans); font-size: 12px; color: var(--gold);
          background: var(--gold-pale); padding: 4px 10px; border-radius: 2px;
        }

        /* DIVIDER */
        .divider {
          display: flex; align-items: center; gap: 1.5rem;
          max-width: 1300px; margin: 0 auto; padding: 0 3rem;
        }
        .divider-line { flex: 1; height: 1px; background: var(--border); }
        .divider-text { font-family: var(--serif); font-size: 1rem; color: #bbb; font-style: italic; white-space: nowrap; }

        /* HOW IT WORKS */
        .section { max-width: 1300px; margin: 0 auto; padding: 6rem 3rem; }
        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-eyebrow {
          font-family: var(--sans); font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold);
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: var(--serif); font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 300; color: var(--ink); line-height: 1.1;
        }
        .section-title em { font-style: italic; color: var(--gold); }

        .steps {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 2px; background: var(--border);
          border: 1px solid var(--border);
        }
        .step {
          background: var(--warm-white);
          padding: 2.5rem 2rem;
          position: relative;
        }
        .step-number {
          font-family: var(--serif); font-size: 4rem; font-weight: 300;
          color: var(--gold-pale); line-height: 1;
          position: absolute; top: 1.5rem; right: 1.5rem;
        }
        .step-icon {
          width: 40px; height: 40px; background: var(--gold-pale);
          border-radius: 2px; display: flex; align-items: center; justify-content: center;
          font-size: 18px; margin-bottom: 1.25rem;
        }
        .step-title { font-family: var(--serif); font-size: 1.3rem; color: var(--ink); margin-bottom: 0.75rem; font-weight: 400; }
        .step-desc { font-family: var(--sans); font-size: 14px; color: var(--ink-light); line-height: 1.7; font-weight: 300; }

        /* ADVANTAGES */
        .advantages { background: var(--ink); padding: 6rem 0; }
        .advantages-inner { max-width: 1300px; margin: 0 auto; padding: 0 3rem; }
        .advantages-header { margin-bottom: 4rem; }
        .advantages-eyebrow {
          font-family: var(--sans); font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold);
          margin-bottom: 1rem;
        }
        .advantages-title {
          font-family: var(--serif); font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 300; color: var(--cream); line-height: 1.1;
        }
        .advantages-title em { font-style: italic; color: var(--gold); }
        .advantages-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .advantage {
          padding: 2.5rem 2rem;
          background: var(--ink);
          transition: background 0.2s;
        }
        .advantage:hover { background: #242018; }
        .advantage-num {
          font-family: var(--serif); font-size: 0.85rem; color: var(--gold);
          margin-bottom: 1rem; font-style: italic;
        }
        .advantage-title {
          font-family: var(--serif); font-size: 1.3rem; color: var(--cream);
          margin-bottom: 0.75rem; font-weight: 400;
        }
        .advantage-desc {
          font-family: var(--sans); font-size: 14px;
          color: rgba(250,248,243,0.55); line-height: 1.7; font-weight: 300;
        }

        /* STATS */
        .stats { max-width: 1300px; margin: 0 auto; padding: 6rem 3rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--border); border: 1px solid var(--border); }
        .stat { background: var(--warm-white); padding: 2.5rem 2rem; text-align: center; }
        .stat-value { font-family: var(--serif); font-size: 3rem; font-weight: 300; color: var(--gold); line-height: 1; margin-bottom: 0.5rem; }
        .stat-label { font-family: var(--sans); font-size: 13px; color: var(--ink-light); font-weight: 300; }

        /* CTA SECTION */
        .cta-section {
          background: var(--gold-pale); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          padding: 6rem 3rem; text-align: center;
        }
        .cta-title { font-family: var(--serif); font-size: clamp(2rem, 3.5vw, 3.5rem); font-weight: 300; color: var(--ink); margin-bottom: 1rem; }
        .cta-title em { font-style: italic; color: var(--gold); }
        .cta-sub { font-family: var(--sans); font-size: 15px; color: var(--ink-light); font-weight: 300; margin-bottom: 2.5rem; line-height: 1.7; }
        .cta-note { font-family: var(--sans); font-size: 12px; color: #bbb; margin-top: 1rem; }

        /* FOOTER */
        .footer {
          padding: 2rem 3rem;
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid var(--border);
          font-family: var(--sans); font-size: 12px; color: #bbb;
        }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }

        @media (max-width: 768px) {
          .nav { padding: 1rem 1.5rem; }
          .hero { grid-template-columns: 1fr; padding: 7rem 1.5rem 3rem; gap: 2.5rem; }
          .hero-right { display: none; }
          .section { padding: 4rem 1.5rem; }
          .steps { grid-template-columns: 1fr; }
          .advantages-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; }
          .divider { padding: 0 1.5rem; }
          .advantages-inner { padding: 0 1.5rem; }
          .cta-section { padding: 4rem 1.5rem; }
          .footer { padding: 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-logo">Prop<span>Match</span></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/services" style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--ink-light)', textDecoration: 'none' }}>Services</Link>
          <Link href="/marketplace" style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--ink-light)', textDecoration: 'none' }}>Marketplace</Link>
          <Link href="/post" className="nav-cta">Post a Requirement</Link>
        </div>
      </nav>

      {/* HERO */}
      <section>
        <div className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow">Australia's smarter property market</div>
            <h1 className="hero-title">
              You name<br />the property.<br /><em>Sellers find you.</em>
            </h1>
            <p className="hero-subtitle">
              Stop scrolling endless listings. Post exactly what you want — suburb, size, budget —
              and let motivated sellers come directly to you with their best offers.
            </p>
            <div className="hero-actions">
              <Link href="/post" className="btn-primary">Post your requirement</Link>
              <a href="#how-it-works" className="btn-secondary">See how it works</a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-card">
              <div className="card-tag">Buyer Requirement</div>
              <div className="card-title">3-bed house with a garden</div>
              <div className="card-location">Richmond, Melbourne VIC</div>
              <div className="card-specs">
                <div className="card-spec">
                  <span className="spec-value">3</span>
                  <span className="spec-label">Bedrooms</span>
                </div>
                <div className="card-spec">
                  <span className="spec-value">2</span>
                  <span className="spec-label">Bathrooms</span>
                </div>
                <div className="card-spec">
                  <span className="spec-value">House</span>
                  <span className="spec-label">Type</span>
                </div>
              </div>
              <div className="card-budget">
                <div>
                  <div className="budget-label">Budget range</div>
                  <div className="budget-value">$1.4M – $1.7M</div>
                </div>
                <div className="offer-count">4 offers received</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider">
        <div className="divider-line" />
        <div className="divider-text">How it works</div>
        <div className="divider-line" />
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works">
        <div className="section-header">
          <div className="section-eyebrow">The process</div>
          <h2 className="section-title">Three steps to your<br /><em>perfect property</em></h2>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <div className="step-icon">📋</div>
            <h3 className="step-title">Post your requirement</h3>
            <p className="step-desc">Tell us your ideal suburb, property type, number of bedrooms, and your budget. Takes less than 2 minutes.</p>
          </div>
          <div className="step">
            <div className="step-number">02</div>
            <div className="step-icon">🔍</div>
            <h3 className="step-title">Sellers browse & match</h3>
            <p className="step-desc">Property owners and agents in your target area see your requirement. If their property fits, they reach out with an offer.</p>
          </div>
          <div className="step">
            <div className="step-number">03</div>
            <div className="step-icon">🤝</div>
            <h3 className="step-title">Compare & connect</h3>
            <p className="step-desc">Review offers from multiple sellers, compare properties, and connect directly with the ones that interest you most.</p>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="advantages">
        <div className="advantages-inner">
          <div className="advantages-header">
            <div className="advantages-eyebrow">Why PropMatch</div>
            <h2 className="advantages-title">A smarter way to<br /><em>buy property</em></h2>
          </div>
          <div className="advantages-grid">
            <div className="advantage">
              <div className="advantage-num">i.</div>
              <h3 className="advantage-title">You're in control</h3>
              <p className="advantage-desc">Traditional property search means you chase listings. Here, sellers compete for your attention. You set the terms — suburb, size, price — and wait for offers to arrive.</p>
            </div>
            <div className="advantage">
              <div className="advantage-num">ii.</div>
              <h3 className="advantage-title">Access off-market properties</h3>
              <p className="advantage-desc">Many sellers don't want to list publicly. They're motivated but private. PropMatch connects you to properties that never hit Domain or realestate.com.au.</p>
            </div>
            <div className="advantage">
              <div className="advantage-num">iii.</div>
              <h3 className="advantage-title">Know what's fair</h3>
              <p className="advantage-desc">Our built-in suburb price guide shows you median prices, market trends, and recent sales before you post — so your budget is grounded in reality.</p>
            </div>
            <div className="advantage">
              <div className="advantage-num">iv.</div>
              <h3 className="advantage-title">No more FOMO</h3>
              <p className="advantage-desc">Stop losing weekends to open homes that don't match your needs. Post once and let the right properties come to you, on your schedule.</p>
            </div>
            <div className="advantage">
              <div className="advantage-num">v.</div>
              <h3 className="advantage-title">Direct seller contact</h3>
              <p className="advantage-desc">No middlemen inflating prices. Connect directly with sellers and negotiate without the pressure of auction environments or bidding wars.</p>
            </div>
            <div className="advantage">
              <div className="advantage-num">vi.</div>
              <h3 className="advantage-title">Completely free for buyers</h3>
              <p className="advantage-desc">Posting a requirement costs you nothing. Browse offers, compare properties, and connect with sellers — all at no cost to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-value">2 min</div>
            <div className="stat-label">Average time to post a requirement</div>
          </div>
          <div className="stat">
            <div className="stat-value">Free</div>
            <div className="stat-label">For all buyers, always</div>
          </div>
          <div className="stat">
            <div className="stat-value">Direct</div>
            <div className="stat-label">Seller contact, no agents required</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to find your<br /><em>perfect property?</em></h2>
        <p className="cta-sub">Post your requirement in 2 minutes and start receiving offers from sellers in your area.</p>
        <Link href="/post" className="btn-primary">Post your requirement — it's free</Link>
        <p className="cta-note">No account needed · No spam · Cancel anytime</p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Prop<span>Match</span></div>
        <div>© 2025 PropMatch · Australia's buyer-first property platform</div>
      </footer>
    </>
  )
}