'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/NavBar'
import AuthModal from '@/components/AuthModal'

export default function Hardship() {
  const router = useRouter()
  const [showAuth, setShowAuth] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', situation: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and a brief description.')
      return
    }
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: `Hardship concession enquiry — ${form.situation || 'General'}`,
          message: form.message,
        }),
      })
      if (res.ok) setSubmitted(true)
      else setError('Something went wrong. Please try emailing us directly at hello@propoffer.com.au')
    } catch {
      setError('Something went wrong. Please try emailing us directly at hello@propoffer.com.au')
    }
    setSending(false)
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
        html, body { overflow-x: hidden; }
        :root {
          --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
          --gold: #b8924a; --gold-light: #d4aa6a; --gold-pale: #f5ecd8; --border: #e8e0d0;
          --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
          --green: #2d6a4f; --green-pale: #f0faf4; --green-border: #b7e4c7;
        }
        body { background: var(--cream); color: var(--ink); font-family: var(--sans); }

        /* ---- HERO ---- */
        .hero { max-width: 900px; margin: 0 auto; padding: 9rem 3rem 5rem; }
        .hero-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 2rem; }
        .hero-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }
        .hero-title { font-family: var(--serif); font-size: clamp(2.4rem, 5vw, 4.5rem); font-weight: 300; line-height: 1.05; color: var(--ink); margin-bottom: 2rem; }
        .hero-title em { font-style: italic; color: var(--gold); }
        .hero-lead { font-family: var(--serif); font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 300; color: var(--ink-light); line-height: 1.75; max-width: 680px; font-style: italic; margin-bottom: 3rem; }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
        .btn-primary { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; background: var(--gold); color: #fff; padding: 14px 32px; border-radius: 2px; border: 1px solid var(--gold); cursor: pointer; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-primary:hover { background: var(--ink); border-color: var(--ink); }
        .btn-ghost { font-family: var(--sans); font-size: 13px; font-weight: 400; color: var(--ink-light); text-decoration: none; display: flex; align-items: center; gap: 6px; transition: color 0.2s; }
        .btn-ghost:hover { color: var(--gold); }
        .btn-ghost::after { content: '→'; }

        /* ---- STORY BAND ---- */
        .story-band { background: var(--ink); padding: 5rem 0; }
        .story-inner { max-width: 900px; margin: 0 auto; padding: 0 3rem; }
        .story-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; }
        .story-pull { font-family: var(--serif); font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 300; color: var(--cream); line-height: 1.4; margin-bottom: 2rem; }
        .story-pull em { font-style: italic; color: var(--gold); }
        .story-body { font-size: 15px; font-weight: 300; color: rgba(250,248,243,0.65); line-height: 1.9; max-width: 620px; }

        /* ---- HOW IT WORKS ---- */
        .how { max-width: 900px; margin: 0 auto; padding: 6rem 3rem; }
        .how-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .how-title { font-family: var(--serif); font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 300; color: var(--ink); margin-bottom: 3.5rem; line-height: 1.1; }
        .how-title em { font-style: italic; color: var(--gold); }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--border); border: 1px solid var(--border); margin-bottom: 3rem; }
        .step { background: var(--warm-white); padding: 2rem 1.75rem; position: relative; border-left: 3px solid transparent; transition: border-color 0.2s; }
        .step:hover { border-left-color: var(--gold); }
        .step-num { font-family: var(--serif); font-size: 3.5rem; font-weight: 300; color: var(--gold-pale); line-height: 1; position: absolute; top: 1.25rem; right: 1.25rem; }
        .step-title { font-family: var(--serif); font-size: 1.2rem; color: var(--ink); margin-bottom: 0.75rem; font-weight: 400; }
        .step-desc { font-size: 13px; color: var(--ink-light); line-height: 1.75; font-weight: 300; }

        /* ---- QUALIFY ---- */
        .qualify { background: var(--gold-pale); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 5rem 0; }
        .qualify-inner { max-width: 900px; margin: 0 auto; padding: 0 3rem; }
        .qualify-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .qualify-title { font-family: var(--serif); font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 300; color: var(--ink); margin-bottom: 2.5rem; line-height: 1.15; }
        .qualify-title em { font-style: italic; color: var(--gold); }
        .qualify-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; background: var(--border); border: 1px solid var(--border); margin-bottom: 2rem; }
        .qualify-item { background: var(--warm-white); padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start; }
        .qualify-check { width: 24px; height: 24px; background: var(--green-pale); border: 1px solid var(--green-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--green); flex-shrink: 0; margin-top: 2px; }
        .qualify-text { font-size: 14px; color: var(--ink-light); line-height: 1.65; font-weight: 300; }
        .qualify-text strong { color: var(--ink); font-weight: 500; }
        .qualify-note { font-size: 13px; color: var(--ink-light); line-height: 1.7; font-style: italic; }

        /* ---- PROMISE ---- */
        .promise { max-width: 900px; margin: 0 auto; padding: 5rem 3rem; }
        .promise-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; align-items: start; }
        .promise-label { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); padding-top: 0.5rem; }
        .promise-body p { font-size: 15px; font-weight: 300; color: var(--ink-light); line-height: 1.9; margin-bottom: 1.5rem; }
        .promise-body p:last-child { margin-bottom: 0; }
        .promise-body strong { color: var(--ink); font-weight: 500; }
        .promise-pull { font-family: var(--serif); font-size: 1.6rem; font-weight: 300; color: var(--ink); line-height: 1.4; font-style: italic; border-left: 2px solid var(--gold); padding-left: 2rem; margin: 2rem 0; }

        /* ---- FORM ---- */
        .form-section { background: var(--ink); padding: 6rem 0; }
        .form-inner { max-width: 900px; margin: 0 auto; padding: 0 3rem; display: grid; grid-template-columns: 1fr 1.2fr; gap: 5rem; align-items: start; }
        .form-left-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; }
        .form-left-title { font-family: var(--serif); font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 300; color: var(--cream); line-height: 1.15; margin-bottom: 1.5rem; }
        .form-left-title em { font-style: italic; color: var(--gold); }
        .form-left-body { font-size: 14px; font-weight: 300; color: rgba(250,248,243,0.6); line-height: 1.85; margin-bottom: 2rem; }
        .form-left-body p { margin-bottom: 1rem; }
        .form-card { background: var(--warm-white); border: 1px solid var(--border); padding: 2rem; }
        .form-title { font-family: var(--serif); font-size: 1.5rem; font-weight: 300; color: var(--ink); margin-bottom: 0.5rem; }
        .form-subtitle { font-size: 13px; color: var(--ink-light); font-weight: 300; margin-bottom: 1.75rem; line-height: 1.6; }
        .field { margin-bottom: 1rem; }
        .field label { display: block; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-light); margin-bottom: 5px; }
        .field input, .field select, .field textarea { width: 100%; font-family: var(--sans); font-size: 14px; color: var(--ink); background: var(--cream); border: 1px solid var(--border); border-radius: 2px; padding: 10px 14px; outline: none; transition: border-color 0.15s; box-sizing: border-box; }
        .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--gold); background: var(--warm-white); }
        .field textarea { height: 110px; resize: vertical; }
        .form-error { font-size: 13px; color: #c0392b; background: #fdf0ef; border: 1px solid #f5c6c2; padding: 10px 14px; border-radius: 2px; margin-bottom: 1rem; }
        .form-success { text-align: center; padding: 2rem 1rem; }
        .form-success-icon { width: 52px; height: 52px; background: var(--green-pale); border: 1px solid var(--green-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; margin: 0 auto 1.25rem; }
        .form-success-title { font-family: var(--serif); font-size: 1.5rem; font-weight: 300; color: var(--ink); margin-bottom: 0.5rem; }
        .form-success-body { font-size: 14px; color: var(--ink-light); line-height: 1.7; font-weight: 300; }
        .privacy-note { font-size: 11px; color: var(--ink-light); line-height: 1.6; margin-top: 1rem; font-style: italic; }

        /* ---- FAQ ---- */
        .faq { max-width: 900px; margin: 0 auto; padding: 6rem 3rem; }
        .faq-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .faq-title { font-family: var(--serif); font-size: clamp(2rem, 3vw, 2.8rem); font-weight: 300; color: var(--ink); margin-bottom: 3rem; }
        .faq-item { border-top: 1px solid var(--border); padding: 1.5rem 0; }
        .faq-item:last-child { border-bottom: 1px solid var(--border); }
        .faq-q { font-family: var(--serif); font-size: 1.15rem; font-weight: 400; color: var(--ink); margin-bottom: 0.75rem; }
        .faq-a { font-size: 14px; color: var(--ink-light); line-height: 1.8; font-weight: 300; }
        .faq-a a { color: var(--gold); text-decoration: none; }

        /* ---- FOOTER ---- */
        .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; flex-wrap: wrap; gap: 1rem; }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 768px) {
          .hero { padding: 6rem 1.25rem 3rem; }
          .story-inner, .how, .qualify-inner, .promise, .faq { padding-left: 1.25rem; padding-right: 1.25rem; }
          .steps { grid-template-columns: 1fr; }
          .qualify-grid { grid-template-columns: 1fr; }
          .promise-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .form-inner { grid-template-columns: 1fr; gap: 2.5rem; padding: 0 1.25rem; }
          .footer { padding: 1.5rem 1.25rem; flex-direction: column; text-align: center; }
        }
      `}</style>

      <NavBar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">Hardship concession</div>
        <h1 className="hero-title">
          Selling shouldn't cost you<br />
          more when you can<br />
          <em>least afford it.</em>
        </h1>
        <p className="hero-lead">
          If you're selling your property because of financial difficulty — mortgage stress, job loss, illness, or any other hardship — PropOffer will list your property for free. You pay nothing until after your property sells.
        </p>
        <div className="hero-actions">
          <a href="#apply" className="btn-primary">Apply for the concession</a>
          <Link href="/marketplace" className="btn-ghost">Browse the marketplace</Link>
        </div>
      </section>

      {/* STORY BAND */}
      <div className="story-band">
        <div className="story-inner">
          <div className="story-eyebrow">Why this exists</div>
          <p className="story-pull">
            The people who need a fair deal the most are often the ones <em>least able</em> to afford the system as it exists.
          </p>
          <p className="story-body">
            In Australia right now, 1.3 million households are at risk of mortgage stress. Many of these families need to sell — not because they want to, but because they have to. And when they approach a traditional agent, they're looking at $15,000 to $25,000 in upfront commissions before they've seen a single dollar from the sale. That's not a fair system. PropOffer was built to change that.
          </p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="how-eyebrow">How the concession works</div>
        <h2 className="how-title">Three steps.<br /><em>No upfront cost.</em></h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h3 className="step-title">Tell us your situation</h3>
            <p className="step-desc">Fill in the short form below. You don't need to prove anything upfront — just tell us honestly what you're going through. Everything you share is confidential.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h3 className="step-title">We approve and list you for free</h3>
            <p className="step-desc">We'll review your application within one business day and activate a free listing on the PropOffer marketplace. Serious buyers who match your property will contact you directly.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h3 className="step-title">Pay only after settlement</h3>
            <p className="step-desc">If your property sells through PropOffer, our standard listing fee is deducted from your settlement proceeds — not charged upfront. If your property doesn't sell, you owe nothing.</p>
          </div>
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--ink-light)', lineHeight: 1.7, fontStyle: 'italic' }}>
          Our standard listing fee is $99 for a basic listing or $199 for a featured listing. Under the hardship concession, this is deferred to settlement. Buyers can always reach out to you for free — you only pay if the sale completes.
        </p>
      </section>

      {/* WHO QUALIFIES */}
      <section className="qualify">
        <div className="qualify-inner">
          <div className="qualify-eyebrow">Who this is for</div>
          <h2 className="qualify-title">You may qualify if you're <em>selling because of…</em></h2>
          <div className="qualify-grid">
            {[
              { title: 'Mortgage stress', desc: 'Your repayments are consuming more than 30–35% of your household income and you can no longer maintain them.' },
              { title: 'Job loss or reduced income', desc: 'You or your partner have lost work, been stood down, or had income significantly reduced.' },
              { title: 'Illness or medical costs', desc: 'A health event has affected your ability to meet housing costs, or you need funds to cover medical expenses.' },
              { title: 'Relationship breakdown', desc: 'Separation or divorce has made the property financially unviable to hold.' },
              { title: 'Death in the family', desc: 'You\'re selling as part of an estate, or financial circumstances have changed due to the loss of a household income earner.' },
              { title: 'Other genuine hardship', desc: 'Your situation doesn\'t fit neatly into a category. Tell us what\'s happening — we\'ll assess it with compassion, not a checklist.' },
            ].map((item, i) => (
              <div key={i} className="qualify-item">
                <div className="qualify-check">✓</div>
                <div className="qualify-text"><strong>{item.title}</strong><br />{item.desc}</div>
              </div>
            ))}
          </div>
          <p className="qualify-note">You don't need to provide formal documentation to apply. We operate on trust. We may ask a few follow-up questions to understand your situation better.</p>
        </div>
      </section>

      {/* PROMISE */}
      <section className="promise">
        <div className="promise-grid">
          <div className="promise-label">Our promise to you</div>
          <div className="promise-body">
            <div className="promise-pull">PropOffer's main purpose isn't money. It's to provide a fair service to the community.</div>
            <p>We built this platform because the property transaction system in Australia is stacked against ordinary people. Agents work for sellers but extract fees from both sides. Auctions create artificial urgency. Off-market deals are reserved for those with connections.</p>
            <p>The hardship concession exists because we genuinely believe that <strong>a person selling under financial pressure deserves more support, not less.</strong> The stress of selling a home is already enormous. Adding a $20,000 bill at the start of the process — when you're already struggling — is something we refuse to be part of.</p>
            <p>If you sell through PropOffer and things don't work out, you walk away owing us nothing. That's not a marketing promise. It's how we're built.</p>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="form-section" id="apply">
        <div className="form-inner">
          <div>
            <div className="form-left-eyebrow">Apply for the concession</div>
            <h2 className="form-left-title">Tell us<br /><em>what's happening.</em></h2>
            <div className="form-left-body">
              <p>This form goes directly to Callum, PropOffer's founder. You'll hear back within one business day — usually sooner.</p>
              <p>There's no judgment here. We're not a bank, and we're not assessing your creditworthiness. We just want to understand your situation so we can help in the right way.</p>
              <p>Everything you share is confidential and will never be shared with third parties.</p>
            </div>
            <div style={{ borderTop: '1px solid rgba(250,248,243,0.1)', paddingTop: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(250,248,243,0.4)', lineHeight: 1.7, fontWeight: 300 }}>
                Or email us directly:<br />
                <a href="mailto:hello@propoffer.com.au" style={{ color: 'var(--gold)', textDecoration: 'none' }}>hello@propoffer.com.au</a>
              </p>
            </div>
          </div>

          <div className="form-card">
            {submitted ? (
              <div className="form-success">
                <div className="form-success-icon">✓</div>
                <div className="form-success-title">Thank you, {form.name.split(' ')[0]}.</div>
                <p className="form-success-body">We've received your message and will be in touch within one business day. You don't need to do anything else right now.<br /><br />We're glad you reached out.</p>
              </div>
            ) : (
              <>
                <div className="form-title">Hardship concession application</div>
                <p className="form-subtitle">Takes about 2 minutes. No documents required.</p>

                {error && <div className="form-error">{error}</div>}

                <div className="field">
                  <label>Your full name</label>
                  <input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="field">
                  <label>Email address</label>
                  <input type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="field">
                  <label>Phone <span style={{ fontWeight: 300, textTransform: 'none', letterSpacing: 0, color: '#bbb' }}>(optional)</span></label>
                  <input type="tel" placeholder="0412 345 678" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="field">
                  <label>Situation</label>
                  <select value={form.situation} onChange={e => setForm(p => ({ ...p, situation: e.target.value }))}>
                    <option value="">Select the closest description…</option>
                    <option>Mortgage stress</option>
                    <option>Job loss or reduced income</option>
                    <option>Illness or medical costs</option>
                    <option>Relationship breakdown</option>
                    <option>Death in the family</option>
                    <option>Other hardship</option>
                  </select>
                </div>
                <div className="field">
                  <label>Tell us briefly what's happening</label>
                  <textarea
                    placeholder="In your own words — what's going on, where the property is, and how we can help. There's no wrong answer here."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  />
                </div>

                <button className="btn-primary" style={{ width: '100%', textAlign: 'center' }} onClick={handleSubmit} disabled={sending}>
                  {sending ? 'Sending…' : 'Send my application'}
                </button>

                <p className="privacy-note">Your information is confidential and will only be seen by the PropOffer team. We will never share it with third parties or use it for marketing without your permission.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="faq-eyebrow">Common questions</div>
        <h2 className="faq-title">What you might be wondering</h2>
        {[
          {
            q: 'What exactly does "pay from settlement" mean?',
            a: 'It means you pay nothing upfront to list your property on PropOffer. If your property sells through a connection made on our platform, our standard listing fee ($99 or $199) is deducted from the settlement amount at the end — the same way conveyancer fees work. If your property doesn\'t sell, you owe us nothing at all.',
          },
          {
            q: 'Do I need to prove my hardship with documents?',
            a: 'No. We operate on trust and human judgement, not paperwork. You may choose to share context that helps us understand your situation, but we won\'t ask for bank statements, medical certificates, or formal proof. If we have questions, we\'ll ask them directly and kindly.',
          },
          {
            q: 'What if my property doesn\'t sell through PropOffer?',
            a: 'You owe us nothing. There are no cancellation fees, no listing fees, and no obligations if your property doesn\'t sell. You can also list through an agent at the same time — PropOffer doesn\'t require exclusivity.',
          },
          {
            q: 'Can I use PropOffer alongside a traditional agent?',
            a: 'Yes. PropOffer doesn\'t require exclusivity. Many sellers use us in parallel with a traditional agent to reach a different audience — particularly serious buyers looking for off-market properties who aren\'t browsing Domain.',
          },
          {
            q: 'How quickly will I hear back after applying?',
            a: 'Within one business day. Usually the same day. Your application goes directly to Callum, PropOffer\'s founder — not a call centre or automated system.',
          },
          {
            q: 'Is this only available in Victoria?',
            a: 'No. The hardship concession is available to sellers anywhere in Australia. PropOffer operates nationally.',
          },
        ].map((item, i) => (
          <div key={i} className="faq-item">
            <div className="faq-q">{item.q}</div>
            <div className="faq-a">{item.a}</div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Prop<span>Offer</span></div>
        <div>© 2026 PropOffer · Australia's buyer-first property platform</div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/marketplace" style={{ color: '#bbb', textDecoration: 'none' }}>Marketplace</Link>
          <Link href="/pricing" style={{ color: '#bbb', textDecoration: 'none' }}>Pricing</Link>
          <Link href="/about" style={{ color: '#bbb', textDecoration: 'none' }}>About</Link>
          <Link href="/contact" style={{ color: '#bbb', textDecoration: 'none' }}>Contact</Link>
        </div>
      </footer>
    </>
  )
}
