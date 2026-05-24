'use client'
import Link from 'next/link'

export default function Pricing() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
          --gold: #b8924a; --gold-light: #d4aa6a; --gold-pale: #f5ecd8; --border: #e8e0d0;
          --green: #2d6a4f; --green-bg: #f0faf4; --green-border: #b7e4c7;
          --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
        }
        body { background: var(--cream); color: var(--ink); font-family: var(--sans); }
        .nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 3rem; background: rgba(250,248,243,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-logo { font-family: var(--serif); font-size: 1.4rem; font-weight: 600; color: var(--ink); text-decoration: none; }
        .nav-logo span { color: var(--gold); }
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .nav-link { font-family: var(--sans); font-size: 13px; color: var(--ink-light); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover, .nav-link.active { color: var(--gold); }
        .nav-cta { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink); text-decoration: none; border: 1px solid var(--ink); padding: 8px 20px; transition: all 0.2s; }
        .nav-cta:hover { background: var(--ink); color: var(--cream); }
        .page-header { max-width: 860px; margin: 0 auto; padding: 5rem 3rem 3rem; text-align: center; }
        .header-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .header-eyebrow::before, .header-eyebrow::after { content: ''; display: block; width: 28px; height: 1px; background: var(--gold); }
        .header-title { font-family: var(--serif); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; line-height: 1.05; color: var(--ink); margin-bottom: 1.25rem; }
        .header-title em { font-style: italic; color: var(--gold); }
        .header-desc { font-family: var(--sans); font-size: 15px; font-weight: 300; color: var(--ink-light); line-height: 1.8; max-width: 560px; margin: 0 auto 2rem; }
        .toggle-wrap { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 3rem; }
        .toggle-label { font-family: var(--sans); font-size: 13px; color: var(--ink-light); }
        .toggle-label.active { color: var(--ink); font-weight: 500; }
        .toggle { position: relative; width: 48px; height: 26px; }
        .toggle input { opacity: 0; width: 0; height: 0; }
        .toggle-slider { position: absolute; inset: 0; background: var(--border); border-radius: 26px; cursor: pointer; transition: 0.3s; }
        .toggle-slider:before { content: ''; position: absolute; width: 20px; height: 20px; left: 3px; top: 3px; background: white; border-radius: 50%; transition: 0.3s; }
        .toggle input:checked + .toggle-slider { background: var(--gold); }
        .toggle input:checked + .toggle-slider:before { transform: translateX(22px); }
        .save-badge { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--green); background: var(--green-bg); border: 1px solid var(--green-border); padding: 3px 10px; border-radius: 20px; }
        .audience-tabs { display: flex; justify-content: center; gap: 4px; margin: 0 auto 2rem; background: var(--warm-white); border: 1px solid var(--border); padding: 4px; max-width: 320px; }
        .aud-tab { flex: 1; padding: 10px; border: none; background: none; font-family: var(--sans); font-size: 13px; color: var(--ink-light); cursor: pointer; transition: all 0.2s; }
        .aud-tab.active { background: var(--ink); color: var(--cream); font-weight: 500; }
        .pricing-section { max-width: 1100px; margin: 0 auto; padding: 0 3rem 5rem; }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
        .pricing-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
        .plan { background: var(--warm-white); padding: 2.5rem 2rem; display: flex; flex-direction: column; position: relative; }
        .plan.featured { background: var(--ink); }
        .plan-badge { font-family: var(--sans); font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; background: var(--gold-pale); color: var(--gold); padding: 4px 12px; display: inline-block; margin-bottom: 1.5rem; align-self: flex-start; }
        .plan.featured .plan-badge { background: var(--gold); color: var(--ink); }
        .plan-name { font-family: var(--serif); font-size: 1.6rem; font-weight: 300; color: var(--ink); margin-bottom: 0.5rem; }
        .plan.featured .plan-name { color: var(--cream); }
        .plan-tagline { font-family: var(--sans); font-size: 13px; font-weight: 300; color: var(--ink-light); margin-bottom: 1.75rem; line-height: 1.5; }
        .plan.featured .plan-tagline { color: rgba(250,248,243,0.6); }
        .plan-price-wrap { margin-bottom: 1.75rem; padding-bottom: 1.75rem; border-bottom: 1px solid var(--border); }
        .plan.featured .plan-price-wrap { border-color: rgba(255,255,255,0.1); }
        .plan-price { font-family: var(--serif); font-size: 3rem; font-weight: 300; color: var(--ink); line-height: 1; }
        .plan.featured .plan-price { color: var(--gold); }
        .plan-price sup { font-size: 1.2rem; vertical-align: top; margin-top: 0.5rem; }
        .plan-period { font-family: var(--sans); font-size: 12px; color: var(--ink-light); margin-top: 6px; font-weight: 300; }
        .plan.featured .plan-period { color: rgba(250,248,243,0.5); }
        .plan-original { font-family: var(--sans); font-size: 13px; color: var(--ink-light); text-decoration: line-through; margin-top: 4px; display: none; }
        .plan-original.show { display: block; }
        .plan.featured .plan-original { color: rgba(250,248,243,0.4); }
        .plan-features { list-style: none; flex: 1; margin-bottom: 2rem; display: flex; flex-direction: column; gap: 10px; }
        .plan-features li { font-family: var(--sans); font-size: 13px; color: var(--ink-light); display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; }
        .plan.featured .plan-features li { color: rgba(250,248,243,0.7); }
        .feat-check { color: var(--gold); font-size: 14px; flex-shrink: 0; margin-top: 1px; }
        .feat-x { color: #ccc; font-size: 14px; flex-shrink: 0; margin-top: 1px; }
        .plan.featured .feat-x { color: rgba(255,255,255,0.2); }
        .plan-cta { font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; padding: 13px 24px; text-align: center; text-decoration: none; border: 1px solid var(--ink); color: var(--ink); transition: all 0.2s; display: block; background: none; cursor: pointer; }
        .plan-cta:hover { background: var(--ink); color: var(--cream); }
        .plan.featured .plan-cta { background: var(--gold); border-color: var(--gold); color: var(--ink); }
        .plan.featured .plan-cta:hover { background: var(--gold-light); border-color: var(--gold-light); }
        .compare-section { max-width: 900px; margin: 0 auto; padding: 0 3rem 5rem; }
        .section-title { font-family: var(--serif); font-size: 1.8rem; font-weight: 300; color: var(--ink); text-align: center; margin-bottom: 2rem; }
        .section-title em { font-style: italic; color: var(--gold); }
        table.compare { width: 100%; border-collapse: collapse; font-family: var(--sans); }
        table.compare th { font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-light); padding: 12px 16px; text-align: left; border-bottom: 2px solid var(--border); }
        table.compare th:not(:first-child) { text-align: center; }
        table.compare td { font-size: 13px; color: var(--ink-light); padding: 12px 16px; border-bottom: 1px solid var(--border); line-height: 1.5; }
        table.compare td:not(:first-child) { text-align: center; }
        table.compare tr:hover td { background: #fffcf7; }
        .compare-check { color: var(--green); font-size: 15px; }
        .compare-dash { color: #ccc; font-size: 15px; }
        .compare-section-row td { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); background: var(--gold-pale) !important; padding: 8px 16px; }
        .faq-section { max-width: 720px; margin: 0 auto; padding: 0 3rem 5rem; }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-q { font-family: var(--sans); font-size: 14px; font-weight: 500; color: var(--ink); padding: 1.25rem 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 1rem; list-style: none; }
        .faq-q:hover { color: var(--gold); }
        .faq-icon { font-size: 20px; color: var(--gold); flex-shrink: 0; transition: transform 0.3s; line-height: 1; }
        .faq-a { font-family: var(--sans); font-size: 13px; color: var(--ink-light); line-height: 1.8; padding-bottom: 1.25rem; }
        details[open] .faq-icon { transform: rotate(45deg); }
        .cta-banner { background: var(--ink); padding: 5rem 3rem; text-align: center; }
        .cta-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; color: var(--cream); margin-bottom: 1rem; }
        .cta-title em { font-style: italic; color: var(--gold); }
        .cta-sub { font-family: var(--sans); font-size: 14px; color: rgba(250,248,243,0.55); font-weight: 300; margin-bottom: 2.5rem; line-height: 1.7; }
        .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .cta-btn-gold { font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; background: var(--gold); color: var(--ink); padding: 14px 32px; text-decoration: none; transition: background 0.2s; }
        .cta-btn-gold:hover { background: var(--gold-light); }
        .cta-btn-ghost { font-family: var(--sans); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(250,248,243,0.6); text-decoration: none; border: 1px solid rgba(250,248,243,0.2); padding: 14px 32px; transition: all 0.2s; }
        .cta-btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
        .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; flex-wrap: wrap; gap: 1rem; }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }
        @media (max-width: 860px) {
          .nav { padding: 1rem 1.5rem; } .nav-links { gap: 1rem; }
          .page-header, .pricing-section, .compare-section, .faq-section { padding-left: 1.5rem; padding-right: 1.5rem; }
          .pricing-grid, .pricing-grid-2 { grid-template-columns: 1fr; }
          .cta-banner { padding: 4rem 1.5rem; }
          .footer { padding: 1.5rem; flex-direction: column; text-align: center; }
        }
      `}</style>

      <nav className="nav">
        <a href="/" className="nav-logo">Prop<span>Match</span></a>
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/marketplace" className="nav-link">Marketplace</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/pricing" className="nav-link active">Pricing</Link>
          <Link href="/post" className="nav-cta">Post Requirement</Link>
        </div>
      </nav>

      <div className="page-header">
        <div className="header-eyebrow">Simple, transparent pricing</div>
        <h1 className="header-title">Free for buyers.<br /><em>Affordable for sellers.</em></h1>
        <p className="header-desc">Buyers always post for free. Sellers and agents pay a simple flat fee to list their property and connect with motivated, pre-qualified buyers. No hidden costs. No commissions.</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 3rem' }}>
        <div className="audience-tabs">
          <button className="aud-tab active" id="tab-sellers" onClick={() => {
            if (typeof window !== 'undefined') {
              document.getElementById('seller-plans').style.display = 'block'
              document.getElementById('buyer-plans').style.display = 'none'
              document.getElementById('compare-table').style.display = 'block'
              document.getElementById('tab-sellers').className = 'aud-tab active'
              document.getElementById('tab-buyers').className = 'aud-tab'
            }
          }}>For sellers</button>
          <button className="aud-tab" id="tab-buyers" onClick={() => {
            if (typeof window !== 'undefined') {
              document.getElementById('seller-plans').style.display = 'none'
              document.getElementById('buyer-plans').style.display = 'block'
              document.getElementById('compare-table').style.display = 'none'
              document.getElementById('tab-sellers').className = 'aud-tab'
              document.getElementById('tab-buyers').className = 'aud-tab active'
            }
          }}>For buyers</button>
        </div>
        <div className="toggle-wrap">
          <span className="toggle-label active" id="label-monthly">Monthly</span>
          <label className="toggle">
            <input type="checkbox" id="annualToggle" onChange={() => {
              if (typeof window !== 'undefined') {
                const isAnnual = document.getElementById('annualToggle').checked
                document.getElementById('label-monthly').className = 'toggle-label' + (isAnnual ? '' : ' active')
                document.getElementById('label-annual').className = 'toggle-label' + (isAnnual ? ' active' : '')
                document.querySelectorAll('.price-val').forEach(el => {
                  el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly
                })
                document.querySelectorAll('.plan-original').forEach(el => {
                  el.className = 'plan-original' + (isAnnual ? ' show' : '')
                })
                const agentPeriod = document.getElementById('agent-period')
                if (agentPeriod) agentPeriod.textContent = isAnnual ? 'per month · billed annually' : 'per month'
              }
            }} />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label" id="label-annual">Annual</span>
          <span className="save-badge">Save 20%</span>
        </div>
      </div>

      {/* SELLER PLANS */}
      <div className="pricing-section" id="seller-plans">
        <div className="pricing-grid">
          <div className="plan">
            <span className="plan-badge">Starter</span>
            <h2 className="plan-name">Basic listing</h2>
            <p className="plan-tagline">List one property and connect with ready buyers in your suburb.</p>
            <div className="plan-price-wrap">
              <div className="plan-price"><sup>$</sup><span className="price-val" data-monthly="49" data-annual="39">49</span></div>
              <div className="plan-period">one-time · 60 day listing</div>
              <div className="plan-original">Was $49</div>
            </div>
            <ul className="plan-features">
              <li><span className="feat-check">✦</span>1 property listing for 60 days</li>
              <li><span className="feat-check">✦</span>Visible to all buyers in the marketplace</li>
              <li><span className="feat-check">✦</span>Up to 8 photos</li>
              <li><span className="feat-check">✦</span>Direct buyer contact via email</li>
              <li><span className="feat-check">✦</span>Suburb price guide included</li>
              <li><span className="feat-x">—</span>Featured placement in search</li>
              <li><span className="feat-x">—</span>Buyer match email alerts</li>
              <li><span className="feat-x">—</span>Verified seller badge</li>
            </ul>
            <a href="mailto:hello@propmatch.com.au?subject=Basic Listing Enquiry" className="plan-cta">Get started</a>
          </div>

          <div className="plan featured">
            <span className="plan-badge">Most popular</span>
            <h2 className="plan-name">Featured listing</h2>
            <p className="plan-tagline">Stand out and get matched with buyers actively looking for your property type.</p>
            <div className="plan-price-wrap">
              <div className="plan-price"><sup>$</sup><span className="price-val" data-monthly="99" data-annual="79">99</span></div>
              <div className="plan-period">one-time · 60 day listing</div>
              <div className="plan-original">Was $99</div>
            </div>
            <ul className="plan-features">
              <li><span className="feat-check">✦</span>1 property listing for 60 days</li>
              <li><span className="feat-check">✦</span>Pinned at top of marketplace for 30 days</li>
              <li><span className="feat-check">✦</span>Up to 20 photos + floor plan upload</li>
              <li><span className="feat-check">✦</span>AI-matched to relevant buyer requirements</li>
              <li><span className="feat-check">✦</span>Email alert sent to matching buyers</li>
              <li><span className="feat-check">✦</span>Verified seller badge displayed</li>
              <li><span className="feat-check">✦</span>Priority support from our team</li>
              <li><span className="feat-check">✦</span>50% off relist if not sold in 60 days</li>
            </ul>
            <a href="mailto:hello@propmatch.com.au?subject=Featured Listing Enquiry" className="plan-cta">Get started</a>
          </div>

          <div className="plan">
            <span className="plan-badge">For agencies</span>
            <h2 className="plan-name">Agent bundle</h2>
            <p className="plan-tagline">For real estate agencies managing multiple properties with ongoing access.</p>
            <div className="plan-price-wrap">
              <div className="plan-price"><sup>$</sup><span className="price-val" data-monthly="199" data-annual="159">199</span></div>
              <div className="plan-period" id="agent-period">per month</div>
              <div className="plan-original">Was $199/mo</div>
            </div>
            <ul className="plan-features">
              <li><span className="feat-check">✦</span>Up to 10 active listings at a time</li>
              <li><span className="feat-check">✦</span>All listings featured automatically</li>
              <li><span className="feat-check">✦</span>Verified licensed agent badge</li>
              <li><span className="feat-check">✦</span>Instant alerts for new matching requirements</li>
              <li><span className="feat-check">✦</span>Unlimited photos per listing</li>
              <li><span className="feat-check">✦</span>Monthly performance report</li>
              <li><span className="feat-check">✦</span>Dedicated account manager</li>
              <li><span className="feat-check">✦</span>Cancel anytime</li>
            </ul>
            <a href="mailto:hello@propmatch.com.au?subject=Agent Bundle Enquiry" className="plan-cta">Contact us</a>
          </div>
        </div>
      </div>

      {/* BUYER PLANS */}
      <div className="pricing-section" id="buyer-plans" style={{ display: 'none' }}>
        <div className="pricing-grid-2">
          <div className="plan">
            <span className="plan-badge">Always free</span>
            <h2 className="plan-name">Standard</h2>
            <p className="plan-tagline">Post your requirement and let sellers come to you — completely free, forever.</p>
            <div className="plan-price-wrap">
              <div className="plan-price"><sup>$</sup>0</div>
              <div className="plan-period">always free</div>
            </div>
            <ul className="plan-features">
              <li><span className="feat-check">✦</span>Post unlimited buyer requirements</li>
              <li><span className="feat-check">✦</span>Receive offers from sellers & agents</li>
              <li><span className="feat-check">✦</span>Suburb price guide for any area</li>
              <li><span className="feat-check">✦</span>Proximity preferences (schools, trains, shops)</li>
              <li><span className="feat-check">✦</span>Browse all seller listings</li>
              <li><span className="feat-x">—</span>Priority placement in seller browse</li>
              <li><span className="feat-x">—</span>Email blast to matching agents</li>
            </ul>
            <Link href="/post" className="plan-cta">Post a requirement</Link>
          </div>
          <div className="plan featured">
            <span className="plan-badge">Get noticed faster</span>
            <h2 className="plan-name">Boosted requirement</h2>
            <p className="plan-tagline">Rise to the top of the seller browse and get your requirement in front of the right agents instantly.</p>
            <div className="plan-price-wrap">
              <div className="plan-price"><sup>$</sup>29</div>
              <div className="plan-period">per 30 days</div>
            </div>
            <ul className="plan-features">
              <li><span className="feat-check">✦</span>Everything in Standard, plus:</li>
              <li><span className="feat-check">✦</span>Pinned at top of seller browse</li>
              <li><span className="feat-check">✦</span>Email blast to all agents in your suburb</li>
              <li><span className="feat-check">✦</span>Highlighted "Priority buyer" badge</li>
              <li><span className="feat-check">✦</span>Weekly digest of new matching listings</li>
              <li><span className="feat-check">✦</span>Renew or cancel anytime</li>
            </ul>
            <a href="mailto:hello@propmatch.com.au?subject=Boost Enquiry" className="plan-cta">Boost my requirement</a>
          </div>
        </div>
      </div>

      {/* COMPARE TABLE */}
      <div className="compare-section" id="compare-table">
        <h2 className="section-title">Compare seller <em>plans</em></h2>
        <table className="compare">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Feature</th>
              <th>Basic <br /><span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 300 }}>$49</span></th>
              <th style={{ color: 'var(--gold)' }}>Featured <br /><span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 300 }}>$99</span></th>
              <th>Agent <br /><span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 300 }}>$199/mo</span></th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={4} className="compare-section-row">Listing</td></tr>
            <tr><td>Active listings</td><td>1</td><td>1</td><td>Up to 10</td></tr>
            <tr><td>Listing duration</td><td>60 days</td><td>60 days</td><td>Ongoing</td></tr>
            <tr><td>Photos per listing</td><td>8</td><td>20</td><td>Unlimited</td></tr>
            <tr><td>Floor plan upload</td><td><span className="compare-dash">—</span></td><td><span className="compare-check">✓</span></td><td><span className="compare-check">✓</span></td></tr>
            <tr><td colSpan={4} className="compare-section-row">Visibility</td></tr>
            <tr><td>Marketplace listing</td><td><span className="compare-check">✓</span></td><td><span className="compare-check">✓</span></td><td><span className="compare-check">✓</span></td></tr>
            <tr><td>Featured / pinned placement</td><td><span className="compare-dash">—</span></td><td><span className="compare-check">✓</span></td><td><span className="compare-check">✓</span></td></tr>
            <tr><td>Buyer match email alerts</td><td><span className="compare-dash">—</span></td><td><span className="compare-check">✓</span></td><td><span className="compare-check">✓</span></td></tr>
            <tr><td>New requirement alerts</td><td><span className="compare-dash">—</span></td><td><span className="compare-dash">—</span></td><td><span className="compare-check">✓</span></td></tr>
            <tr><td colSpan={4} className="compare-section-row">Trust & support</td></tr>
            <tr><td>Verified seller badge</td><td><span className="compare-dash">—</span></td><td><span className="compare-check">✓</span></td><td><span className="compare-check">✓</span></td></tr>
            <tr><td>Licensed agent badge</td><td><span className="compare-dash">—</span></td><td><span className="compare-dash">—</span></td><td><span className="compare-check">✓</span></td></tr>
            <tr><td>Priority support</td><td><span className="compare-dash">—</span></td><td><span className="compare-check">✓</span></td><td><span className="compare-check">✓</span></td></tr>
            <tr><td>Dedicated account manager</td><td><span className="compare-dash">—</span></td><td><span className="compare-dash">—</span></td><td><span className="compare-check">✓</span></td></tr>
            <tr><td>Monthly performance report</td><td><span className="compare-dash">—</span></td><td><span className="compare-dash">—</span></td><td><span className="compare-check">✓</span></td></tr>
            <tr><td colSpan={4} className="compare-section-row">vs. competitors</td></tr>
            <tr><td>realestate.com.au standard</td><td colSpan={3} style={{ textAlign: 'center', color: '#c0392b' }}>$200 – $4,000 per listing</td></tr>
            <tr><td>Domain standard</td><td colSpan={3} style={{ textAlign: 'center', color: '#c0392b' }}>$150 – $3,500 per listing</td></tr>
            <tr><td>PropMatch</td><td colSpan={3} style={{ textAlign: 'center', color: 'var(--green)', fontWeight: 500 }}>$49 – $99 · up to 80x cheaper</td></tr>
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <h2 className="section-title">Common <em>questions</em></h2>
        {[
          ['Is it really free for buyers?', 'Yes — posting a buyer requirement is completely free and always will be. We charge sellers to list their properties, not buyers to find them.'],
          ['How is PropMatch different from Domain or REA?', 'On Domain and REA, sellers list and buyers search. On PropMatch it\'s reversed — buyers post exactly what they want and sellers come to them. You also reach buyers who have pre-stated their suburb, budget and requirements. Plus we\'re dramatically cheaper — REA charges up to $4,000 per listing. We charge $49–$99.'],
          ['Can I list an off-market property?', 'Absolutely. Many sellers prefer PropMatch precisely because they can list quietly without a full public campaign. Connect directly with motivated buyers without the cost of a traditional marketing campaign.'],
          ['What happens after I list?', 'Your listing goes live in the marketplace immediately. Featured listings are pinned at the top and trigger an email to matching buyers in your suburb. Buyers contact you directly — no middlemen or commission taken.'],
          ['Do I need a real estate licence to list?', 'Private sellers (homeowners) can list without a licence. Licensed agents should use the Agent Bundle plan which includes a verified agent badge. We are building licence verification against state databases for 2025.'],
          ['What if my property doesn\'t sell?', 'We don\'t offer refunds as we charge for the connection service, not a guaranteed sale. Featured listing customers receive 50% off a relist if the property hasn\'t sold after 60 days. Agent Bundle subscribers can cancel anytime.'],
          ['Who reviews my listing before it goes live?', 'Our team — Melina & Mikayla — personally reviews every listing to ensure it\'s genuine and complete. We also manually match new listings to relevant buyer requirements and reach out where appropriate.'],
        ].map(([q, a], i) => (
          <details className="faq-item" key={i}>
            <summary className="faq-q">{q}<span className="faq-icon">+</span></summary>
            <div className="faq-a">{a}</div>
          </details>
        ))}
      </div>

      {/* CTA */}
      <section className="cta-banner">
        <h2 className="cta-title">Ready to find your<br /><em>perfect match?</em></h2>
        <p className="cta-sub">Buyers post free. Sellers reach motivated buyers from $49.<br />No lock-ins. No commissions. No surprises.</p>
        <div className="cta-actions">
          <Link href="/post" className="cta-btn-gold">Post a requirement — free</Link>
          <a href="mailto:hello@propmatch.com.au" className="cta-btn-ghost">Talk to our team</a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">Prop<span>Match</span></div>
        <div>© 2025 PropMatch · Transparent pricing, always</div>
      </footer>
    </>
  )
}