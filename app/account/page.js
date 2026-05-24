'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'

const TABS = ['Requirements', 'Offers', 'Saved', 'Settings']

export default function AccountPage() {
  const { user, loading, signOut, supabase } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Requirements')
  const [requirements, setRequirements] = useState([])
  const [savedProperties, setSavedProperties] = useState([])
  const [offers, setOffers] = useState([])
  const [profile, setProfile] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [profileForm, setProfileForm] = useState({ full_name: '', phone: '' })
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (!loading && !user) router.push('/')
  }, [user, loading])

  useEffect(() => {
    if (!user) return
    fetchAllData()
  }, [user])

  async function fetchAllData() {
    setDataLoading(true)
    const [reqRes, savedRes, offersRes, profileRes] = await Promise.all([
      supabase.from('requirements').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('saved_properties').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('offers').select('*').eq('buyer_id', user.id).order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').eq('id', user.id).single(),
    ])
    setRequirements(reqRes.data || [])
    setSavedProperties(savedRes.data || [])
    setOffers(offersRes.data || [])
    if (profileRes.data) {
      setProfile(profileRes.data)
      setProfileForm({ full_name: profileRes.data.full_name || '', phone: profileRes.data.phone || '' })
    }
    setDataLoading(false)
  }

  async function handleSaveProfile(e) {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      full_name: profileForm.full_name,
      phone: profileForm.phone,
      updated_at: new Date().toISOString(),
    })
    setSaving(false)
    setSaveMsg(error ? 'Error saving. Try again.' : 'Profile saved!')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  async function handleDeleteRequirement(id) {
    if (!confirm('Remove this requirement?')) return
    await supabase.from('requirements').delete().eq('id', id)
    setRequirements(prev => prev.filter(r => r.id !== id))
  }

  async function handleUnsave(id) {
    await supabase.from('saved_properties').delete().eq('id', id)
    setSavedProperties(prev => prev.filter(s => s.id !== id))
  }

  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', fontFamily:'DM Sans, sans-serif', color:'#4a4540' }}>Loading…</div>
  if (!user) return null

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'Buyer'
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <>
      <style>{pageStyles}</style>

      {/* NAV */}
      <nav className="acc-nav">
        <Link href="/" className="acc-logo">Prop<span>Match</span></Link>
        <div className="acc-nav-right">
          <Link href="/post" className="acc-nav-post">+ Post Requirement</Link>
          <div className="acc-avatar" title={displayName}>{initials}</div>
          <button className="acc-signout" onClick={signOut}>Sign out</button>
        </div>
      </nav>

      <main className="acc-main">
        {/* Header */}
        <div className="acc-header">
          <div className="acc-header-inner">
            <div className="acc-welcome">
              <div className="acc-avatar-lg">{initials}</div>
              <div>
                <div className="acc-name">{displayName}</div>
                <div className="acc-email">{user.email}</div>
              </div>
            </div>
            <div className="acc-stats">
              <div className="acc-stat">
                <span className="acc-stat-val">{requirements.length}</span>
                <span className="acc-stat-label">Requirements</span>
              </div>
              <div className="acc-stat">
                <span className="acc-stat-val">{offers.length}</span>
                <span className="acc-stat-label">Offers</span>
              </div>
              <div className="acc-stat">
                <span className="acc-stat-val">{savedProperties.length}</span>
                <span className="acc-stat-label">Saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="acc-tabs-bar">
          <div className="acc-tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`acc-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tab === 'Offers' && offers.length > 0 && <span className="tab-badge">{offers.length}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="acc-content">
          {dataLoading ? (
            <div className="acc-loading">Loading your data…</div>
          ) : (
            <>
              {/* REQUIREMENTS TAB */}
              {activeTab === 'Requirements' && (
                <div>
                  <div className="tab-header">
                    <h2 className="tab-title">My Posted Requirements</h2>
                    <Link href="/post" className="tab-action">+ New requirement</Link>
                  </div>
                  {requirements.length === 0 ? (
                    <EmptyState
                      icon="📋"
                      title="No requirements yet"
                      desc="Post your first property requirement and let sellers come to you."
                      cta="Post a requirement"
                      href="/post"
                    />
                  ) : (
                    <div className="req-list">
                      {requirements.map(req => (
                        <div key={req.id} className="req-card">
                          <div className="req-card-top">
                            <div>
                              <div className="req-tag">{req.property_type || 'Property'}</div>
                              <div className="req-title">{req.title || `${req.bedrooms || '?'}-bed in ${req.suburb || 'Unknown'}`}</div>
                              <div className="req-location">◎ {req.suburb || '—'}, {req.state || 'VIC'}</div>
                            </div>
                            <div className="req-budget">{req.budget_min && req.budget_max ? `$${(req.budget_min/1e6).toFixed(1)}M – $${(req.budget_max/1e6).toFixed(1)}M` : req.budget || '—'}</div>
                          </div>
                          <div className="req-specs">
                            {req.bedrooms && <span className="req-spec">{req.bedrooms} bed</span>}
                            {req.bathrooms && <span className="req-spec">{req.bathrooms} bath</span>}
                            {req.car_spaces && <span className="req-spec">{req.car_spaces} car</span>}
                          </div>
                          <div className="req-card-foot">
                            <span className="req-date">Posted {new Date(req.created_at).toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' })}</span>
                            <button className="req-delete" onClick={() => handleDeleteRequirement(req.id)}>Remove</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* OFFERS TAB */}
              {activeTab === 'Offers' && (
                <div>
                  <div className="tab-header">
                    <h2 className="tab-title">Offers Received</h2>
                  </div>
                  {offers.length === 0 ? (
                    <EmptyState
                      icon="🔍"
                      title="No offers yet"
                      desc="Once sellers match your requirements, their offers will appear here."
                      cta="View your requirements"
                      onClick={() => setActiveTab('Requirements')}
                    />
                  ) : (
                    <div className="req-list">
                      {offers.map(offer => (
                        <div key={offer.id} className="req-card">
                          <div className="req-card-top">
                            <div>
                              <div className="req-tag" style={{ background: '#e8f5e9', color: '#2e7d32' }}>Offer</div>
                              <div className="req-title">{offer.property_address || 'Property offer'}</div>
                              <div className="req-location">◎ {offer.suburb || '—'}</div>
                            </div>
                            <div className="req-budget">{offer.price ? `$${Number(offer.price).toLocaleString()}` : '—'}</div>
                          </div>
                          <div className="req-card-foot">
                            <span className="req-date">Received {new Date(offer.created_at).toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' })}</span>
                            <span className={`offer-status offer-status--${offer.status || 'new'}`}>{offer.status || 'New'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SAVED TAB */}
              {activeTab === 'Saved' && (
                <div>
                  <div className="tab-header">
                    <h2 className="tab-title">Saved Properties</h2>
                  </div>
                  {savedProperties.length === 0 ? (
                    <EmptyState
                      icon="🏡"
                      title="No saved properties"
                      desc="Browse the marketplace and save properties that catch your eye."
                      cta="Browse marketplace"
                      href="/marketplace"
                    />
                  ) : (
                    <div className="req-list">
                      {savedProperties.map(prop => (
                        <div key={prop.id} className="req-card">
                          <div className="req-card-top">
                            <div>
                              <div className="req-tag">Saved</div>
                              <div className="req-title">{prop.property_title || prop.address || 'Saved property'}</div>
                              <div className="req-location">◎ {prop.suburb || '—'}</div>
                            </div>
                            <div className="req-budget">{prop.price ? `$${Number(prop.price).toLocaleString()}` : '—'}</div>
                          </div>
                          <div className="req-card-foot">
                            <span className="req-date">Saved {new Date(prop.created_at).toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' })}</span>
                            <button className="req-delete" onClick={() => handleUnsave(prop.id)}>Remove</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'Settings' && (
                <div>
                  <div className="tab-header">
                    <h2 className="tab-title">Account Settings</h2>
                  </div>
                  <div className="settings-card">
                    <h3 className="settings-section-title">Personal details</h3>
                    <form onSubmit={handleSaveProfile}>
                      <div className="settings-field">
                        <label className="settings-label">Full name</label>
                        <input
                          className="settings-input"
                          type="text"
                          value={profileForm.full_name}
                          onChange={e => setProfileForm(p => ({ ...p, full_name: e.target.value }))}
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="settings-field">
                        <label className="settings-label">Email address</label>
                        <input className="settings-input" type="email" value={user.email} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                        <span className="settings-hint">Email cannot be changed here.</span>
                      </div>
                      <div className="settings-field">
                        <label className="settings-label">Phone number</label>
                        <input
                          className="settings-input"
                          type="tel"
                          value={profileForm.phone}
                          onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                          placeholder="04xx xxx xxx"
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button className="settings-save" type="submit" disabled={saving}>
                          {saving ? 'Saving…' : 'Save changes'}
                        </button>
                        {saveMsg && <span className="settings-msg">{saveMsg}</span>}
                      </div>
                    </form>
                  </div>

                  <div className="settings-card" style={{ marginTop: '1px' }}>
                    <h3 className="settings-section-title">Danger zone</h3>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#4a4540', marginBottom: '1rem', fontWeight: 300 }}>
                      Sign out of your account on this device.
                    </p>
                    <button className="settings-danger" onClick={signOut}>Sign out</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

function EmptyState({ icon, title, desc, cta, href, onClick }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-desc">{desc}</p>
      {href ? (
        <Link href={href} className="empty-cta">{cta}</Link>
      ) : (
        <button className="empty-cta" onClick={onClick}>{cta}</button>
      )}
    </div>
  )
}

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
    --gold: #b8924a; --gold-light: #d4aa6a; --gold-pale: #f5ecd8; --border: #e8e0d0;
    --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
  }
  body { background: var(--cream); color: var(--ink); font-family: var(--sans); }

  /* NAV */
  .acc-nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.1rem 3rem;
    background: rgba(250,248,243,0.95); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .acc-logo { font-family: var(--serif); font-size: 1.3rem; font-weight: 600; color: var(--ink); text-decoration: none; }
  .acc-logo span { color: var(--gold); }
  .acc-nav-right { display: flex; align-items: center; gap: 1.25rem; }
  .acc-nav-post {
    font-family: var(--sans); font-size: 12px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--cream); background: var(--ink);
    border: 1px solid var(--ink); padding: 8px 16px; border-radius: 2px;
    text-decoration: none; transition: all 0.2s;
  }
  .acc-nav-post:hover { background: var(--gold); border-color: var(--gold); }
  .acc-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: var(--gold); color: var(--cream);
    font-family: var(--sans); font-size: 12px; font-weight: 500;
    display: flex; align-items: center; justify-content: center;
    cursor: default;
  }
  .acc-signout {
    font-family: var(--sans); font-size: 12px; color: var(--ink-light);
    background: none; border: none; cursor: pointer;
    padding: 0; transition: color 0.15s;
  }
  .acc-signout:hover { color: var(--gold); }

  /* HEADER BAND */
  .acc-header {
    background: var(--ink); padding: 2.5rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .acc-header-inner {
    max-width: 900px; margin: 0 auto; padding: 0 3rem;
    display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap;
  }
  .acc-welcome { display: flex; align-items: center; gap: 1.25rem; }
  .acc-avatar-lg {
    width: 52px; height: 52px; border-radius: 50%;
    background: var(--gold); color: var(--cream);
    font-family: var(--sans); font-size: 18px; font-weight: 500;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .acc-name { font-family: var(--serif); font-size: 1.6rem; font-weight: 300; color: var(--cream); line-height: 1.1; }
  .acc-email { font-family: var(--sans); font-size: 12px; color: rgba(250,248,243,0.5); margin-top: 3px; }
  .acc-stats { display: flex; gap: 2rem; }
  .acc-stat { text-align: center; }
  .acc-stat-val { display: block; font-family: var(--serif); font-size: 2rem; font-weight: 300; color: var(--gold); line-height: 1; }
  .acc-stat-label { display: block; font-family: var(--sans); font-size: 11px; color: rgba(250,248,243,0.45); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }

  /* TABS */
  .acc-tabs-bar {
    background: var(--warm-white); border-bottom: 1px solid var(--border);
    position: sticky; top: 57px; z-index: 90;
  }
  .acc-tabs {
    max-width: 900px; margin: 0 auto; padding: 0 3rem;
    display: flex; gap: 0;
  }
  .acc-tab {
    font-family: var(--sans); font-size: 13px; font-weight: 400;
    color: var(--ink-light); background: none; border: none; cursor: pointer;
    padding: 1rem 1.25rem; border-bottom: 2px solid transparent;
    transition: all 0.15s; display: flex; align-items: center; gap: 6px;
  }
  .acc-tab:hover { color: var(--ink); }
  .acc-tab.active { color: var(--ink); border-bottom-color: var(--gold); font-weight: 500; }
  .tab-badge {
    background: var(--gold); color: var(--cream);
    font-size: 10px; font-weight: 500; padding: 1px 6px; border-radius: 10px;
  }

  /* CONTENT */
  .acc-main { min-height: 100vh; }
  .acc-content { max-width: 900px; margin: 0 auto; padding: 2.5rem 3rem 5rem; }
  .acc-loading { font-family: var(--sans); font-size: 13px; color: var(--ink-light); padding: 3rem 0; }

  .tab-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
  .tab-title { font-family: var(--serif); font-size: 1.5rem; font-weight: 300; color: var(--ink); }
  .tab-action {
    font-family: var(--sans); font-size: 12px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--gold); text-decoration: none;
    border: 1px solid var(--gold); padding: 7px 14px; border-radius: 2px;
    transition: all 0.15s;
  }
  .tab-action:hover { background: var(--gold); color: var(--cream); }

  /* REQ CARDS */
  .req-list { display: flex; flex-direction: column; gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .req-card { background: var(--warm-white); padding: 1.5rem; }
  .req-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.75rem; }
  .req-tag {
    font-family: var(--sans); font-size: 10px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--gold); background: var(--gold-pale);
    padding: 3px 8px; border-radius: 2px; display: inline-block; margin-bottom: 0.4rem;
  }
  .req-title { font-family: var(--serif); font-size: 1.2rem; color: var(--ink); font-weight: 400; margin-bottom: 3px; }
  .req-location { font-family: var(--sans); font-size: 12px; color: var(--ink-light); }
  .req-budget { font-family: var(--serif); font-size: 1.2rem; color: var(--gold); font-weight: 400; white-space: nowrap; }
  .req-specs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
  .req-spec {
    font-family: var(--sans); font-size: 11px; color: var(--ink-light);
    background: var(--cream); border: 1px solid var(--border);
    padding: 2px 8px; border-radius: 2px;
  }
  .req-card-foot { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 0.75rem; }
  .req-date { font-family: var(--sans); font-size: 12px; color: #bbb; }
  .req-delete {
    font-family: var(--sans); font-size: 12px; color: #c0392b;
    background: none; border: none; cursor: pointer; padding: 0; transition: opacity 0.15s;
  }
  .req-delete:hover { opacity: 0.7; }
  .offer-status {
    font-family: var(--sans); font-size: 11px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 2px;
  }
  .offer-status--new { background: #e3f2fd; color: #1565c0; }
  .offer-status--viewed { background: var(--gold-pale); color: var(--gold); }
  .offer-status--accepted { background: #e8f5e9; color: #2e7d32; }

  /* SETTINGS */
  .settings-card { background: var(--warm-white); border: 1px solid var(--border); padding: 2rem; }
  .settings-section-title { font-family: var(--serif); font-size: 1.1rem; font-weight: 400; color: var(--ink); margin-bottom: 1.5rem; }
  .settings-field { margin-bottom: 1.25rem; }
  .settings-label {
    display: block; font-family: var(--sans); font-size: 11px;
    font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--ink-light); margin-bottom: 6px;
  }
  .settings-input {
    width: 100%; font-family: var(--sans); font-size: 14px; color: var(--ink);
    background: var(--cream); border: 1px solid var(--border);
    border-radius: 2px; padding: 10px 14px; outline: none; transition: border-color 0.15s;
  }
  .settings-input:focus { border-color: var(--gold); }
  .settings-hint { font-family: var(--sans); font-size: 11px; color: #bbb; margin-top: 5px; display: block; }
  .settings-save {
    font-family: var(--sans); font-size: 12px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--cream); background: var(--ink);
    border: 1px solid var(--ink); border-radius: 2px;
    padding: 10px 24px; cursor: pointer; transition: all 0.2s;
  }
  .settings-save:hover { background: var(--gold); border-color: var(--gold); }
  .settings-save:disabled { opacity: 0.6; cursor: not-allowed; }
  .settings-msg { font-family: var(--sans); font-size: 13px; color: #2e7d32; }
  .settings-danger {
    font-family: var(--sans); font-size: 12px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: #c0392b; background: none;
    border: 1px solid #c0392b; border-radius: 2px;
    padding: 10px 24px; cursor: pointer; transition: all 0.2s;
  }
  .settings-danger:hover { background: #c0392b; color: white; }

  /* EMPTY STATE */
  .empty-state {
    text-align: center; padding: 5rem 2rem;
    background: var(--warm-white); border: 1px solid var(--border);
  }
  .empty-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .empty-title { font-family: var(--serif); font-size: 1.4rem; font-weight: 300; color: var(--ink); margin-bottom: 0.5rem; }
  .empty-desc { font-family: var(--sans); font-size: 14px; color: var(--ink-light); font-weight: 300; line-height: 1.6; margin-bottom: 1.75rem; }
  .empty-cta {
    font-family: var(--sans); font-size: 12px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--cream); background: var(--ink);
    border: 1px solid var(--ink); border-radius: 2px;
    padding: 12px 24px; text-decoration: none; cursor: pointer;
    display: inline-block; transition: all 0.2s;
  }
  .empty-cta:hover { background: var(--gold); border-color: var(--gold); }

  @media (max-width: 768px) {
    .acc-nav { padding: 1rem 1.5rem; }
    .acc-header-inner { padding: 0 1.5rem; flex-direction: column; }
    .acc-tabs { padding: 0 1.5rem; overflow-x: auto; }
    .acc-content { padding: 2rem 1.5rem 4rem; }
    .acc-stats { gap: 1.5rem; }
  }
`