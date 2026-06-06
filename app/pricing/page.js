'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/NavBar'

export default function Pricing() {
  const router = useRouter()
  const [loading, setLoading] = useState(null)

  async function handleCheckout(plan) {
    setLoading(plan)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(null)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
          --gold: #b8924a; --gold-pale: #f5ecd8; --border: #e8e0d0;
          --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
        }
        body { background: var(--cream); color: var(--ink); font-family: var(--sans); }
        .pricing-hero { background: var(--ink); padding: 8rem 2rem 4rem; text-align: center; }
        .pricing-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .pricing-title { font-family: var(--serif); font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300; color: var(--cream); line-height: 1.1; margin-bottom: 1rem; }
        .pricing-subtitle { font-family: var(--sans); font-size: 15px; color: rgba(250,248,243,0.55); font-weight: 300; line-height: 1.7; max-width: 520px; margin: 0 auto; }
        .pricing-main { max-width: 1000px; margin: 0 auto; padding: 4rem 2rem; }
        .pricing-mission { background: var(--gold-pale); border: 1px solid #e8d0a0; border-radius: 8px; padding: 1.5rem 2rem; margin-bottom: 3rem; display: flex; gap: 1rem; align-items: flex-start; }
        .pricing-mission-icon { font-size: 1.5rem; flex-shrink: 0; }
        .pricing-mission-text { font-family: var(--sans); font-size: 14px; color: #7a5c00; line-height: 1.7; font-weight: 300; }
        .pricing-mission-text strong { font-weight: 500; color: #5a4000; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 4rem; }
        .pricing-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 8px; padding: 2rem; position: relative; }
        .pricing-card.featured { border-color: var(--gold); box-shadow: 0 0 0 1px var(--gold); }
        .pricing-card-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--gold); color: var(--ink); font-family: var(--sans); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 14px; border-radius: 20px; white-space: nowrap; }
        .pricing-card-label { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; }
        .pricing-card-title { font-family: var(--serif); font-size: 1.4rem; font-weight: 400; color: var(--ink); margin-bottom: 0.5rem; }
        .pricing-price { font-family: var(--serif); font-size: 3rem; font-weight: 300; color: var(--ink); line-height: 1; margin-bottom: 0.25rem; }
        .pricing-price-note { font-family: var(--sans); font-size: 12px; color: #bbb; margin-bottom: 1.5rem; }
        .pricing-features { list-style: none; margin-bottom: 2rem; }
        .pricing-features li { font-family: var(--sans); font-size: 13px; color: var(--ink-light); font-weight: 300; padding: 0.5rem 0; border-bottom: 1px solid var(--border); display: flex; gap: 8px; align-items: flex-start; line-height: 1.5; }
        .pricing-features li:last-child { border-bottom: none; }
        .pricing-features .check { color: var(--gold); flex-shrink: 0; font-size: 12px; margin-top: 1px; }
        .pricing-cta { width: 100%; padding: 12px; font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
        .pricing-cta-primary { background: var(--ink); color: var(--cream); border: 1px solid var(--ink); }
        .pricing-cta-primary:hover { background: var(--gold); border-color: var(--gold); }
        .pricing-cta-secondary { background: transparent; color: var(--ink); border: 1px solid var(--border); }
        .pricing-cta-secondary:hover { border-color: var(--ink); }
        .pricing-cta:disabled { opacity: 0.6; cursor: not-allowed; }
        .pricing-section-title { font-family: var(--serif); font-size: 1.8rem; font-weight: 300; color: var(--ink); margin-bottom: 0.5rem; }
        .pricing-section-sub { font-family: var(--sans); font-size: 14px; color: var(--ink-light); font-weight: 300; margin-bottom: 2rem; }
        .compare-table { width: 100%; border-collapse: collapse; margin-bottom: 4rem; }
        .compare-table th { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #bbb; padding: 0.75rem 1rem; text-align: left; border-bottom: 2px solid var(--border); }
        .compare-table td { font-family: var(--sans); font-size: 13px; color: var(--ink-light); font-weight: 300; padding: 0.85rem 1rem; border-bottom: 1px solid var(--border); line-height: 1.5; vertical-align: top; }
        .compare-table tr:last-child td { border-bottom: none; }
        .compare-table td:first-child { font-weight: 400; color: var(--ink); }

        /* REFUND POLICY */
        .refund-box { background: var(--warm-white); border: 1px solid var(--border); border-radius: 8px; padding: 2rem; margin-bottom: 3rem; }
        .refund-title { font-family: var(--serif); font-size: 1.3rem; font-weight: 400; color: var(--ink); margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border); }
        .refund-item { display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
        .refund-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .refund-icon { font-size: 1.2rem; flex-shrink: 0; margin-top: 1px; }
        .refund-item-title { font-family: var(--sans); font-size: 13px; font-weight: 500; color: var(--ink); margin-bottom: 3px; }
        .refund-item-text { font-family: var(--sans); font-size: 13px; color: var(--ink-light); font-weight: 300; line-height: 1.6; }

        .faq-section { margin-bottom: 4rem; }
        .faq-item { border-bottom: 1px solid var(--border); padding: 1.25rem 0; }
        .faq-q { font-family: var(--sans); font-size: 14px; font-weight: 500; color: var(--ink); margin-bottom: 0.5rem; }
        .faq-a { font-family: var(--sans); font-size: 13px; color: var(--ink-light); font-weight: 300; line-height: 1.7; }
        .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; flex-wrap: wrap; gap: 1rem; }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }
        @media (max-width: 768px) {
          .pricing-main { padding: 2rem 1.25rem; }
          .compare-table { font-size: 12px; }
          .compare-table td, .compare-table th { padding: 0.6rem 0.5rem; }
          .footer { padding: 1.5rem; flex-direction: column; text-align: center; }
        }
      `}</style>

      <NavBar />

      {/* HERO */}
      <div className="pricing-hero">
        <p className="pricing-eyebrow">Transparent pricing</p>
        <h1 className="pricing-title">Fair for buyers.<br />Affordable for sellers.</h1>
        <p className="pricing-subtitle">PropOffer was built to do right by everyone in the property market. Our pricing reflects that.</p>
      </div>

      <div className="pricing-main">

        {/* MISSION STATEMENT */}
        <div className="pricing-mission">
          <span className="pricing-mission-icon">💛</span>
          <p className="pricing-mission-text">
            <strong>PropOffer is not built to maximise revenue — it's built to maximise fairness.</strong> Buyers always post free. Sellers pay a small flat fee — not a percentage of their sale. No commissions. No hidden costs. No pressure. If we do right by you, we believe the rest will follow.
          </p>
        </div>

        {/* PRICING CARDS */}
        <div className="pricing-grid">

          {/* BUYER — FREE */}
          <div className="pricing-card">
            <p className="pricing-card-label">For buyers</p>
            <h2 className="pricing-card-title">Post a requirement</h2>
            <div className="pricing-price">$0</div>
            <p className="pricing-price-note">Free forever — no credit card needed</p>
            <ul className="pricing-features">
              <li><span className="check">✓</span> Post exactly what you're looking for</li>
              <li><span className="check">✓</span> Sellers contact you directly</li>
              <li><span className="check">✓</span> No auctions, no pressure</li>
              <li><span className="check">✓</span> Edit or remove anytime</li>
              <li><span className="check">✓</span> Access service provider directory</li>
              <li><span className="check">✓</span> Always free — no exceptions</li>
            </ul>
            <Link href="/post" style={{ display: 'block' }}>
              <button className="pricing-cta pricing-cta-secondary" style={{ width: '100%' }}>
                Post a requirement →
              </button>
            </Link>
          </div>

          {/* SELLER BASIC */}
          <div className="pricing-card">
            <p className="pricing-card-label">For sellers</p>
            <h2 className="pricing-card-title">Basic listing</h2>
            <div className="pricing-price">$49</div>
            <p className="pricing-price-note">One-time · 60-day listing</p>
            <ul className="pricing-features">
              <li><span className="check">✓</span> Listed in the marketplace</li>
              <li><span className="check">✓</span> Up to 5 photos</li>
              <li><span className="check">✓</span> Direct contact from buyers</li>
              <li><span className="check">✓</span> Ownership document upload</li>
              <li><span className="check">✓</span> Reviewed within 24 hours</li>
              <li><span className="check">✓</span> No commissions ever</li>
            </ul>
            <button
              className="pricing-cta pricing-cta-primary"
              onClick={() => handleCheckout('basic')}
              disabled={loading === 'basic'}
            >
              {loading === 'basic' ? 'Redirecting…' : 'List my property →'}
            </button>
          </div>

          {/* SELLER FEATURED */}
          <div className="pricing-card featured">
            <div className="pricing-card-badge">Most popular</div>
            <p className="pricing-card-label">For sellers</p>
            <h2 className="pricing-card-title">Featured listing</h2>
            <div className="pricing-price">$99</div>
            <p className="pricing-price-note">One-time · 60-day listing</p>
            <ul className="pricing-features">
              <li><span className="check">✓</span> Everything in Basic</li>
              <li><span className="check">✓</span> Featured placement at top</li>
              <li><span className="check">✓</span> ⭐ Featured badge</li>
              <li><span className="check">✓</span> Priority review (same day)</li>
              <li><span className="check">✓</span> Highlighted in search results</li>
              <li><span className="check">✓</span> 2× more buyer visibility</li>
            </ul>
            <button
              className="pricing-cta pricing-cta-primary"
              onClick={() => handleCheckout('featured')}
              disabled={loading === 'featured'}
            >
              {loading === 'featured' ? 'Redirecting…' : 'Get featured →'}
            </button>
          </div>

        </div>

        {/* COMPARISON */}
        <h2 className="pricing-section-title" style={{ marginBottom: '0.5rem' }}>How we compare</h2>
        <p className="pricing-section-sub">Traditional real estate marketing costs thousands. PropOffer costs a flat fee.</p>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Upfront cost</th>
              <th>Commission</th>
              <th>Board / public campaign</th>
              <th>Buyer contact</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: '#fffdf7' }}>
              <td>PropOffer <span style={{ color: '#b8924a', fontSize: '11px' }}>★</span></td>
              <td>$49 – $99</td>
              <td>$0 — none</td>
              <td>No board, private listing</td>
              <td>Direct from buyers</td>
            </tr>
            <tr>
              <td>Traditional agent *</td>
              <td>$3,000 – $8,000+</td>
              <td>1.5% – 3% of sale price</td>
              <td>Board + public campaign</td>
              <td>Via agent only</td>
            </tr>
            <tr>
              <td>realestate.com.au *</td>
              <td>$1,500 – $5,000+</td>
              <td>Via agent</td>
              <td>Full public listing</td>
              <td>Via agent</td>
            </tr>
            <tr>
              <td>Domain *</td>
              <td>$800 – $3,000+</td>
              <td>Via agent</td>
              <td>Full public listing</td>
              <td>Via agent</td>
            </tr>
          </tbody>
        </table>

        {/* COMPETITOR DISCLAIMER */}
        <div style={{ background: '#f8f7f4', border: '1px solid #e8e0d0', borderRadius: '6px', padding: '12px 16px', marginTop: '-3rem', marginBottom: '3rem', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '14px', flexShrink: 0 }}>ℹ️</span>
          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: '12px', color: '#aaa', lineHeight: 1.7, margin: 0, fontWeight: '300' }}>
            * Competitor pricing figures are estimates based on publicly available information as of 2026 and may vary by agent, campaign type, property value, and location. PropOffer is not affiliated with, endorsed by, or connected to realestate.com.au, Domain, or any real estate agency listed above. All trademarks belong to their respective owners.
          </p>
        </div>

        {/* REFUND POLICY */}
        <div className="refund-box">
          <h2 className="refund-title">Refund policy</h2>
          <div className="refund-item">
            <span className="refund-icon">✅</span>
            <div>
              <div className="refund-item-title">Listing rejected — full refund</div>
              <div className="refund-item-text">If your listing is reviewed and rejected by our team, you will receive a full refund within 5 business days. No questions asked.</div>
            </div>
          </div>
          <div className="refund-item">
            <span className="refund-icon">⚠️</span>
            <div>
              <div className="refund-item-title">Listing approved and live — no refund</div>
              <div className="refund-item-text">Once your listing has been approved and is live on the marketplace, the listing fee is non-refundable. This is because your listing has already been seen by buyers.</div>
            </div>
          </div>
          <div className="refund-item">
            <span className="refund-icon">🏦</span>
            <div>
              <div className="refund-item-title">Australian Consumer Law</div>
              <div className="refund-item-text">Nothing in this policy limits your rights under the Australian Consumer Law. If you believe you have a valid consumer remedy, please contact us at <a href="mailto:hello@propoffer.com.au" style={{ color: '#b8924a' }}>hello@propoffer.com.au</a>.</div>
            </div>
          </div>
          <div className="refund-item">
            <span className="refund-icon">📧</span>
            <div>
              <div className="refund-item-title">How to request a refund</div>
              <div className="refund-item-text">Email <a href="mailto:hello@propoffer.com.au" style={{ color: '#b8924a' }}>hello@propoffer.com.au</a> with your listing details and reason. We'll respond within 2 business days.</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h2 className="pricing-section-title" style={{ marginBottom: '1.5rem' }}>Frequently asked questions</h2>

          {[
            {
              q: 'Is PropOffer really free for buyers?',
              a: 'Yes, always. Buyers post requirements, browse listings, and contact sellers completely free. There is no trial period or hidden fee. PropOffer is free for buyers permanently — that\'s a core part of how the platform works.'
            },
            {
              q: 'Do I need an agent to sell on PropOffer?',
              a: 'No. PropOffer connects you directly with buyers. No agent required, no commission payable. You handle negotiations and settlement directly — typically with the help of a conveyancer, which we can connect you with through our services directory.'
            },
            {
              q: 'How long does my listing stay live?',
              a: 'Listings are live for 60 days from the date of approval. If your property hasn\'t sold, you can relist at the same price. We\'re working on automatic renewal options.'
            },
            {
              q: 'What happens if my listing is rejected?',
              a: 'Our team reviews every listing within 24 hours (same day for Featured). If we reject your listing — for example due to incomplete information or a concern about ownership — we will email you explaining why and issue a full refund.'
            },
            {
              q: 'Can I edit my listing after it\'s live?',
              a: 'Not directly yet — but email hello@propoffer.com.au and we\'ll update it for you within a few hours. We\'re building self-serve editing into the account page.'
            },
            {
              q: 'What does "no commission" actually mean?',
              a: 'When a buyer contacts you through PropOffer and you sell your property, PropOffer takes nothing from the sale. The $49 or $99 listing fee is the total you pay us. Everything else stays with you.'
            },
          ].map((item, i) => (
            <div key={i} className="faq-item">
              <p className="faq-q">{item.q}</p>
              <p className="faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div style={{ background: '#1a1714', borderRadius: '8px', padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.8rem', fontWeight: '300', color: '#faf8f3', marginBottom: '0.75rem' }}>
            Ready to find your property<br /><em style={{ fontStyle: 'italic', color: '#b8924a' }}>your way?</em>
          </h2>
          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: 'rgba(250,248,243,0.5)', fontWeight: '300', marginBottom: '2rem' }}>
            Join buyers and sellers across Australia who are doing property differently.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/post" style={{ padding: '12px 28px', background: '#b8924a', color: '#1a1714', borderRadius: '4px', fontFamily: 'system-ui,sans-serif', fontSize: '13px', fontWeight: '600', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Post free as a buyer
            </Link>
            <Link href="/marketplace" style={{ padding: '12px 28px', background: 'transparent', color: '#faf8f3', border: '1px solid rgba(250,248,243,0.3)', borderRadius: '4px', fontFamily: 'system-ui,sans-serif', fontSize: '13px', fontWeight: '400', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Browse marketplace
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-logo">Prop<span>Offer</span></div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[['/', 'Home'], ['/marketplace', 'Marketplace'], ['/services', 'Services'], ['/about', 'About'], ['/terms', 'Terms'], ['/privacy', 'Privacy']].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: '#bbb', textDecoration: 'none', fontFamily: 'system-ui,sans-serif', fontSize: '12px' }}>{label}</Link>
          ))}
        </div>
        <div>© 2026 PropOffer</div>
      </footer>
    </>
  )
}