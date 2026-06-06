'use client'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

export default function Privacy() {
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
        .legal-page { max-width: 740px; margin: 0 auto; padding: 7rem 2rem 5rem; }
        .legal-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .legal-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; color: var(--ink); line-height: 1.1; margin-bottom: 0.75rem; }
        .legal-updated { font-family: var(--sans); font-size: 12px; color: #bbb; margin-bottom: 3rem; }
        .legal-intro { font-family: var(--sans); font-size: 15px; color: var(--ink-light); line-height: 1.8; font-weight: 300; margin-bottom: 2.5rem; padding: 1.5rem; background: var(--gold-pale); border-left: 3px solid var(--gold); border-radius: 0 4px 4px 0; }
        .legal-section { margin-bottom: 2.5rem; }
        .legal-h2 { font-family: var(--serif); font-size: 1.4rem; font-weight: 400; color: var(--ink); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
        .legal-h3 { font-family: var(--sans); font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-light); margin-bottom: 0.5rem; margin-top: 1.25rem; }
        .legal-p { font-family: var(--sans); font-size: 14px; color: var(--ink-light); line-height: 1.8; font-weight: 300; margin-bottom: 0.75rem; }
        .legal-ul { font-family: var(--sans); font-size: 14px; color: var(--ink-light); line-height: 1.8; font-weight: 300; padding-left: 1.5rem; margin-bottom: 0.75rem; }
        .legal-ul li { margin-bottom: 0.4rem; }
        .legal-a { color: var(--gold); text-decoration: none; }
        .legal-a:hover { text-decoration: underline; }
        .legal-contact-box { background: var(--warm-white); border: 1px solid var(--border); border-radius: 4px; padding: 1.5rem; margin-top: 1rem; }
        .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }
      `}</style>

      <NavBar />

      <div className="legal-page">
        <p className="legal-eyebrow">Legal</p>
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: 1 June 2026</p>

        <div className="legal-intro">
          PropOffer is built on the belief that buyers and sellers deserve a fair, transparent property experience. That same principle applies to how we handle your personal information — we collect only what we need, we store it securely, and we never sell it.
        </div>

        <div className="legal-section">
          <h2 className="legal-h2">1. Who we are</h2>
          <p className="legal-p">PropOffer (propoffer.com.au) is operated by Callum Weerakoon, trading as PropOffer, based in Melbourne, Victoria, Australia. We operate a buyer-first property marketplace connecting property buyers with sellers and service providers.</p>
          <p className="legal-p">For privacy-related enquiries: <a href="mailto:hello@propoffer.com.au" className="legal-a">hello@propoffer.com.au</a></p>
        </div>

        <div className="legal-section">
          <h2 className="legal-h2">2. What information we collect</h2>

          <h3 className="legal-h3">Account information</h3>
          <p className="legal-p">When you create an account we collect your full name, email address, and password (stored securely via Supabase Auth — we never see your raw password).</p>

          <h3 className="legal-h3">Buyer requirements</h3>
          <p className="legal-p">When you post a property requirement we collect your name, email address, mobile number, phone number (optional), preferred location, property preferences, budget range, and any additional notes you provide.</p>

          <h3 className="legal-h3">Seller listings</h3>
          <p className="legal-p">When you list a property we collect your name, email address, phone number, property details, asking price, and any documents you voluntarily upload (council rates notice, title documents). These documents are stored securely and reviewed only by PropOffer staff — they are never displayed publicly.</p>

          <h3 className="legal-h3">Payment information</h3>
          <p className="legal-p">Payments are processed by Stripe. PropOffer does not store your credit card details. Stripe's privacy policy applies to payment data: <a href="https://stripe.com/au/privacy" target="_blank" className="legal-a">stripe.com/au/privacy</a></p>

          <h3 className="legal-h3">Usage data</h3>
          <p className="legal-p">We collect standard web usage data including pages visited, browser type, device type, and IP address. This helps us improve the platform. We may use Meta Pixel and Google Analytics for advertising and analytics — see Section 6.</p>
        </div>

        <div className="legal-section">
          <h2 className="legal-h2">3. How we use your information</h2>
          <ul className="legal-ul">
            <li>To create and manage your PropOffer account</li>
            <li>To display your buyer requirement or property listing to other users</li>
            <li>To send you transactional emails — account confirmation, approval or rejection notifications, and listing updates</li>
            <li>To process payments for seller listings</li>
            <li>To review and moderate listings for fraud or inaccuracy</li>
            <li>To improve the platform based on usage patterns</li>
            <li>To comply with Australian law</li>
          </ul>
          <p className="legal-p">We do not use your information for unsolicited marketing without your consent. We do not sell your data to third parties.</p>
        </div>

        <div className="legal-section">
          <h2 className="legal-h2">4. Who we share your information with</h2>
          <p className="legal-p">Your information is shared only with the following trusted service providers who help us operate PropOffer:</p>
          <ul className="legal-ul">
            <li><strong>Supabase</strong> — database and authentication hosting (servers in AWS ap-southeast-2, Sydney)</li>
            <li><strong>Resend</strong> — transactional email delivery</li>
            <li><strong>Stripe</strong> — payment processing</li>
            <li><strong>Vercel</strong> — website hosting</li>
          </ul>
          <p className="legal-p">Your contact details (email, phone) are visible to other logged-in PropOffer users when you expand a listing card on the marketplace. By posting a requirement or listing, you consent to this visibility.</p>
          <p className="legal-p">We may disclose your information if required by Australian law, court order, or to prevent fraud or serious harm.</p>
        </div>

        <div className="legal-section">
          <h2 className="legal-h2">5. Data storage and security</h2>
          <p className="legal-p">Your data is stored on Supabase's infrastructure hosted in Sydney, Australia. We use industry-standard encryption for data in transit (HTTPS/TLS) and at rest. Access to personal data is restricted to authorised PropOffer administrators only.</p>
          <p className="legal-p">While we take all reasonable steps to protect your information, no internet-based service can guarantee 100% security. If you believe your account has been compromised, contact us immediately at <a href="mailto:hello@propoffer.com.au" className="legal-a">hello@propoffer.com.au</a>.</p>
        </div>

        <div className="legal-section">
          <h2 className="legal-h2">6. Cookies and tracking</h2>
          <p className="legal-p">PropOffer uses cookies and similar tracking technologies to:</p>
          <ul className="legal-ul">
            <li>Keep you logged in between sessions</li>
            <li>Understand how the platform is being used (analytics)</li>
            <li>Show relevant advertising to people who have visited PropOffer (retargeting via Meta Pixel)</li>
          </ul>
          <p className="legal-p">The Meta Pixel (Facebook) may track your visit to PropOffer and associate it with your Facebook profile to show you relevant ads. This tracking is governed by Meta's Data Policy. You can opt out of Meta's ad tracking at <a href="https://www.facebook.com/ads/preferences" target="_blank" className="legal-a">facebook.com/ads/preferences</a>.</p>
          <p className="legal-p">You can disable cookies in your browser settings, though this may affect your ability to use PropOffer.</p>
        </div>

        <div className="legal-section">
          <h2 className="legal-h2">7. Your rights</h2>
          <p className="legal-p">Under the Australian Privacy Act 1988, you have the right to:</p>
          <ul className="legal-ul">
            <li><strong>Access</strong> — request a copy of the personal information we hold about you</li>
            <li><strong>Correction</strong> — request that we correct inaccurate information</li>
            <li><strong>Deletion</strong> — request that we delete your account and personal data</li>
            <li><strong>Portability</strong> — request your data in a readable format</li>
            <li><strong>Complaint</strong> — lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" className="legal-a">oaic.gov.au</a></li>
          </ul>
          <p className="legal-p">To exercise any of these rights, email <a href="mailto:hello@propoffer.com.au" className="legal-a">hello@propoffer.com.au</a>. We will respond within 30 days.</p>
        </div>

        <div className="legal-section">
          <h2 className="legal-h2">8. Children's privacy</h2>
          <p className="legal-p">PropOffer is not intended for use by anyone under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has created an account, please contact us and we will delete it promptly.</p>
        </div>

        <div className="legal-section">
          <h2 className="legal-h2">9. Changes to this policy</h2>
          <p className="legal-p">We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top. For significant changes, we will notify registered users by email. Continued use of PropOffer after changes are posted constitutes acceptance of the updated policy.</p>
        </div>

        <div className="legal-section">
          <h2 className="legal-h2">10. Contact us</h2>
          <div className="legal-contact-box">
            <p className="legal-p" style={{ marginBottom: '0.5rem' }}><strong>PropOffer Privacy</strong></p>
            <p className="legal-p" style={{ marginBottom: '0.25rem' }}>📧 <a href="mailto:hello@propoffer.com.au" className="legal-a">hello@propoffer.com.au</a></p>
            <p className="legal-p" style={{ marginBottom: '0.25rem' }}>🌐 <a href="https://propoffer.com.au" className="legal-a">propoffer.com.au</a></p>
            <p className="legal-p" style={{ marginBottom: 0 }}>📍 Melbourne, Victoria, Australia</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-logo">Prop<span>Offer</span></div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[['/', 'Home'], ['/marketplace', 'Marketplace'], ['/terms', 'Terms'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: '#bbb', textDecoration: 'none', fontFamily: 'system-ui,sans-serif', fontSize: '12px' }}>{label}</Link>
          ))}
        </div>
        <div>© 2026 PropOffer</div>
      </footer>
    </>
  )
}