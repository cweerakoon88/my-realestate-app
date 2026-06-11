'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'

const TABS = ['Requirements', 'Listings', 'Offers', 'Saved', 'Settings']

const PROXIMITY_OPTIONS = [
  { id: 'school', label: '🏫 Near schools' },
  { id: 'shops', label: '🛒 Near shops' },
  { id: 'train', label: '🚂 Near train station' },
  { id: 'bus', label: '🚌 Near bus stop' },
  { id: 'park', label: '🌳 Near parks' },
  { id: 'beach', label: '🏖️ Near beach' },
  { id: 'hospital', label: '🏥 Near hospital' },
  { id: 'cafe', label: '☕ Near cafes & restaurants' },
  { id: 'highway', label: '🛣️ Easy highway access' },
  { id: 'cbd', label: '🏙️ Close to CBD' },
]

// ── EDIT REQUIREMENT MODAL ─────────────────────────────────────────────
function EditRequirementModal({ req, onSave, onClose, supabase }) {
  const [form, setForm] = useState({
    location: req.location || '',
    property_type: req.property_type || '',
    bedrooms: req.bedrooms ? String(req.bedrooms) : '',
    bathrooms: req.bathrooms ? String(req.bathrooms) : '',
    budget_min: req.budget_min ? String(req.budget_min) : '',
    budget_max: req.budget_max ? String(req.budget_max) : '',
    mobile_number: req.mobile_number || '',
    notes: req.notes || '',
  })
  const [proximity, setProximity] = useState(req.proximity_preferences || [])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    setError('')
  }

  function toggleProximity(id) {
    setProximity(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
  }

  async function handleSave(e) {
    e.preventDefault()
    if (!form.location.trim()) { setError('Suburb is required'); return }
    if (!form.property_type) { setError('Property type is required'); return }
    if (!form.budget_max) { setError('Maximum budget is required'); return }

    setSaving(true)
    const { error: updateError } = await supabase
      .from('requirements')
      .update({
        location: form.location.trim(),
        property_type: form.property_type,
        bedrooms: form.bedrooms ? parseInt(form.bedrooms) : null,
        bathrooms: form.bathrooms ? parseInt(form.bathrooms) : null,
        budget_min: form.budget_min ? parseInt(form.budget_min) : null,
        budget_max: parseInt(form.budget_max),
        mobile_number: form.mobile_number.trim() || null,
        notes: form.notes.trim() || null,
        proximity_preferences: proximity,
        req_status: 'pending',
      })
      .eq('id', req.id)

    setSaving(false)
    if (updateError) {
      setError('Failed to save. Please try again.')
    } else {
      // Notify admin that a requirement needs re-review
      try {
        await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'System',
            email: 'hello@propoffer.com.au',
            service: '🔄 Requirement edited — needs re-review',
            message: `A buyer has edited their requirement and it has been reset to pending review.\n\nRequirement ID: ${req.id}\nLocation: ${form.location}\nProperty type: ${form.property_type}\nBudget: $${form.budget_min || '?'} – $${form.budget_max}\n\nPlease log in to the admin dashboard to approve or reject.`,
          }),
        })
      } catch (_) { /* non-blocking */ }
      onSave()
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 1.5rem 0' }}>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.4rem', color: '#1a1714', fontWeight: '400' }}>Edit requirement</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', color: '#aaa', cursor: 'pointer', padding: '4px 8px' }}>✕</button>
        </div>

        <div style={{ padding: '0.75rem 1.5rem', background: '#fff8f0', margin: '1rem 1.5rem 0', borderRadius: '8px', border: '1px solid #e8d0a0', fontFamily: 'system-ui,sans-serif', fontSize: '12px', color: '#7a5c00' }}>
          ℹ️ Editing your requirement will reset it to <strong>pending review</strong>. Our team will re-approve it shortly.
        </div>

        <form onSubmit={handleSave} style={{ padding: '1.25rem 1.5rem 1.5rem' }}>

          <div style={mfs.sectionTitle}>Property details</div>

          <div style={mfs.field}>
            <label style={mfs.label}>Suburb / location *</label>
            <input style={mfs.input} name="location" value={form.location} onChange={handleChange} placeholder="e.g. Richmond, Melbourne" />
          </div>

          <div style={mfs.row}>
            <div style={mfs.field}>
              <label style={mfs.label}>Property type *</label>
              <select style={mfs.input} name="property_type" value={form.property_type} onChange={handleChange}>
                <option value="">Select...</option>
                <option>House</option><option>Apartment</option><option>Townhouse</option><option>Land</option><option>Commercial</option>
              </select>
            </div>
            <div style={mfs.field}>
              <label style={mfs.label}>Bedrooms</label>
              <select style={mfs.input} name="bedrooms" value={form.bedrooms} onChange={handleChange}>
                <option value="">Any</option>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}{n===5?'+':''}</option>)}
              </select>
            </div>
          </div>

          <div style={mfs.row}>
            <div style={mfs.field}>
              <label style={mfs.label}>Bathrooms</label>
              <select style={mfs.input} name="bathrooms" value={form.bathrooms} onChange={handleChange}>
                <option value="">Any</option>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n}{n===4?'+':''}</option>)}
              </select>
            </div>
            <div style={mfs.field}>
              <label style={mfs.label}>Mobile number</label>
              <input style={mfs.input} name="mobile_number" value={form.mobile_number} onChange={handleChange} placeholder="e.g. 0412 345 678" />
            </div>
          </div>

          <div style={{ ...mfs.sectionTitle, marginTop: '1rem' }}>Budget</div>
          <div style={mfs.row}>
            <div style={mfs.field}>
              <label style={mfs.label}>Minimum ($)</label>
              <input style={mfs.input} name="budget_min" type="number" value={form.budget_min} onChange={handleChange} placeholder="e.g. 500000" />
            </div>
            <div style={mfs.field}>
              <label style={mfs.label}>Maximum ($) *</label>
              <input style={mfs.input} name="budget_max" type="number" value={form.budget_max} onChange={handleChange} placeholder="e.g. 800000" />
            </div>
          </div>

          <div style={{ ...mfs.sectionTitle, marginTop: '1rem' }}>Proximity preferences</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
            {PROXIMITY_OPTIONS.map(opt => (
              <button key={opt.id} type="button" onClick={() => toggleProximity(opt.id)}
                style={{ fontFamily: 'system-ui,sans-serif', fontSize: '12px', padding: '6px 12px', borderRadius: '20px', border: `1px solid ${proximity.includes(opt.id) ? '#1a1714' : '#ddd'}`, background: proximity.includes(opt.id) ? '#1a1714' : '#fafafa', color: proximity.includes(opt.id) ? '#fff' : '#555', cursor: 'pointer', transition: 'all 0.15s' }}>
                {opt.label}
              </button>
            ))}
          </div>

          <div style={mfs.field}>
            <label style={mfs.label}>Additional notes</label>
            <textarea style={{ ...mfs.input, height: '80px', resize: 'vertical' }} name="notes" value={form.notes} onChange={handleChange} placeholder="Anything else sellers should know..." />
          </div>

          {error && <div style={{ color: '#c0392b', fontSize: '13px', fontFamily: 'system-ui,sans-serif', background: '#fdf0f0', padding: '8px 12px', borderRadius: '6px', marginBottom: '1rem' }}>⚠ {error}</div>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', fontFamily: 'system-ui,sans-serif', cursor: 'pointer', color: '#666' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '10px 24px', background: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '14px', fontFamily: 'system-ui,sans-serif', fontWeight: '500', color: '#fff', cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
              {saving ? 'Saving...' : 'Save changes →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const mfs = {
  sectionTitle: { fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#bbb', marginBottom: '10px', fontWeight: '400' },
  field: { marginBottom: '10px', flex: 1 },
  label: { display: 'block', fontSize: '12px', fontWeight: '500', color: '#555', fontFamily: 'system-ui,sans-serif', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.06em' },
  input: { padding: '9px 12px', border: '1px solid #ddd', borderRadius: '7px', fontSize: '14px', fontFamily: 'system-ui,sans-serif', color: '#1a1a1a', background: '#fafafa', outline: 'none', width: '100%', boxSizing: 'border-box' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
}

// ── MAIN ACCOUNT PAGE ──────────────────────────────────────────────────
export default function AccountPage() {
  const { user, loading, signOut, supabase } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Requirements')
  const [requirements, setRequirements] = useState([])
  const [myListings, setMyListings] = useState([])
  const [savedProperties, setSavedProperties] = useState([])
  const [offers, setOffers] = useState([])
  const [profile, setProfile] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [profileForm, setProfileForm] = useState({ full_name: '', phone: '' })
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [editingReq, setEditingReq] = useState(null)
  const [editSuccess, setEditSuccess] = useState(null)

  useEffect(() => {
    if (!loading && !user) router.push('/')
  }, [user, loading])

  useEffect(() => {
    if (!user) return
    fetchAllData()
  }, [user])

  async function fetchAllData() {
    setDataLoading(true)
    const [reqRes, savedRes, offersRes, profileRes, listingsRes] = await Promise.all([
      supabase.from('requirements').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('saved_properties').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('offers').select('*').eq('buyer_id', user.id).order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('listings').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    ])
    setRequirements(reqRes.data || [])
    setSavedProperties(savedRes.data || [])
    setOffers(offersRes.data || [])
    setMyListings(listingsRes.data || [])
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
      id: user.id, email: user.email,
      full_name: profileForm.full_name, phone: profileForm.phone,
      updated_at: new Date().toISOString(),
    })
    setSaving(false)
    setSaveMsg(error ? 'Error saving.' : 'Profile saved!')
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

  function handleEditSaved(reqId) {
    fetchAllData()
    setEditingReq(null)
    setEditSuccess(reqId)
    setTimeout(() => setEditSuccess(null), 3000)
  }

  function statusBadge(status) {
    const styles = {
      active: { background: '#f0faf4', color: '#2d6a4f', border: '1px solid #b7e4c7', label: '✅ Active' },
      pending: { background: '#fff8f0', color: '#b8924a', border: '1px solid #e8d0a0', label: '⏳ Pending review' },
      rejected: { background: '#fdf0f0', color: '#c0392b', border: '1px solid #f5c6c2', label: '❌ Not approved' },
    }
    const s = styles[status] || styles.pending
    return (
      <span style={{ fontSize: '11px', fontFamily: 'system-ui,sans-serif', background: s.background, color: s.color, border: s.border, borderRadius: '20px', padding: '2px 10px', fontWeight: '500' }}>
        {s.label}
      </span>
    )
  }

  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', fontFamily:'DM Sans, sans-serif', color:'#4a4540' }}>Loading…</div>
  if (!user) return null

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'Buyer'
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <>
      <style>{pageStyles}</style>

      {editingReq && (
        <EditRequirementModal
          req={editingReq}
          supabase={supabase}
          onClose={() => setEditingReq(null)}
          onSave={() => handleEditSaved(editingReq.id)}
        />
      )}

      <nav className="acc-nav">
        <Link href="/" className="acc-logo">Prop<span>Offer</span></Link>
        <div className="acc-nav-right">
          <Link href="/post" className="acc-nav-post">+ Post</Link>
          <div className="acc-avatar" title={displayName}>{initials}</div>
          <button className="acc-signout" onClick={signOut}>Sign out</button>
        </div>
      </nav>

      <main className="acc-main">
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
              <div className="acc-stat"><span className="acc-stat-val">{requirements.length}</span><span className="acc-stat-label">Requirements</span></div>
              <div className="acc-stat"><span className="acc-stat-val">{myListings.length}</span><span className="acc-stat-label">Listings</span></div>
              <div className="acc-stat"><span className="acc-stat-val">{offers.length}</span><span className="acc-stat-label">Offers</span></div>
              <div className="acc-stat"><span className="acc-stat-val">{savedProperties.length}</span><span className="acc-stat-label">Saved</span></div>
            </div>
          </div>
        </div>

        <div className="acc-tabs-bar">
          <div className="acc-tabs">
            {TABS.map(tab => (
              <button key={tab} className={`acc-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab}
                {tab === 'Offers' && offers.length > 0 && <span className="tab-badge">{offers.length}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="acc-content">
          {dataLoading ? <div className="acc-loading">Loading your data…</div> : (
            <>
              {activeTab === 'Requirements' && (
                <div>
                  <div className="tab-header">
                    <h2 className="tab-title">My Requirements</h2>
                    <Link href="/post" className="tab-action">+ New</Link>
                  </div>
                  {requirements.length === 0 ? (
                    <EmptyState icon="📋" title="No requirements yet" desc="Post your first property requirement and let sellers come to you." cta="Post a requirement" href="/post" />
                  ) : (
                    <div className="req-list">
                      {requirements.map(req => (
                        <div key={req.id} className="req-card">
                          {editSuccess === req.id && (
                            <div style={{ background: '#f0faf4', border: '1px solid #b7e4c7', borderRadius: '6px', padding: '8px 12px', marginBottom: '10px', fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#2d6a4f' }}>
                              ✅ Requirement updated — pending review
                            </div>
                          )}
                          <div className="req-card-top">
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                                <div className="req-tag">{req.property_type || 'Property'}</div>
                                {statusBadge(req.req_status)}
                              </div>
                              <div className="req-title">{req.title || `${req.bedrooms || '?'}-bed ${req.property_type || 'property'} in ${req.location || '—'}`}</div>
                              <div className="req-location">◎ {req.location || '—'}</div>
                            </div>
                            <div className="req-budget">{req.budget_min && req.budget_max ? `$${(req.budget_min/1e6).toFixed(1)}M–$${(req.budget_max/1e6).toFixed(1)}M` : req.budget || '—'}</div>
                          </div>
                          <div className="req-specs">
                            {req.bedrooms && <span className="req-spec">{req.bedrooms} bed</span>}
                            {req.bathrooms && <span className="req-spec">{req.bathrooms} bath</span>}
                            {req.proximity_preferences?.length > 0 && req.proximity_preferences.slice(0, 3).map(p => (
                              <span key={p} className="req-spec">{p}</span>
                            ))}
                          </div>
                          {req.notes && (
                            <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#888', marginBottom: '0.75rem', lineHeight: 1.5, fontStyle: 'italic' }}>
                              "{req.notes.length > 100 ? req.notes.substring(0, 100) + '...' : req.notes}"
                            </div>
                          )}
                          <div className="req-card-foot">
                            <span className="req-date">{new Date(req.created_at).toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' })}</span>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <button
                                className="req-edit"
                                onClick={() => setEditingReq(req)}
                              >
                                ✏️ Edit
                              </button>
                              <button className="req-delete" onClick={() => handleDeleteRequirement(req.id)}>Remove</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Listings' && (
                <div>
                  <div className="tab-header">
                    <h2 className="tab-title">My Listings</h2>
                    <a href="/marketplace" className="tab-action">+ New listing</a>
                  </div>
                  {myListings.length === 0 ? (
                    <EmptyState icon="🏷️" title="No listings yet" desc="List a property on the marketplace and reach buyers directly." cta="List a property" href="/marketplace" />
                  ) : (
                    <div className="req-list">
                      {myListings.map(listing => (
                        <div key={listing.id} className="req-card">
                          <div className="req-card-top">
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                                <div className="req-tag" style={{ background: '#e8f4fd', color: '#1a6fa8' }}>{listing.property_type || 'Property'}</div>
                                {statusBadge(listing.status === 'pending_review' ? 'pending' : listing.status)}
                              </div>
                              <div className="req-title">{listing.title}</div>
                              <div className="req-location">◎ {listing.location || '—'}</div>
                            </div>
                            <div className="req-budget">
                              {listing.asking_price ? `$${Number(listing.asking_price).toLocaleString('en-AU')}` : '—'}
                            </div>
                          </div>
                          <div className="req-specs">
                            {listing.bedrooms && <span className="req-spec">{listing.bedrooms} bed</span>}
                            {listing.bathrooms && <span className="req-spec">{listing.bathrooms} bath</span>}
                            {listing.land_size && <span className="req-spec">{listing.land_size.toLocaleString()}m²</span>}
                            {listing.section32_ready && <span className="req-spec">Section 32 ready</span>}
                          </div>
                          {listing.admin_notes && (
                            <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#888', marginBottom: '0.75rem', lineHeight: 1.5, fontStyle: 'italic' }}>
                              Admin note: "{listing.admin_notes}"
                            </div>
                          )}
                          <div className="req-card-foot">
                            <span className="req-date">{new Date(listing.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                              {listing.images?.length > 0 && (
                                <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: '12px', color: '#aaa' }}>📷 {listing.images.length} photo{listing.images.length !== 1 ? 's' : ''}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}


                <div>
                  <div className="tab-header"><h2 className="tab-title">Offers Received</h2></div>
                  {offers.length === 0 ? (
                    <EmptyState icon="🔍" title="No offers yet" desc="Once sellers match your requirements, their offers will appear here." cta="View requirements" onClick={() => setActiveTab('Requirements')} />
                  ) : (
                    <div className="req-list">
                      {offers.map(offer => (
                        <div key={offer.id} className="req-card">
                          <div className="req-card-top">
                            <div>
                              <div className="req-tag" style={{ background:'#e8f5e9', color:'#2e7d32' }}>Offer</div>
                              <div className="req-title">{offer.property_address || 'Property offer'}</div>
                              <div className="req-location">◎ {offer.suburb || '—'}</div>
                            </div>
                            <div className="req-budget">{offer.price ? `$${Number(offer.price).toLocaleString()}` : '—'}</div>
                          </div>
                          <div className="req-card-foot">
                            <span className="req-date">{new Date(offer.created_at).toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' })}</span>
                            <span className={`offer-status offer-status--${offer.offer_status || 'new'}`}>{offer.offer_status || 'New'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Saved' && (
                <div>
                  <div className="tab-header"><h2 className="tab-title">Saved Properties</h2></div>
                  {savedProperties.length === 0 ? (
                    <EmptyState icon="🏡" title="No saved properties" desc="Browse the marketplace and save properties that catch your eye." cta="Browse marketplace" href="/marketplace" />
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
                            <span className="req-date">{new Date(prop.created_at).toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' })}</span>
                            <button className="req-delete" onClick={() => handleUnsave(prop.id)}>Remove</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Settings' && (
                <div>
                  <div className="tab-header"><h2 className="tab-title">Account Settings</h2></div>
                  <div className="settings-card">
                    <h3 className="settings-section-title">Personal details</h3>
                    <form onSubmit={handleSaveProfile}>
                      <div className="settings-field">
                        <label className="settings-label">Full name</label>
                        <input className="settings-input" type="text" value={profileForm.full_name} onChange={e => setProfileForm(p => ({ ...p, full_name: e.target.value }))} placeholder="Your full name" />
                      </div>
                      <div className="settings-field">
                        <label className="settings-label">Email address</label>
                        <input className="settings-input" type="email" value={user.email} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                        <span className="settings-hint">Email cannot be changed here.</span>
                      </div>
                      <div className="settings-field">
                        <label className="settings-label">Phone number</label>
                        <input className="settings-input" type="tel" value={profileForm.phone} onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))} placeholder="04xx xxx xxx" />
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap' }}>
                        <button className="settings-save" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
                        {saveMsg && <span className="settings-msg">{saveMsg}</span>}
                      </div>
                    </form>
                  </div>
                  <div className="settings-card" style={{ marginTop:'1px' }}>
                    <h3 className="settings-section-title">Danger zone</h3>
                    <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'#4a4540', marginBottom:'1rem', fontWeight:300 }}>Sign out of your account on this device.</p>
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
      {href ? <Link href={href} className="empty-cta">{cta}</Link> : <button className="empty-cta" onClick={onClick}>{cta}</button>}
    </div>
  )
}

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; }
  :root {
    --cream: #faf8f3; --warm-white: #fffefb; --ink: #1a1714; --ink-light: #4a4540;
    --gold: #b8924a; --gold-pale: #f5ecd8; --border: #e8e0d0;
    --serif: 'Cormorant Garamond', Georgia, serif; --sans: 'DM Sans', sans-serif;
  }
  body { background: var(--cream); color: var(--ink); font-family: var(--sans); }
  .acc-nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 2rem; background: rgba(250,248,243,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
  .acc-logo { font-family: var(--serif); font-size: 1.3rem; font-weight: 600; color: var(--ink); text-decoration: none; }
  .acc-logo span { color: var(--gold); }
  .acc-nav-right { display: flex; align-items: center; gap: 1rem; }
  .acc-nav-post { font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--cream); background: var(--ink); border: 1px solid var(--ink); padding: 7px 14px; border-radius: 2px; text-decoration: none; transition: all 0.2s; }
  .acc-nav-post:hover { background: var(--gold); border-color: var(--gold); }
  .acc-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--gold); color: var(--cream); font-family: var(--sans); font-size: 12px; font-weight: 500; display: flex; align-items: center; justify-content: center; }
  .acc-signout { font-family: var(--sans); font-size: 12px; color: var(--ink-light); background: none; border: none; cursor: pointer; padding: 0; transition: color 0.15s; }
  .acc-signout:hover { color: var(--gold); }
  .acc-header { background: var(--ink); padding: 2rem 0; }
  .acc-header-inner { max-width: 900px; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
  .acc-welcome { display: flex; align-items: center; gap: 1rem; }
  .acc-avatar-lg { width: 48px; height: 48px; border-radius: 50%; background: var(--gold); color: var(--cream); font-family: var(--sans); font-size: 16px; font-weight: 500; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .acc-name { font-family: var(--serif); font-size: 1.4rem; font-weight: 300; color: var(--cream); line-height: 1.1; }
  .acc-email { font-family: var(--sans); font-size: 12px; color: rgba(250,248,243,0.5); margin-top: 3px; }
  .acc-stats { display: flex; gap: 1.5rem; }
  .acc-stat { text-align: center; }
  .acc-stat-val { display: block; font-family: var(--serif); font-size: 1.8rem; font-weight: 300; color: var(--gold); line-height: 1; }
  .acc-stat-label { display: block; font-family: var(--sans); font-size: 11px; color: rgba(250,248,243,0.45); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px; }
  .acc-tabs-bar { background: var(--warm-white); border-bottom: 1px solid var(--border); position: sticky; top: 55px; z-index: 90; overflow-x: auto; }
  .acc-tabs { max-width: 900px; margin: 0 auto; padding: 0 2rem; display: flex; gap: 0; min-width: max-content; }
  .acc-tab { font-family: var(--sans); font-size: 13px; font-weight: 400; color: var(--ink-light); background: none; border: none; cursor: pointer; padding: 0.9rem 1rem; border-bottom: 2px solid transparent; transition: all 0.15s; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
  .acc-tab:hover { color: var(--ink); }
  .acc-tab.active { color: var(--ink); border-bottom-color: var(--gold); font-weight: 500; }
  .tab-badge { background: var(--gold); color: var(--cream); font-size: 10px; font-weight: 500; padding: 1px 6px; border-radius: 10px; }
  .acc-main { min-height: 100vh; }
  .acc-content { max-width: 900px; margin: 0 auto; padding: 2rem 2rem 5rem; }
  .acc-loading { font-family: var(--sans); font-size: 13px; color: var(--ink-light); padding: 3rem 0; }
  .tab-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
  .tab-title { font-family: var(--serif); font-size: 1.4rem; font-weight: 300; color: var(--ink); }
  .tab-action { font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--gold); text-decoration: none; border: 1px solid var(--gold); padding: 7px 14px; border-radius: 2px; transition: all 0.15s; }
  .tab-action:hover { background: var(--gold); color: var(--cream); }
  .req-list { display: flex; flex-direction: column; gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .req-card { background: var(--warm-white); padding: 1.25rem; }
  .req-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem; }
  .req-tag { font-family: var(--sans); font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); background: var(--gold-pale); padding: 3px 8px; border-radius: 2px; display: inline-block; margin-bottom: 0.4rem; }
  .req-title { font-family: var(--serif); font-size: 1.1rem; color: var(--ink); font-weight: 400; margin-bottom: 3px; }
  .req-location { font-family: var(--sans); font-size: 12px; color: var(--ink-light); }
  .req-budget { font-family: var(--serif); font-size: 1.1rem; color: var(--gold); font-weight: 400; white-space: nowrap; flex-shrink: 0; }
  .req-specs { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
  .req-spec { font-family: var(--sans); font-size: 11px; color: var(--ink-light); background: var(--cream); border: 1px solid var(--border); padding: 2px 8px; border-radius: 2px; }
  .req-card-foot { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 0.75rem; }
  .req-date { font-family: var(--sans); font-size: 12px; color: #bbb; }
  .req-edit { font-family: var(--sans); font-size: 12px; color: var(--ink); background: none; border: 1px solid var(--border); border-radius: 4px; cursor: pointer; padding: 4px 10px; transition: all 0.15s; }
  .req-edit:hover { border-color: var(--gold); color: var(--gold); }
  .req-delete { font-family: var(--sans); font-size: 12px; color: #c0392b; background: none; border: none; cursor: pointer; padding: 0; }
  .offer-status { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; border-radius: 2px; }
  .offer-status--new { background: #e3f2fd; color: #1565c0; }
  .offer-status--viewed { background: var(--gold-pale); color: var(--gold); }
  .offer-status--accepted { background: #e8f5e9; color: #2e7d32; }
  .settings-card { background: var(--warm-white); border: 1px solid var(--border); padding: 1.5rem; }
  .settings-section-title { font-family: var(--serif); font-size: 1.1rem; font-weight: 400; color: var(--ink); margin-bottom: 1.25rem; }
  .settings-field { margin-bottom: 1.1rem; }
  .settings-label { display: block; font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-light); margin-bottom: 6px; }
  .settings-input { width: 100%; font-family: var(--sans); font-size: 14px; color: var(--ink); background: var(--cream); border: 1px solid var(--border); border-radius: 2px; padding: 10px 14px; outline: none; transition: border-color 0.15s; }
  .settings-input:focus { border-color: var(--gold); }
  .settings-hint { font-family: var(--sans); font-size: 11px; color: #bbb; margin-top: 5px; display: block; }
  .settings-save { font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--cream); background: var(--ink); border: 1px solid var(--ink); border-radius: 2px; padding: 10px 24px; cursor: pointer; transition: all 0.2s; }
  .settings-save:hover { background: var(--gold); border-color: var(--gold); }
  .settings-save:disabled { opacity: 0.6; cursor: not-allowed; }
  .settings-msg { font-family: var(--sans); font-size: 13px; color: #2e7d32; }
  .settings-danger { font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #c0392b; background: none; border: 1px solid #c0392b; border-radius: 2px; padding: 10px 24px; cursor: pointer; transition: all 0.2s; }
  .settings-danger:hover { background: #c0392b; color: white; }
  .empty-state { text-align: center; padding: 4rem 1.5rem; background: var(--warm-white); border: 1px solid var(--border); }
  .empty-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .empty-title { font-family: var(--serif); font-size: 1.4rem; font-weight: 300; color: var(--ink); margin-bottom: 0.5rem; }
  .empty-desc { font-family: var(--sans); font-size: 14px; color: var(--ink-light); font-weight: 300; line-height: 1.6; margin-bottom: 1.75rem; }
  .empty-cta { font-family: var(--sans); font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--cream); background: var(--ink); border: 1px solid var(--ink); border-radius: 2px; padding: 12px 24px; text-decoration: none; cursor: pointer; display: inline-block; transition: all 0.2s; }
  .empty-cta:hover { background: var(--gold); border-color: var(--gold); }
  @media (max-width: 768px) {
    .acc-nav { padding: 1rem 1.25rem; }
    .acc-signout { display: none; }
    .acc-header-inner { padding: 0 1.25rem; flex-direction: column; align-items: flex-start; gap: 1rem; }
    .acc-stats { gap: 1.5rem; }
    .acc-tabs { padding: 0 1.25rem; }
    .acc-content { padding: 1.5rem 1.25rem 4rem; }
    .req-card { padding: 1rem; }
    .req-budget { font-size: 0.95rem; }
    .settings-card { padding: 1.25rem; }
  }
`