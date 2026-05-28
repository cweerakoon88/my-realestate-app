'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import NavBar from '@/components/NavBar'

function SuccessContent() {
  const params = useSearchParams()
  const plan = params.get('plan')

  const planDetails = {
    basic: {
      name: 'Basic Listing',
      price: '$49',
      next: 'Our team will review your listing within 24 hours and contact you to confirm it\'s live.',
    },
    featured: {
      name: 'Featured Listing',
      price: '$99',
      next: 'Your listing will be pinned at the top of the marketplace and matched to relevant buyers. Our team will be in touch within a few hours.',
    },
  }

  const details = planDetails[plan] || planDetails.basic

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '9rem 2rem 6rem', textAlign: 'center', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ width: '72px', height: '72px', background: '#f5ecd8', border: '1px solid #b8924a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 2rem', color: '#b8924a' }}>✓</div>

      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b8924a', marginBottom: '1rem' }}>Payment confirmed</p>

      <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2.5rem', fontWeight: 300, color: '#1a1714', lineHeight: 1.1, marginBottom: '1rem' }}>
        You're all set!
      </h1>

      <p style={{ fontSize: '15px', color: '#4a4540', fontWeight: 300, lineHeight: 1.7, marginBottom: '2rem' }}>
        Thank you for your <strong style={{ color: '#1a1714', fontWeight: 500 }}>{details.name}</strong> ({details.price}). {details.next}
      </p>

      <div style={{ background: '#faf8f3', border: '1px solid #e8e0d0', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>👋</span>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#1a1714', marginBottom: '4px' }}>Melina & Mikayla will be in touch</div>
            <p style={{ fontSize: '13px', color: '#4a4540', fontWeight: 300, lineHeight: 1.6 }}>Our team personally reviews every listing and will contact you at the email you provided to confirm your listing is live and answer any questions.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/marketplace" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', background: '#1a1714', color: '#faf8f3', padding: '13px 28px', borderRadius: '2px', textDecoration: 'none', border: '1px solid #1a1714' }}>
          View marketplace
        </Link>
        <Link href="/" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 400, color: '#4a4540', padding: '13px 28px', borderRadius: '2px', textDecoration: 'none', border: '1px solid #e8e0d0' }}>
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default function PaymentSuccess() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #faf8f3; }
      `}</style>
      <NavBar />
      <Suspense fallback={<div style={{ padding: '10rem 2rem', textAlign: 'center', color: '#aaa' }}>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </>
  )
}