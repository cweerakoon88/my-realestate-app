'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import NavBar from '@/components/NavBar'

const CATEGORIES = [
  { id: 'all', label: 'All services' },
  { id: 'mortgage_broker', label: '🏦 Mortgage brokers' },
  { id: 'building_inspector', label: '🔍 Building inspectors' },
  { id: 'conveyancer', label: '📜 Conveyancers' },
  { id: 'landscaper', label: '🌿 Landscapers' },
  { id: 'handyman', label: '🔧 Handyman' },
]

const CATEGORY_META = {
  mortgage_broker: {
    icon: '🏦',
    label: 'Mortgage Broker',
    color: '#1a6fa8',
    bg: '#e8f4fd',
    badge: 'Free for buyers',
    badgeColor: '#2d6a4f',
    badgeBg: '#f0faf4',
  },
  building_inspector: {
    icon: '🔍',
    label: 'Building Inspector',
    color: '#7a5c00',
    bg: '#fffbea',
    badge: 'Book in 24hrs',
    badgeColor: '#7a5c00',
    badgeBg: '#fffbea',
  },
  conveyancer: {
    icon: '📜',
    label: 'Conveyancer',
    color: '#6a1a6a',
    bg: '#fdf0fd',
    badge: 'Fixed fee',
    badgeColor: '#6a1a6a',
    badgeBg: '#fdf0fd',
  },
  landscaper: {
    icon: '🌿',
    label: 'Landscaper',
    color: '#2d6a4f',
    bg: '#f0faf4',
    badge: 'Free consult',
    badgeColor: '#2d6a4f',
    badgeBg: '#f0faf4',
  },
  handyman: {
    icon: '🔧',
    label: 'Handyman',
    color: '#9c7c4a',
    bg: '#f5ecd8',
    badge: 'Same week',
    badgeColor: '#9c7c4a',
    badgeBg: '#f5ecd8',
  },
}

function ProviderCard({ provider }) {
  const [showContact, setShowContact] = useState(false)
  const meta = CATEGORY_META[provider.category] || CATEGORY_META.handyman

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e8e0d0',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Top colour bar */}
      <div style={{ height: '4px', background: meta.color }} />

      <div style={{ padding: '1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {/* Avatar */}
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: meta.bg, border: `2px solid ${meta.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
              {provider.photo_url ? (
                <img src={provider.photo_url} alt={provider.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              ) : (
                <span>{meta.icon}</span>
              )}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '2px' }}>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', fontWeight: '400', color: '#1a1714', margin: 0 }}>{provider.name}</h3>
                {provider.featured && (
                  <span style={{ fontSize: '10px', fontFamily: 'system-ui,sans-serif', background: '#b8924a', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontWeight: '600', letterSpacing: '0.06em' }}>⭐ FEATURED</span>
                )}
              </div>
              {provider.business_name && (
                <div style={{ fontSize: '13px', color: '#888', fontFamily: 'system-ui,sans-serif' }}>{provider.business_name}</div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
            <span style={{ fontSize: '11px', fontFamily: 'system-ui,sans-serif', background: meta.bg, color: meta.color, padding: '3px 10px', borderRadius: '20px', fontWeight: '500' }}>
              {meta.label}
            </span>
            <span style={{ fontSize: '11px', fontFamily: 'system-ui,sans-serif', background: meta.badgeBg, color: meta.badgeColor, padding: '3px 10px', borderRadius: '20px', fontWeight: '500' }}>
              {meta.badge}
            </span>
          </div>
        </div>

        {/* Bio */}
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: '#555', lineHeight: 1.7, marginBottom: '1rem', fontWeight: '300' }}>
          {provider.bio}
        </p>

        {/* Specialties */}
        {provider.specialties && provider.specialties.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
            {provider.specialties.map(s => (
              <span key={s} style={{ fontSize: '11px', fontFamily: 'system-ui,sans-serif', background: '#f5f5f5', color: '#666', padding: '3px 10px', borderRadius: '20px', border: '1px solid #eee' }}>
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Meta info */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {provider.suburb && (
            <span style={{ fontSize: '12px', color: '#888', fontFamily: 'system-ui,sans-serif' }}>
              📍 {provider.suburb}, {provider.state}
            </span>
          )}
          {provider.years_experience && (
            <span style={{ fontSize: '12px', color: '#888', fontFamily: 'system-ui,sans-serif' }}>
              ⏱ {provider.years_experience} years experience
            </span>
          )}
          {provider.services_areas && provider.services_areas.length > 0 && (
            <span style={{ fontSize: '12px', color: '#888', fontFamily: 'system-ui,sans-serif' }}>
              🗺 {provider.services_areas.slice(0, 2).join(', ')}{provider.services_areas.length > 2 ? ` +${provider.services_areas.length - 2} more` : ''}
            </span>
          )}
        </div>

        {/* Contact */}
        {!showContact ? (
          <button
            onClick={async () => {
              setShowContact(true)
              // increment enquiry count
              await supabase.from('service_providers')
                .update({ enquiry_count: (provider.enquiry_count || 0) + 1 })
                .eq('id', provider.id)
            }}
            style={{ width: '100%', padding: '11px', background: '#1a1714', color: '#faf8f3', border: 'none', borderRadius: '8px', fontFamily: 'system-ui,sans-serif', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => e.target.style.background = '#b8924a'}
            onMouseLeave={e => e.target.style.background = '#1a1714'}
          >
            View contact details →
          </button>
        ) : (
          <div style={{ background: '#f8f7f4', border: '1px solid #e8e0d0', borderRadius: '8px', padding: '1rem' }}>
            <div style={{ fontSize: '11px', fontFamily: 'system-ui,sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b8924a', marginBottom: '10px', fontWeight: '500' }}>Contact {provider.name.split(' ')[0]}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href={`mailto:${provider.email}?subject=Enquiry via PropOffer`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: '#1a1714', textDecoration: 'none' }}>
                ✉ {provider.email}
              </a>
              {provider.phone && (
                <a href={`tel:${provider.phone.replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: '#1a1714', textDecoration: 'none' }}>
                  📱 {provider.phone}
                </a>
              )}
              {provider.website && (
                <a href={provider.website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: '#b8924a', textDecoration: 'none' }}>
                  🌐 Visit website ↗
                </a>
              )}
            </div>
            <div style={{ marginTop: '10px', fontSize: '11px', color: '#bbb', fontFamily: 'system-ui,sans-serif', lineHeight: 1.5 }}>
              💡 Mention PropOffer when you get in touch
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Services() {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeState, setActiveState] = useState('all')

  useEffect(() => {
    fetchProviders()
  }, [])

  async function fetchProviders() {
    setLoading(true)
    const { data } = await supabase
      .from('service_providers')
      .select('*')
      .eq('status', 'active')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: true })
    setProviders(data || [])
    setLoading(false)
  }

  const filtered = providers.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false
    if (activeState !== 'all' && p.state !== activeState) return false
    return true
  })

  const states = ['all', ...new Set(providers.map(p => p.state).filter(Boolean))]

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
        .footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); font-family: var(--sans); font-size: 12px; color: #bbb; flex-wrap: wrap; gap: 1rem; margin-top: 4rem; }
        .footer-logo { font-family: var(--serif); font-size: 1.1rem; color: var(--ink-light); }
        .footer-logo span { color: var(--gold); }
        .footer-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .footer-link { color: #bbb; text-decoration: none; }
        .footer-link:hover { color: var(--gold); }
        @media (max-width: 768px) {
          .footer { padding: 1.5rem; flex-direction: column; text-align: center; }
        }
      `}</style>

      <NavBar />

      {/* HERO */}
      <div style={{ background: '#1a1714', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '11px', fontWeight: '500', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b8924a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ display: 'block', width: '28px', height: '1px', background: '#b8924a' }} />
            Trusted service providers
          </div>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '300', color: '#faf8f3', lineHeight: 1.1, marginBottom: '1rem' }}>
            Everything you need,<br /><em style={{ fontStyle: 'italic', color: '#b8924a' }}>all in one place.</em>
          </h1>
          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: '15px', fontWeight: '300', color: 'rgba(250,248,243,0.6)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '2rem' }}>
            Verified professionals across mortgage broking, building inspections, conveyancing, landscaping and more. Contact them directly — no middlemen.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: 'rgba(250,248,243,0.45)' }}>
            <span>✓ {providers.length} verified providers</span>
            <span>✓ Direct contact — no referral fees</span>
            <span>✓ Mention PropOffer for priority service</span>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e8e0d0', padding: '0 2rem', position: 'sticky', top: '62px', zIndex: 50, overflowX: 'auto' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '0', minWidth: 'max-content' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '1rem 1.25rem', border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: 'system-ui,sans-serif', fontSize: '13px', whiteSpace: 'nowrap',
                color: activeCategory === cat.id ? '#1a1714' : '#888',
                borderBottom: `2px solid ${activeCategory === cat.id ? '#b8924a' : 'transparent'}`,
                fontWeight: activeCategory === cat.id ? '500' : '400',
                transition: 'all 0.15s',
              }}
            >
              {cat.label}
              {cat.id !== 'all' && (
                <span style={{ marginLeft: '6px', fontSize: '11px', color: '#bbb' }}>
                  ({providers.filter(p => p.category === cat.id).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>

        {/* State filter + count */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: '#888' }}>
            Showing <strong style={{ color: '#1a1714' }}>{filtered.length}</strong> provider{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'all' ? ` · ${CATEGORIES.find(c => c.id === activeCategory)?.label}` : ''}
          </div>
          {states.length > 2 && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {states.map(s => (
                <button key={s} onClick={() => setActiveState(s)} style={{ padding: '5px 12px', border: `1px solid ${activeState === s ? '#1a1714' : '#ddd'}`, borderRadius: '20px', fontSize: '12px', cursor: 'pointer', background: activeState === s ? '#1a1714' : '#fff', color: activeState === s ? '#fff' : '#666', fontFamily: 'system-ui,sans-serif' }}>
                  {s === 'all' ? 'All states' : s}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa', fontFamily: 'system-ui,sans-serif' }}>Loading providers...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '12px', border: '1px solid #e8e0d0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
            <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.2rem', color: '#1a1714', marginBottom: '0.5rem' }}>No providers found</div>
            <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: '#888' }}>Try a different category or state filter</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '16px' }}>
            {filtered.map(provider => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}

        {/* CTA for providers */}
        <div style={{ marginTop: '4rem', background: '#1a1714', borderRadius: '12px', padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.4rem', fontWeight: '300', color: '#faf8f3', marginBottom: '0.5rem' }}>
              Are you a service provider?
            </div>
            <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: 'rgba(250,248,243,0.55)', fontWeight: '300', lineHeight: 1.6 }}>
              List your services on PropOffer and connect with serious property buyers.<br />
              From $99/month. No referral fees — direct contact only.
            </div>
          </div>
          <a
            href="mailto:hello@propoffer.com.au?subject=List my services on PropOffer"
            style={{ padding: '12px 28px', background: '#b8924a', color: '#1a1714', border: 'none', borderRadius: '8px', fontFamily: 'system-ui,sans-serif', fontSize: '13px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}
          >
            Apply to list →
          </a>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-logo">Prop<span>Offer</span></div>
        <div className="footer-links">
          {[['/', 'Home'], ['/marketplace', 'Marketplace'], ['/pricing', 'Pricing'], ['/about', 'About'], ['/contact', 'Contact'], ['/terms', 'Terms']].map(([href, label]) => (
            <Link key={href} href={href} className="footer-link">{label}</Link>
          ))}
        </div>
        <div>© 2026 PropOffer · Australia's buyer-first property platform</div>
      </footer>
    </>
  )
}