'use client'

import Link from 'next/link'
import { useState, useCallback } from 'react'
import NavBar from '@/components/NavBar'

const fmt = (n) => '$' + Math.round(n).toLocaleString('en-AU')

export default function Calculator() {
  const [price, setPrice] = useState(850000)
  const [tier, setTier] = useState('basic')
  const [state, setState] = useState('VIC')
  const [hardship, setHardship] = useState(false)

  const agentRates = { NSW: 0.0235, VIC: 0.0235, QLD: 0.028, WA: 0.0275, SA: 0.029, TAS: 0.0325, NT: 0.03, ACT: 0.0223 }
  const stateNames = { NSW: 'New South Wales', VIC: 'Victoria', QLD: 'Queensland', WA: 'Western Australia', SA: 'South Australia', TAS: 'Tasmania', NT: 'Northern Territory', ACT: 'ACT' }

  const agentRate = agentRates[state]
  const agentFee = price * agentRate
  const marketingFee = price < 600000 ? 3000 : price < 1000000 ? 5000 : 8000
  const agentTotal = agentFee + marketingFee

  const propofferFee = hardship ? 0 : tier === 'basic' ? 99 : 199
  const propofferDeferred = hardship ? (tier === 'basic' ? 99 : 199) : 0

  const saving = agentTotal - propofferFee
  const savingPct = ((saving / agentTotal) * 100).toFixed(0)

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
          --green: #2d6a4f; --green-pale: #f0faf4; --green-border: #b7e4c7;
        }
        body { background: var(--cream); color: var(--ink); font-family: var(--sans); }
        .page { max-width: 900px; margin: 0 auto; padding: 9rem 3rem 6rem; }
        .eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem; }
        .eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }
        .page-title { font-family: var(--serif); font-size: clamp(2.2rem, 4vw, 3.8rem); font-weight: 300; line-height: 1.05; margin-bottom: 1rem; }
        .page-title em { font-style: italic; color: var(--gold); }
        .page-sub { font-size: 15px; font-weight: 300; color: var(--ink-light); line-height: 1.7; max-width: 560px; margin-bottom: 3rem; }
        .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; }
        .inputs { background: var(--warm-white); border: 1px solid var(--border); padding: 2rem; }
        .inputs-title { font-family: var(--serif); font-size: 1.3rem; font-weight: 400; color: var(--ink); margin-bottom: 1.5rem; }
        .field { margin-bottom: 1.25rem; }
        .field label { display: block; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-light); margin-bottom: 6px; }
        .field input[type=range] { width: 100%; margin-bottom: 4px; accent-color: var(--gold); }
        .field-val { font-family: var(--serif); font-size: 1.6rem; font-weight: 300; color: var(--ink); }
        .field select { width: 100%; font-family: var(--sans); font-size: 14px; color: var(--ink); background: var(--cream); border: 1px solid var(--border); padding: 9px 12px; outline: none; border-radius: 2px; transition: border-color 0.15s; }
        .field select:focus { border-color: var(--gold); }
        .tier-row { display: flex; gap: 8px; }
        .tier-btn { flex: 1; padding: 10px 8px; border: 1px solid var(--border); background: var(--cream); font-family: var(--sans); font-size: 13px; cursor: pointer; border-radius: 2px; transition: all 0.15s; text-align: center; color: var(--ink-light); }
        .tier-btn.active { background: var(--ink); color: var(--cream); border-color: var(--ink); }
        .hardship-toggle { display: flex; gap: 10px; align-items: flex-start; cursor: pointer; padding: 1rem; background: var(--gold-pale); border: 1px solid var(--border); margin-top: 1.25rem; border-radius: 2px; }
        .hardship-check { width: 20px; height: 20px; border: 2px solid var(--gold); border-radius: 3px; background: var(--gold); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .hardship-check.off { background: var(--cream); }
        .hardship-label { font-size: 13px; color: var(--ink-light); line-height: 1.55; font-weight: 300; }
        .hardship-label strong { color: var(--ink); font-weight: 500; }
        .results { display: flex; flex-direction: column; gap: 1rem; }
        .result-hero { background: var(--ink); padding: 2rem; text-align: center; }
        .result-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; }
        .result-saving { font-family: var(--serif); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; color: var(--cream); line-height: 1; margin-bottom: 0.25rem; }
        .result-saving em { color: var(--gold); font-style: normal; }
        .result-sub { font-size: 13px; color: rgba(250,248,243,0.5); }
        .result-breakdown { background: var(--warm-white); border: 1px solid var(--border); }
        .result-row { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); }
        .result-row:last-child { border-bottom: none; }
        .result-label { font-size: 13px; color: var(--ink-light); }
        .result-label small { display: block; font-size: 11px; color: #bbb; margin-top: 2px; }
        .result-amount { font-family: var(--serif); font-size: 1.2rem; font-weight: 400; }
        .amount-bad { color: #c0392b; }
        .amount-good { color: var(--green); }
        .amount-zero { color: var(--gold); }
        .result-note { font-size: 12px; color: var(--ink-light); line-height: 1.6; padding: 1rem 1.25rem; background: var(--gold-pale); border: 1px solid var(--border); font-style: italic; }
        .cta-row { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem; }
        .btn-primary { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; background: var(--gold); color: #fff; padding: 13px 28px; border-radius: 2px; border: 1px solid var(--gold); cursor: pointer; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-primary:hover { background: var(--ink); border-color: var(--ink); }
        .btn-ghost { font-family: var(--sans); font-size: 13px; color: var(--ink-light); text-decoration: none; display: flex; align-items: center; gap: 6px; }
        .btn-ghost::after { content: '→'; }
        .disclaimer { font-size: 12px; color: #bbb; line-height: 1.6; margin-top: 2.5rem; font-style: italic; }
        .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; flex-wrap: wrap; gap: 1rem; }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }
        @media (max-width: 700px) {
          .page { padding: 6rem 1.25rem 4rem; }
          .calc-grid { grid-template-columns: 1fr; }
          .footer { padding: 1.5rem 1.25rem; flex-direction: column; text-align: center; }
        }
      `}</style>

      <NavBar />

      <div className="page">
        <div className="eyebrow">See the numbers</div>
        <h1 className="page-title">How much could you <em>save</em> by selling on PropOffer?</h1>
        <p className="page-sub">Adjust your property value and state below to see a real comparison between traditional agent fees and what you'd pay on PropOffer.</p>

        <div className="calc-grid">

          {/* INPUTS */}
          <div className="inputs">
            <div className="inputs-title">Your property</div>

            <div className="field">
              <label>Estimated sale price</label>
              <div className="field-val">{fmt(price)}</div>
              <input
                type="range"
                min="200000"
                max="5000000"
                step="25000"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#bbb', fontFamily: 'var(--sans)' }}>
                <span>$200K</span><span>$5M</span>
              </div>
            </div>

            <div className="field">
              <label>State</label>
              <select value={state} onChange={e => setState(e.target.value)}>
                {Object.entries(stateNames).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>

            <div className="field">
              <label>PropOffer listing tier</label>
              <div className="tier-row">
                <button className={`tier-btn${tier === 'basic' ? ' active' : ''}`} onClick={() => setTier('basic')}>
                  Basic — $99
                </button>
                <button className={`tier-btn${tier === 'featured' ? ' active' : ''}`} onClick={() => setTier('featured')}>
                  Featured — $199
                </button>
              </div>
            </div>

            <div
              className="hardship-toggle"
              onClick={() => setHardship(h => !h)}
            >
              <div className={`hardship-check${hardship ? '' : ' off'}`}>
                {hardship && <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>✓</span>}
              </div>
              <div className="hardship-label">
                <strong>Apply hardship concession</strong><br />
                Selling due to financial difficulty? Under our concession, listing fees are deferred to settlement — nothing paid upfront.
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="results">
            <div className="result-hero">
              <div className="result-eyebrow">You could save</div>
              <div className="result-saving"><em>{fmt(saving)}</em></div>
              <div className="result-sub">That's {savingPct}% less than a traditional agent</div>
            </div>

            <div className="result-breakdown">
              <div className="result-row">
                <div className="result-label">
                  Traditional agent commission
                  <small>{(agentRate * 100).toFixed(2)}% median rate in {state}</small>
                </div>
                <div className="result-amount amount-bad">{fmt(agentFee)}</div>
              </div>
              <div className="result-row">
                <div className="result-label">
                  Typical marketing package
                  <small>Photography, copywriting, portal listings</small>
                </div>
                <div className="result-amount amount-bad">{fmt(marketingFee)}</div>
              </div>
              <div className="result-row" style={{ background: 'var(--gold-pale)' }}>
                <div className="result-label">
                  <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Total traditional cost</strong>
                </div>
                <div className="result-amount amount-bad"><strong>{fmt(agentTotal)}</strong></div>
              </div>
              <div className="result-row">
                <div className="result-label">
                  PropOffer listing fee
                  <small>{hardship ? 'Hardship concession — deferred to settlement' : tier === 'basic' ? 'Basic listing — paid upfront' : 'Featured listing — paid upfront'}</small>
                </div>
                <div className="result-amount" style={{ color: hardship ? 'var(--gold)' : 'var(--green)' }}>
                  {hardship ? `${fmt(propofferDeferred)} at settlement` : fmt(propofferFee)}
                </div>
              </div>
              <div className="result-row" style={{ background: 'var(--green-pale)' }}>
                <div className="result-label">
                  <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Your saving</strong>
                </div>
                <div className="result-amount amount-good"><strong>{fmt(saving)}</strong></div>
              </div>
            </div>

            <div className="result-note">
              Agent commission rates sourced from the 2026 Real Estate Agent Commission Rates State of the States Report. Marketing package estimates are typical — actual costs vary by agent and campaign. PropOffer fees do not include conveyancing, which is required regardless of how you sell.
            </div>

            <div className="cta-row">
              <Link href="/marketplace" className="btn-primary">List your property</Link>
              {hardship && <Link href="/hardship" className="btn-ghost">Apply for hardship concession</Link>}
              {!hardship && <Link href="/pricing" className="btn-ghost">See full pricing</Link>}
            </div>
          </div>
        </div>

        <p className="disclaimer">This calculator provides an estimate only. Agent commission rates are median figures by state as of 2026 and will vary by agent, property, and negotiation. Marketing costs are estimates. PropOffer fees are fixed as listed. This is not financial advice.</p>
      </div>

      <footer className="footer">
        <div className="footer-logo">Prop<span>Offer</span></div>
        <div>© 2026 PropOffer · Australia's buyer-first property platform</div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/marketplace" style={{ color: '#bbb', textDecoration: 'none' }}>Marketplace</Link>
          <Link href="/hardship" style={{ color: '#bbb', textDecoration: 'none' }}>Hardship</Link>
          <Link href="/pricing" style={{ color: '#bbb', textDecoration: 'none' }}>Pricing</Link>
        </div>
      </footer>
    </>
  )
}
