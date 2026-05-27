import Link from 'next/link'

export default function About() {
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

        /* NAV */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 3rem; background: rgba(250,248,243,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-logo { font-family: var(--serif); font-size: 1.4rem; font-weight: 600; color: var(--ink); letter-spacing: 0.02em; text-decoration: none; }
        .nav-logo span { color: var(--gold); }
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .nav-link { font-family: var(--sans); font-size: 13px; color: var(--ink-light); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover, .nav-link.active { color: var(--gold); }
        .nav-cta { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink); text-decoration: none; border: 1px solid var(--ink); padding: 8px 20px; border-radius: 2px; transition: all 0.2s; }
        .nav-cta:hover { background: var(--ink); color: var(--cream); }

        /* HERO */
        .hero { padding: 10rem 3rem 6rem; max-width: 900px; margin: 0 auto; }
        .hero-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 2rem; }
        .hero-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }
        .hero-title { font-family: var(--serif); font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 300; line-height: 1.05; color: var(--ink); margin-bottom: 2rem; }
        .hero-title em { font-style: italic; color: var(--gold); }
        .hero-lead { font-family: var(--serif); font-size: 1.4rem; font-weight: 300; color: var(--ink-light); line-height: 1.7; max-width: 700px; font-style: italic; }

        /* STORY SECTION */
        .story { max-width: 900px; margin: 0 auto; padding: 0 3rem 6rem; }
        .story-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; margin-bottom: 4rem; align-items: start; }
        .story-label { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); padding-top: 0.5rem; position: sticky; top: 8rem; }
        .story-body { }
        .story-body p { font-family: var(--sans); font-size: 15px; font-weight: 300; color: var(--ink-light); line-height: 1.9; margin-bottom: 1.5rem; }
        .story-body p:last-child { margin-bottom: 0; }
        .story-body strong { color: var(--ink); font-weight: 500; }
        .story-pull { font-family: var(--serif); font-size: 1.8rem; font-weight: 300; color: var(--ink); line-height: 1.3; font-style: italic; border-left: 2px solid var(--gold); padding-left: 2rem; margin: 3rem 0; }
        .story-pull em { color: var(--gold); }

        /* PROBLEM SECTION */
        .problem { background: var(--ink); padding: 6rem 0; }
        .problem-inner { max-width: 900px; margin: 0 auto; padding: 0 3rem; }
        .problem-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; }
        .problem-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 300; color: var(--cream); line-height: 1.1; margin-bottom: 3rem; }
        .problem-title em { font-style: italic; color: var(--gold); }
        .problem-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.08); margin-bottom: 3rem; }
        .problem-item { background: var(--ink); padding: 2rem; }
        .problem-item:hover { background: #242018; }
        .problem-num { font-family: var(--serif); font-size: 0.85rem; color: var(--gold); font-style: italic; margin-bottom: 0.75rem; }
        .problem-item-title { font-family: var(--serif); font-size: 1.2rem; color: var(--cream); margin-bottom: 0.5rem; font-weight: 400; }
        .problem-item-desc { font-family: var(--sans); font-size: 13px; color: rgba(250,248,243,0.55); line-height: 1.7; font-weight: 300; }

        /* MISSION */
        .mission { max-width: 900px; margin: 0 auto; padding: 6rem 3rem; }
        .mission-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 300; color: var(--ink); line-height: 1.1; margin-bottom: 2rem; }
        .mission-title em { font-style: italic; color: var(--gold); }
        .mission-body { font-family: var(--sans); font-size: 15px; font-weight: 300; color: var(--ink-light); line-height: 1.9; max-width: 680px; }
        .mission-body p { margin-bottom: 1.5rem; }

        /* VALUES */
        .values { background: var(--gold-pale); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 6rem 0; }
        .values-inner { max-width: 900px; margin: 0 auto; padding: 0 3rem; }
        .values-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .values-title { font-family: var(--serif); font-size: clamp(2rem, 3vw, 3rem); font-weight: 300; color: var(--ink); line-height: 1.1; margin-bottom: 3rem; }
        .values-title em { font-style: italic; color: var(--gold); }
        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--border); border: 1px solid var(--border); }
        .value { background: var(--warm-white); padding: 2rem; }
        .value-icon { font-size: 1.5rem; margin-bottom: 1rem; }
        .value-title { font-family: var(--serif); font-size: 1.2rem; color: var(--ink); margin-bottom: 0.5rem; font-weight: 400; }
        .value-desc { font-family: var(--sans); font-size: 13px; color: var(--ink-light); line-height: 1.7; font-weight: 300; }

        /* TEAM */
        .team { max-width: 900px; margin: 0 auto; padding: 6rem 3rem; }
        .team-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .team-title { font-family: var(--serif); font-size: clamp(2rem, 3vw, 3rem); font-weight: 300; color: var(--ink); line-height: 1.1; margin-bottom: 3rem; }
        .team-title em { font-style: italic; color: var(--gold); }
        .team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; background: var(--border); border: 1px solid var(--border); }
        .team-card { background: var(--warm-white); padding: 2.5rem 2rem; }
        .team-avatar { width: 56px; height: 56px; border-radius: 50%; background: var(--gold); display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-size: 1.4rem; color: var(--cream); margin-bottom: 1.25rem; }
        .team-name { font-family: var(--serif); font-size: 1.4rem; font-weight: 400; color: var(--ink); margin-bottom: 0.25rem; }
        .team-role { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .team-bio { font-family: var(--sans); font-size: 13px; color: var(--ink-light); line-height: 1.7; font-weight: 300; }

        /* CTA */
        .cta { background: var(--ink); padding: 6rem 3rem; text-align: center; }
        .cta-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 300; color: var(--cream); margin-bottom: 1rem; line-height: 1.1; }
        .cta-title em { font-style: italic; color: var(--gold); }
        .cta-sub { font-family: var(--sans); font-size: 15px; color: rgba(250,248,243,0.55); font-weight: 300; margin-bottom: 2.5rem; line-height: 1.7; max-width: 560px; margin-left: auto; margin-right: auto; }
        .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .btn-gold { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; background: var(--gold); color: var(--cream); padding: 14px 32px; border-radius: 2px; text-decoration: none; transition: background 0.2s; border: none; cursor: pointer; }
        .btn-gold:hover { background: var(--gold-light); }
        .btn-ghost { font-family: var(--sans); font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(250,248,243,0.6); text-decoration: none; border: 1px solid rgba(250,248,243,0.2); padding: 14px 32px; border-radius: 2px; transition: all 0.2s; }
        .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

        /* FOOTER */
        .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; flex-wrap: wrap; gap: 1rem; }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }
        .footer-links { display: flex; gap: 1.5rem; }
        .footer-link { color: #bbb; text-decoration: none; transition: color 0.15s; }
        .footer-link:hover { color: var(--gold); }

        @media (max-width: 768px) {
          .nav { padding: 1rem 1.5rem; }
          .nav-links { gap: 1rem; }
          .hero { padding: 7rem 1.5rem 4rem; }
          .story { padding: 0 1.5rem 4rem; }
          .story-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .story-label { position: static; }
          .problem-inner { padding: 0 1.5rem; }
          .problem-grid { grid-template-columns: 1fr; }
          .mission { padding: 4rem 1.5rem; }
          .values-inner { padding: 0 1.5rem; }
          .values-grid { grid-template-columns: 1fr; }
          .team { padding: 4rem 1.5rem; }
          .team-grid { grid-template-columns: 1fr; }
          .cta { padding: 4rem 1.5rem; }
          .footer { padding: 1.5rem; flex-direction: column; text-align: center; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-logo">Prop<span>Match</span></a>
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/marketplace" className="nav-link">Marketplace</Link>
          <Link href="/about" className="nav-link active">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          <Link href="/post" className="nav-cta">Post Requirement</Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-eyebrow">Our story</div>
        <h1 className="hero-title">Built from<br />frustration.<br /><em>Driven by fairness.</em></h1>
        <p className="hero-lead">PropMatch was born from a simple but painful realisation — the Australian property market is broken for both buyers and sellers.</p>
      </div>

      {/* STORY */}
      <div className="story">
        <div className="story-grid">
          <div className="story-label">The problem we lived</div>
          <div className="story-body">
            <p>As a buyer, I spent months searching for a property in the right location. Every week it was the same story — properties going to auction with no cooling-off period, having to decide on the spot whether to bid tens of thousands above my budget, with no real protection if something went wrong after settlement.</p>
            <p>The pressure was relentless. Agents calling constantly, open homes on weekends that didn't match what I was looking for, and a system designed to maximise competition and stress — not to help me find the right home.</p>

            <div className="story-pull">
              "Every weekend I'd go to inspections that didn't match what I needed. The whole system felt designed to exhaust you into <em>settling</em> for something."
            </div>

            <p>Then I found myself on the other side. When it came time to sell my own property, I quickly discovered the seller's experience wasn't much better. I didn't want a massive board planted in front of my home. I didn't want to pay thousands in marketing fees before a single buyer had even walked through the door.</p>
            <p>And most of all, I didn't want the constant pressure from agents pushing me to accept a price I wasn't happy with — on their timeline, not mine.</p>
            <p><strong>There had to be a better way.</strong> A way for buyers to say exactly what they want, and for sellers to respond only when they have something that genuinely matches. A direct, private, pressure-free connection between the two people who actually matter in a property transaction.</p>
            <p>That's why we built PropMatch.</p>
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="problem">
        <div className="problem-inner">
          <div className="problem-eyebrow">What's broken</div>
          <h2 className="problem-title">The Australian property<br />market wasn't built<br /><em>for you.</em></h2>
          <div className="problem-grid">
            <div className="problem-item">
              <div className="problem-num">i.</div>
              <h3 className="problem-item-title">Auctions with no cooling-off</h3>
              <p className="problem-item-desc">Buyers are forced to make one of the biggest financial decisions of their lives on the spot, under pressure, with no protection if something goes wrong after the hammer falls.</p>
            </div>
            <div className="problem-item">
              <div className="problem-num">ii.</div>
              <h3 className="problem-item-title">Endless open homes</h3>
              <p className="problem-item-desc">Weekends lost to inspections that don't match your needs. A system where you chase properties rather than properties coming to you.</p>
            </div>
            <div className="problem-item">
              <div className="problem-num">iii.</div>
              <h3 className="problem-item-title">Massive marketing fees</h3>
              <p className="problem-item-desc">Sellers pay thousands in upfront marketing costs before a single genuine buyer has expressed interest — with no guarantee of a sale.</p>
            </div>
            <div className="problem-item">
              <div className="problem-num">iv.</div>
              <h3 className="problem-item-title">Agent pressure to sell</h3>
              <p className="problem-item-desc">Constant calls, lowball offers dressed up as "market feedback," and pressure to accept a price you're not comfortable with — on the agent's timeline, not yours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <div className="mission">
        <h2 className="mission-title">Our mission is<br />simple — <em>put people<br />back in control.</em></h2>
        <div className="mission-body">
          <p>PropMatch flips the traditional model. Instead of sellers listing and buyers searching, buyers post exactly what they want — suburb, property type, bedrooms, budget — and sellers with matching properties reach out directly.</p>
          <p>No auctions. No board out front. No upfront marketing costs. No middlemen inflating prices. Just a direct, private conversation between a motivated buyer and a motivated seller.</p>
          <p>For buyers, it means no more chasing. For sellers, it means connecting with pre-qualified buyers who have already told you exactly what they're looking for and what they're willing to pay.</p>
        </div>
      </div>

      {/* VALUES */}
      <section className="values">
        <div className="values-inner">
          <div className="values-eyebrow">What we stand for</div>
          <h2 className="values-title">Built on <em>principles,</em><br />not commissions.</h2>
          <div className="values-grid">
            <div className="value">
              <div className="value-icon">⚖️</div>
              <h3 className="value-title">Fairness</h3>
              <p className="value-desc">Buyers post for free. Sellers pay a simple flat fee — not a commission on your sale price. We never take a cut of your transaction.</p>
            </div>
            <div className="value">
              <div className="value-icon">🔒</div>
              <h3 className="value-title">Privacy</h3>
              <p className="value-desc">Sellers can reach motivated buyers without a public listing. Buyers stay anonymous until they choose to connect. No boards. No mass campaigns.</p>
            </div>
            <div className="value">
              <div className="value-icon">🤝</div>
              <h3 className="value-title">Transparency</h3>
              <p className="value-desc">Our suburb price guide shows real market data before you post. No hidden fees, no surprise commissions — just honest pricing from day one.</p>
            </div>
            <div className="value">
              <div className="value-icon">🏡</div>
              <h3 className="value-title">People first</h3>
              <p className="value-desc">Every requirement is personally reviewed by our team. We're not just a platform — we're people who've been through this and want to make it better.</p>
            </div>
            <div className="value">
              <div className="value-icon">⚡</div>
              <h3 className="value-title">Simplicity</h3>
              <p className="value-desc">Post a requirement in under 2 minutes. No lengthy sign-up forms, no confusing dashboards. Property matching should be simple.</p>
            </div>
            <div className="value">
              <div className="value-icon">🇦🇺</div>
              <h3 className="value-title">Australian built</h3>
              <p className="value-desc">Built in Australia, for Australians. We understand the local market, the frustrations, and what a better property experience looks like.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <div className="team">
        <div className="team-eyebrow">The team</div>
        <h2 className="team-title">Small team.<br /><em>Big mission.</em></h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">C</div>
            <div className="team-name">Callum Weerakoon</div>
            <div className="team-role">Founder</div>
            <p className="team-bio">Former property buyer and seller who experienced firsthand the frustration of auctions, marketing fees, and agent pressure. Built PropMatch to create the platform he wished existed when he was searching for his own home in Melbourne.</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">M</div>
            <div className="team-name">Mel</div>
            <div className="team-role">Client Experience</div>
            <p className="team-bio">Our client experience team personally reviews every requirement posted on PropMatch and works to connect buyers and sellers in a way that feels human, not algorithmic. They're your first point of contact for anything you need.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="cta">
        <h2 className="cta-title">Ready to experience<br />property <em>your way?</em></h2>
        <p className="cta-sub">Post your requirement for free and let sellers with matching properties come to you. No auctions. No pressure. No commissions.</p>
        <div className="cta-actions">
          <Link href="/post" className="btn-gold">Post a requirement — free</Link>
          <Link href="/contact" className="btn-ghost">Get in touch</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Prop<span>Match</span></div>
        <div className="footer-links">
          <Link href="/about" className="footer-link">About</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
          <Link href="/pricing" className="footer-link">Pricing</Link>
          <Link href="/marketplace" className="footer-link">Marketplace</Link>
        </div>
        <div>© 2025 PropMatch · Australia's buyer-first property platform</div>
      </footer>
    </>
  )
}