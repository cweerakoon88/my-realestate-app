import Link from 'next/link'
import NavBar from '@/components/NavBar'

export default function Terms() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }
        :root {
          --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
          --gold: #b8924a; --gold-pale: #f5ecd8; --border: #e8e0d0;
          --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
        }
        body { background: var(--cream); color: var(--ink); font-family: var(--sans); }
        .page { max-width: 820px; margin: 0 auto; padding: 9rem 3rem 6rem; }
        .eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem; }
        .eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--gold); }
        .page-title { font-family: var(--serif); font-size: clamp(2.5rem, 4vw, 4rem); font-weight: 300; color: var(--ink); line-height: 1.05; margin-bottom: 0.75rem; }
        .page-title em { font-style: italic; color: var(--gold); }
        .updated { font-family: var(--sans); font-size: 13px; color: #bbb; font-weight: 300; margin-bottom: 3rem; padding-bottom: 3rem; border-bottom: 1px solid var(--border); }
        .disclaimer-box { background: var(--gold-pale); border: 1px solid var(--border); border-left: 3px solid var(--gold); padding: 1.5rem 1.75rem; margin-bottom: 3rem; border-radius: 2px; }
        .disclaimer-box p { font-family: var(--sans); font-size: 14px; color: var(--ink-light); line-height: 1.7; font-weight: 300; }
        .disclaimer-box strong { color: var(--ink); font-weight: 500; }
        .section { margin-bottom: 2.5rem; }
        .section-num { font-family: var(--serif); font-size: 0.85rem; color: var(--gold); font-style: italic; margin-bottom: 0.5rem; }
        .section-title { font-family: var(--serif); font-size: 1.4rem; font-weight: 400; color: var(--ink); margin-bottom: 1rem; }
        .section-body { font-family: var(--sans); font-size: 14px; font-weight: 300; color: var(--ink-light); line-height: 1.9; }
        .section-body p { margin-bottom: 0.75rem; }
        .section-body p:last-child { margin-bottom: 0; }
        .section-body strong { color: var(--ink); font-weight: 500; }
        .section-body ul { padding-left: 1.25rem; margin: 0.75rem 0; }
        .section-body ul li { margin-bottom: 0.5rem; line-height: 1.7; }
        .divider { height: 1px; background: var(--border); margin: 2.5rem 0; }
        .contact-box { background: var(--warm-white); border: 1px solid var(--border); padding: 2rem; margin-top: 3rem; }
        .contact-box-title { font-family: var(--serif); font-size: 1.2rem; color: var(--ink); margin-bottom: 0.75rem; font-weight: 400; }
        .contact-box p { font-family: var(--sans); font-size: 14px; color: var(--ink-light); line-height: 1.7; font-weight: 300; }
        .contact-box a { color: var(--gold); text-decoration: none; }
        .contact-box a:hover { text-decoration: underline; }
        .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; flex-wrap: wrap; gap: 1rem; margin-top: 4rem; }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }
        .footer-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .footer-link { color: #bbb; text-decoration: none; }
        .footer-link:hover { color: var(--gold); }
        @media (max-width: 768px) {
          .page { padding: 7rem 1.5rem 4rem; }
          .footer { padding: 1.5rem; flex-direction: column; text-align: center; }
        }
      `}</style>

      <NavBar />

      <div className="page">
        <div className="eyebrow">Legal</div>
        <h1 className="page-title">Terms &<br /><em>Conditions</em></h1>
        <p className="updated">Last updated: 1 June 2026 · PropOffer (propoffer.com.au)</p>

        <div className="disclaimer-box">
          <p><strong>Important:</strong> PropOffer is a connection platform only. We do not represent, endorse, verify, or take responsibility for any buyer, seller, agent, or service provider using our platform. All transactions, negotiations, and agreements are made directly between users. Please read these terms carefully before using PropOffer.</p>
        </div>

        <div className="section">
          <div className="section-num">1.</div>
          <h2 className="section-title">About PropOffer</h2>
          <div className="section-body">
            <p>PropOffer (propoffer.com.au) is operated by Callum Weerakoon, trading as PropOffer, Melbourne, Victoria, Australia. The Platform provides a marketplace where property buyers can post requirements and property sellers and service providers can respond.</p>
            <p>By accessing or using PropOffer, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree, please do not use the Platform.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">2.</div>
          <h2 className="section-title">PropOffer is a Platform, Not a Party</h2>
          <div className="section-body">
            <p><strong>PropOffer does not act as a real estate agent, buyer's agent, mortgage broker, legal advisor, financial advisor, conveyancer, inspector, or any other professional service provider.</strong></p>
            <p>We are solely a technology platform that facilitates connections between users. We are not a party to any agreement, transaction, or communication between buyers, sellers, agents, or service providers.</p>
            <p>Any property transaction, service engagement, or agreement entered into through connections made on PropOffer is entirely between the relevant parties. PropOffer has no involvement in, and accepts no responsibility for, the outcome of any such transaction or agreement.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">3.</div>
          <h2 className="section-title">No Endorsement of Listings or Users</h2>
          <div className="section-body">
            <p>PropOffer does not verify, endorse, or guarantee:</p>
            <ul>
              <li>The accuracy, completeness, or truthfulness of any property listing, buyer requirement, or user-submitted content</li>
              <li>The identity, credentials, licensing, or qualifications of any seller, buyer, agent, or service provider</li>
              <li>The legal ownership of any property listed on the Platform</li>
              <li>The financial capacity or genuine intent of any buyer</li>
              <li>The quality, safety, or legality of any property or service offered</li>
            </ul>
            <p>Users are solely responsible for conducting their own due diligence before entering into any transaction or engaging any service provider found through the Platform.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">4.</div>
          <h2 className="section-title">Third-Party Service Providers</h2>
          <div className="section-body">
            <p>PropOffer may display listings from third-party service providers including but not limited to mortgage brokers, building inspectors, conveyancers, landscapers, and handyman services ("Third-Party Providers").</p>
            <p><strong>PropOffer is not responsible for and expressly disclaims all liability for:</strong></p>
            <ul>
              <li>The acts, omissions, errors, or negligence of any Third-Party Provider</li>
              <li>The quality, safety, legality, or suitability of any service provided by a Third-Party Provider</li>
              <li>Any loss, damage, injury, or harm arising from the use of a Third-Party Provider's services</li>
              <li>Any dispute between a user and a Third-Party Provider</li>
              <li>Whether a Third-Party Provider holds appropriate licences, insurance, or qualifications</li>
            </ul>
            <p>Any engagement with a Third-Party Provider is solely between the user and that provider. PropOffer is not party to that engagement and receives no commission from property transactions.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">5.</div>
          <h2 className="section-title">User Responsibilities</h2>
          <div className="section-body">
            <p>By using PropOffer, you agree to:</p>
            <ul>
              <li>Provide accurate, truthful, and non-misleading information in all listings and requirements</li>
              <li>Not post fraudulent, misleading, or illegal listings</li>
              <li>Conduct your own due diligence before entering into any property transaction</li>
              <li>Obtain independent legal, financial, and property advice as appropriate</li>
              <li>Not use the Platform for any unlawful purpose</li>
              <li>Not harass, mislead, or defraud other users</li>
              <li>Comply with all applicable Australian laws including the Australian Consumer Law and relevant state property legislation</li>
            </ul>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">6.</div>
          <h2 className="section-title">Limitation of Liability</h2>
          <div className="section-body">
            <p>To the maximum extent permitted by Australian law, PropOffer and its directors, employees, and agents will not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:</p>
            <ul>
              <li>Your use of or inability to use the Platform</li>
              <li>Any property transaction or service engagement facilitated through the Platform</li>
              <li>Any inaccuracy or incompleteness of listings or user content</li>
              <li>Any conduct of another user or Third-Party Provider</li>
              <li>Any loss of property value, financial loss, or consequential damages</li>
            </ul>
            <p>Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy which cannot be excluded under the Australian Consumer Law.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">7.</div>
          <h2 className="section-title">No Financial or Legal Advice</h2>
          <div className="section-body">
            <p>Nothing on the PropOffer Platform constitutes financial, legal, taxation, or property investment advice. The suburb price guide and any market data provided are for general informational purposes only and should not be relied upon as professional advice.</p>
            <p>You should always seek independent advice from a qualified professional before making any property or financial decision.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">8.</div>
          <h2 className="section-title">Fees and Payments</h2>
          <div className="section-body">
            <p>Buyer requirements are posted free of charge. Seller listings are subject to fees as described on our <Link href="/pricing" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Pricing page</Link>. All fees are in Australian dollars and inclusive of GST where applicable.</p>
            <p>Fees are charged for access to the Platform and the ability to connect with other users. PropOffer does not charge commissions on property transactions and has no financial interest in whether a transaction proceeds or at what price.</p>
            <p>Listing fees are non-refundable once a listing is approved and live on the Platform. If a listing is rejected by our team, a full refund will be issued within 5 business days. Nothing in this clause limits your rights under the Australian Consumer Law.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">9.</div>
          <h2 className="section-title">Privacy</h2>
          <div className="section-body">
            <p>PropOffer collects and handles personal information in accordance with the Australian Privacy Act 1988. By using the Platform, you consent to the collection, use, and storage of your personal information as described in our <Link href="/privacy" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Privacy Policy</Link>.</p>
            <p>User contact details shared through the Platform are provided for the purpose of connecting buyers and sellers. They must not be used for spam, unsolicited marketing, or any purpose other than the relevant property enquiry.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">10.</div>
          <h2 className="section-title">Intellectual Property</h2>
          <div className="section-body">
            <p>All content on the PropOffer Platform including logos, design, text, and software is the property of PropOffer and may not be reproduced, distributed, or used without prior written consent.</p>
            <p>By posting content on the Platform, you grant PropOffer a non-exclusive, royalty-free licence to display and use that content for the purpose of operating the Platform.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">11.</div>
          <h2 className="section-title">Termination</h2>
          <div className="section-body">
            <p>PropOffer reserves the right to suspend or terminate any user account or listing at its sole discretion, including where a user has breached these Terms, posted fraudulent or misleading content, or engaged in conduct that is harmful to other users or the Platform.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">12.</div>
          <h2 className="section-title">Changes to These Terms</h2>
          <div className="section-body">
            <p>PropOffer may update these Terms from time to time. Continued use of the Platform after changes are posted constitutes acceptance of the updated Terms. We will display the date of the most recent update at the top of this page.</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-num">13.</div>
          <h2 className="section-title">Governing Law</h2>
          <div className="section-body">
            <p>These Terms are governed by the laws of Victoria, Australia. Any disputes arising from these Terms or your use of the Platform will be subject to the exclusive jurisdiction of the courts of Victoria.</p>
          </div>
        </div>

        <div className="contact-box">
          <h3 className="contact-box-title">Questions about these Terms?</h3>
          <p>If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:hello@propoffer.com.au">hello@propoffer.com.au</a> or use the <Link href="/contact" style={{ color: 'var(--gold)', textDecoration: 'none' }}>contact form</Link>.</p>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-logo">Prop<span>Offer</span></div>
        <div className="footer-links">
          <Link href="/marketplace" className="footer-link">Marketplace</Link>
          <Link href="/pricing" className="footer-link">Pricing</Link>
          <Link href="/about" className="footer-link">About</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
          <Link href="/terms" className="footer-link">Terms</Link>
          <Link href="/privacy" className="footer-link">Privacy</Link>
        </div>
        <div>© 2026 PropOffer · Australia's buyer-first property platform</div>
      </footer>
    </>
  )
}