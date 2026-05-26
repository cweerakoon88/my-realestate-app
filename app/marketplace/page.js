'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import NavBar from '@/components/NavBar'

function SellerPostForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    seller_name: '', seller_email: '', seller_phone: '',
    title: '', location: '', property_type: '', bedrooms: '',
    bathrooms: '', land_size: '', asking_price: '', description: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: null }))
  }

  function validate() {
    const e = {}
    if (!form.seller_name.trim()) e.seller_name = 'Required'
    if (!form.seller_email.trim()) e.seller_email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.seller_email)) e.seller_email = 'Invalid email'
    if (!form.title.trim()) e.title = 'Required'
    if (!form.location.trim()) e.location = 'Required'
    if (!form.property_type) e.property_type = 'Required'
    if (!form.asking_price) e.asking_price = 'Required'
    if (!form.description.trim()) e.description = 'Required'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }
    setLoading(true)
    const { error } = await supabase.from('listings').insert([{
      seller_name: form.seller_name.trim(),
      seller_email: form.seller_email.trim().toLowerCase(),
      seller_phone: form.seller_phone.trim() || null,
      title: form.title.trim(),
      location: form.location.trim(),
      property_type: form.property_type,
      bedrooms: form.bedrooms ? parseInt(form.bedrooms) : null,
      bathrooms: form.bathrooms ? parseInt(form.bathrooms) : null,
      land_size: form.land_size ? parseInt(form.land_size) : null,
      asking_price: parseInt(form.asking_price),
      description: form.description.trim(),
    }])
    setLoading(false)
    if (error) { setErrors({ form: 'Something went wrong. Please try again.' }); return }
    onSuccess()
  }

  return (
    <div style={fs.overlay}>
      <div style={fs.modal}>
        <div style={fs.modalHeader}>
          <h2 style={fs.modalTitle}>List your property</h2>
          <button style={fs.closeBtn} onClick={onCancel}>✕</button>
        </div>
        <form onSubmit={handleSubmit} noValidate style={fs.form}>
          <div style={fs.sectionTitle}>Your details</div>
          <div style={fs.row}>
            <FormField label="Full name" error={errors.seller_name}>
              <input style={fieldInput(errors.seller_name)} name="seller_name" placeholder="John Smith" value={form.seller_name} onChange={handleChange} />
            </FormField>
            <FormField label="Email" error={errors.seller_email}>
              <input style={fieldInput(errors.seller_email)} name="seller_email" type="email" placeholder="john@email.com" value={form.seller_email} onChange={handleChange} />
            </FormField>
          </div>
          <FormField label="Phone (optional)">
            <input style={fieldInput()} name="seller_phone" placeholder="e.g. 0412 345 678" value={form.seller_phone} onChange={handleChange} />
          </FormField>
          <div style={{ ...fs.sectionTitle, marginTop: '1.25rem' }}>Property details</div>
          <FormField label="Listing title" error={errors.title}>
            <input style={fieldInput(errors.title)} name="title" placeholder="e.g. Charming 3-bed home with north-facing garden" value={form.title} onChange={handleChange} />
          </FormField>
          <div style={fs.row}>
            <FormField label="Suburb / location" error={errors.location}>
              <input style={fieldInput(errors.location)} name="location" placeholder="e.g. Richmond, Melbourne" value={form.location} onChange={handleChange} />
            </FormField>
            <FormField label="Property type" error={errors.property_type}>
              <select style={fieldInput(errors.property_type)} name="property_type" value={form.property_type} onChange={handleChange}>
                <option value="">Select...</option>
                <option>House</option><option>Apartment</option>
                <option>Townhouse</option><option>Land</option><option>Commercial</option>
              </select>
            </FormField>
          </div>
          <div style={fs.row3}>
            <FormField label="Bedrooms">
              <select style={fieldInput()} name="bedrooms" value={form.bedrooms} onChange={handleChange}>
                <option value="">Any</option>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}{n===5?'+':''}</option>)}
              </select>
            </FormField>
            <FormField label="Bathrooms">
              <select style={fieldInput()} name="bathrooms" value={form.bathrooms} onChange={handleChange}>
                <option value="">Any</option>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n}{n===4?'+':''}</option>)}
              </select>
            </FormField>
            <FormField label="Land size (m²)">
              <input style={fieldInput()} name="land_size" type="number" placeholder="e.g. 450" value={form.land_size} onChange={handleChange} />
            </FormField>
          </div>
          <FormField label="Asking price ($)" error={errors.asking_price}>
            <input style={fieldInput(errors.asking_price)} name="asking_price" type="number" placeholder="e.g. 850000" value={form.asking_price} onChange={handleChange} />
          </FormField>
          <FormField label="Description" error={errors.description}>
            <textarea style={{ ...fieldInput(errors.description), height: '90px', resize: 'vertical' }} name="description" placeholder="Describe the property..." value={form.description} onChange={handleChange} />
          </FormField>
          {errors.form && <p style={fs.errorMsg}>{errors.form}</p>}
          <div style={fs.modalFooter}>
            <button type="button" style={fs.cancelBtn} onClick={onCancel}>Cancel</button>
            <button type="submit" style={fs.submitBtn} disabled={loading}>{loading ? 'Listing...' : 'List my property →'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function FormField({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
      <label style={{ fontSize: '13px', fontWeight: '500', color: '#333', fontFamily: 'system-ui,sans-serif' }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: '11px', color: '#c0392b', fontFamily: 'system-ui,sans-serif' }}>⚠ {error}</span>}
    </div>
  )
}

function fieldInput(err) {
  return { padding: '8px 12px', border: `1px solid ${err ? '#e74c3c' : '#ddd'}`, borderRadius: '7px', fontSize: '14px', fontFamily: 'system-ui,sans-serif', color: '#1a1a1a', background: err ? '#fff8f8' : '#fafafa', outline: 'none', width: '100%', boxSizing: 'border-box' }
}

function BuyerCard({ req }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div style={c.card}>
      <div style={c.cardTop}>
        <div style={c.cardLeft}>
          <span style={c.tag}>{req.property_type || 'Property'}</span>
          <h3 style={c.cardTitle}>{req.bedrooms ? `${req.bedrooms}-bed ` : ''}{req.property_type || 'Property'} in {req.location}</h3>
          <div style={c.cardMeta}>
            <span style={c.metaItem}>📍 {req.location}</span>
            {req.bedrooms && <span style={c.metaItem}>🛏 {req.bedrooms} bed</span>}
            {req.bathrooms && <span style={c.metaItem}>🚿 {req.bathrooms} bath</span>}
          </div>
        </div>
        <div style={c.cardRight}>
          <div style={c.budgetLabel}>Budget</div>
          <div style={c.budget}>{fmt(req.budget_min)} – {fmt(req.budget_max)}</div>
          <div style={c.postedDate}>{timeSince(req.created_at)}</div>
        </div>
      </div>
      {req.proximity_preferences?.length > 0 && (
        <div style={c.chips}>{req.proximity_preferences.map(p => <span key={p} style={c.chip}>{proximityLabel(p)}</span>)}</div>
      )}
      {expanded && (
        <div style={c.expanded}>
          <div style={c.expandRow}><span style={c.expandLabel}>Buyer</span><span style={c.expandVal}>{req.buyer_name || `${req.first_name || ''} ${req.last_name || ''}`.trim()}</span></div>
          {req.notes && <div style={c.expandRow}><span style={c.expandLabel}>Notes</span><span style={c.expandVal}>{req.notes}</span></div>}
          <a href={`mailto:${req.buyer_email}?subject=Property offer for your requirement in ${req.location}`} style={c.contactBtn}>✉ Contact this buyer</a>
        </div>
      )}
      <button style={c.expandBtn} onClick={() => setExpanded(e => !e)}>{expanded ? 'Show less ↑' : 'View details & contact ↓'}</button>
    </div>
  )
}

function ListingCard({ listing }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div style={c.card}>
      <div style={c.cardTop}>
        <div style={c.cardLeft}>
          <span style={{ ...c.tag, background: '#e8f4fd', color: '#1a6fa8' }}>{listing.property_type || 'Property'}</span>
          <h3 style={c.cardTitle}>{listing.title}</h3>
          <div style={c.cardMeta}>
            <span style={c.metaItem}>📍 {listing.location}</span>
            {listing.bedrooms && <span style={c.metaItem}>🛏 {listing.bedrooms} bed</span>}
            {listing.bathrooms && <span style={c.metaItem}>🚿 {listing.bathrooms} bath</span>}
          </div>
        </div>
        <div style={c.cardRight}>
          <div style={c.budgetLabel}>Asking price</div>
          <div style={{ ...c.budget, color: '#1a6fa8' }}>{fmt(listing.asking_price)}</div>
          <div style={c.postedDate}>{timeSince(listing.created_at)}</div>
        </div>
      </div>
      {expanded && (
        <div style={c.expanded}>
          <p style={{ fontSize: '14px', color: '#555', fontFamily: 'system-ui,sans-serif', lineHeight: 1.6, marginBottom: '1rem' }}>{listing.description}</p>
          <div style={c.expandRow}><span style={c.expandLabel}>Listed by</span><span style={c.expandVal}>{listing.seller_name}</span></div>
          <a href={`mailto:${listing.seller_email}?subject=Enquiry about ${listing.title}`} style={{ ...c.contactBtn, background: '#1a6fa8' }}>✉ Contact seller</a>
        </div>
      )}
      <button style={c.expandBtn} onClick={() => setExpanded(e => !e)}>{expanded ? 'Show less ↑' : 'View details & contact ↓'}</button>
    </div>
  )
}

export default function Marketplace() {
  const [tab, setTab] = useState('buyers')
  const [requirements, setRequirements] = useState([])
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showSellerForm, setShowSellerForm] = useState(false)
  const [sellerSuccess, setSellerSuccess] = useState(false)
  const [filterLocation, setFilterLocation] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterBeds, setFilterBeds] = useState('')

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    setLoading(true)
    const [reqRes, listRes] = await Promise.all([
      supabase.from('requirements').select('*').order('created_at', { ascending: false }),
      supabase.from('listings').select('*').order('created_at', { ascending: false }),
    ])
    if (reqRes.data) setRequirements(reqRes.data)
    if (listRes.data) setListings(listRes.data)
    setLoading(false)
  }

  function applyFilters(items) {
    return items.filter(item => {
      const loc = (item.location || '').toLowerCase()
      const type = (item.property_type || '').toLowerCase()
      const beds = item.bedrooms ? String(item.bedrooms) : ''
      if (filterLocation && !loc.includes(filterLocation.toLowerCase())) return false
      if (filterType && type !== filterType.toLowerCase()) return false
      if (filterBeds && beds !== filterBeds) return false
      return true
    })
  }

  const filteredReqs = applyFilters(requirements)
  const filteredListings = applyFilters(listings)

  return (
    <div style={p.page}>
      <NavBar />

      <div style={p.container}>
        <div style={p.header}>
          <h1 style={p.title}>Property Marketplace</h1>
          <p style={p.subtitle}>Browse buyer requirements or listed properties across Australia.</p>
        </div>

        <div style={p.tabBar}>
          <button style={tab === 'buyers' ? p.tabActive : p.tab} onClick={() => setTab('buyers')}>🏠 Buyers <span style={p.tabCount}>{requirements.length}</span></button>
          <button style={tab === 'sellers' ? p.tabActive : p.tab} onClick={() => setTab('sellers')}>🏷️ Sellers <span style={p.tabCount}>{listings.length}</span></button>
        </div>

        <div style={p.actionRow}>
          <div style={p.filters}>
            <input style={p.filterInput} placeholder="🔍 Filter by suburb..." value={filterLocation} onChange={e => setFilterLocation(e.target.value)} />
            <select style={p.filterSelect} value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="">All types</option>
              <option>house</option><option>apartment</option><option>townhouse</option><option>land</option><option>commercial</option>
            </select>
            <select style={p.filterSelect} value={filterBeds} onChange={e => setFilterBeds(e.target.value)}>
              <option value="">Any beds</option>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}{n===5?'+':''} bed</option>)}
            </select>
            {(filterLocation || filterType || filterBeds) && (
              <button style={p.clearBtn} onClick={() => { setFilterLocation(''); setFilterType(''); setFilterBeds('') }}>Clear</button>
            )}
          </div>
          {tab === 'buyers' && <Link href="/post" style={p.actionBtn}>+ Post requirement</Link>}
          {tab === 'sellers' && <button style={p.actionBtn} onClick={() => { setShowSellerForm(true); setSellerSuccess(false) }}>+ List a property</button>}
        </div>

        {loading ? <div style={p.loading}>Loading listings...</div> : (
          <>
            {tab === 'buyers' && (
              filteredReqs.length === 0 ? (
                <div style={p.empty}><div style={p.emptyIcon}>🏠</div><p style={p.emptyText}>No buyer requirements found.</p><Link href="/post" style={p.actionBtn}>Be the first to post</Link></div>
              ) : <div style={p.grid}>{filteredReqs.map(r => <BuyerCard key={r.id} req={r} />)}</div>
            )}
            {tab === 'sellers' && (
              filteredListings.length === 0 ? (
                <div style={p.empty}><div style={p.emptyIcon}>🏷️</div><p style={p.emptyText}>No properties listed yet.</p><button style={p.actionBtn} onClick={() => setShowSellerForm(true)}>List the first property</button></div>
              ) : <div style={p.grid}>{filteredListings.map(l => <ListingCard key={l.id} listing={l} />)}</div>
            )}
          </>
        )}
      </div>

      {showSellerForm && !sellerSuccess && (
        <SellerPostForm onCancel={() => setShowSellerForm(false)} onSuccess={() => { setSellerSuccess(true); fetchAll() }} />
      )}

      {sellerSuccess && (
        <div style={fs.overlay}>
          <div style={{ ...fs.modal, maxWidth: '420px', textAlign: 'center', padding: '2.5rem 2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '0.75rem' }}>Property listed!</h2>
            <p style={{ fontSize: '14px', color: '#666', fontFamily: 'system-ui,sans-serif', lineHeight: 1.6, marginBottom: '1.5rem' }}>Your property is now visible to buyers. They can contact you directly.</p>
            <div style={fs.teamNote}><span>👋</span><p style={{ fontSize: '13px', color: '#555', fontFamily: 'system-ui,sans-serif', margin: 0, lineHeight: 1.5 }}><strong>Melina & Mikayla</strong> will be in touch shortly.</p></div>
            <button style={fs.submitBtn} onClick={() => { setSellerSuccess(false); setShowSellerForm(false) }}>Back to marketplace</button>
          </div>
        </div>
      )}

      <footer style={{ padding: '2rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e8e0d0', fontFamily: 'system-ui,sans-serif', fontSize: '12px', color: '#bbb', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#4a4540' }}>Prop<span style={{ color: '#b8924a' }}>Match</span></div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[['/', 'Home'], ['/services', 'Services'], ['/pricing', 'Pricing'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: '#bbb', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
        <div>© 2025 PropMatch · Australia's buyer-first property platform</div>
      </footer>
    </div>
  )
}

function fmt(n) { return n ? '$' + Number(n).toLocaleString('en-AU') : '—' }
function timeSince(dateStr) {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}
function proximityLabel(id) {
  const map = { school: '🏫 Schools', shops: '🛒 Shops', train: '🚂 Train', bus: '🚌 Bus', park: '🌳 Parks', beach: '🏖️ Beach', hospital: '🏥 Hospital', cafe: '☕ Cafes', highway: '🛣️ Highway', cbd: '🏙️ CBD' }
  return map[id] || id
}

const p = {
  page: { minHeight: '100vh', background: '#f8f7f4', fontFamily: 'Georgia,serif' },
  container: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' },
  header: { marginBottom: '2rem', paddingTop: '1rem' },
  title: { fontSize: '2rem', fontWeight: '600', color: '#1a1a1a', margin: '0 0 6px', lineHeight: 1.2 },
  subtitle: { fontSize: '15px', color: '#666', margin: 0, fontFamily: 'system-ui,sans-serif', lineHeight: 1.5 },
  tabBar: { display: 'flex', gap: '4px', marginBottom: '1.25rem', background: '#fff', border: '1px solid #e8e0d0', borderRadius: '10px', padding: '4px' },
  tab: { flex: 1, padding: '10px', border: 'none', background: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontFamily: 'system-ui,sans-serif', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  tabActive: { flex: 1, padding: '10px', border: 'none', background: '#1a1a1a', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontFamily: 'system-ui,sans-serif', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '500' },
  tabCount: { background: 'rgba(255,255,255,0.2)', borderRadius: '10px', padding: '1px 7px', fontSize: '12px' },
  actionRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', flexWrap: 'wrap' },
  filters: { display: 'flex', gap: '8px', flex: 1, flexWrap: 'wrap' },
  filterInput: { padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', fontFamily: 'system-ui,sans-serif', background: '#fff', outline: 'none', minWidth: '160px', flex: 1 },
  filterSelect: { padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', fontFamily: 'system-ui,sans-serif', background: '#fff', outline: 'none', cursor: 'pointer' },
  clearBtn: { padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px', fontFamily: 'system-ui,sans-serif', background: '#fff', cursor: 'pointer', color: '#999' },
  actionBtn: { padding: '9px 18px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontFamily: 'system-ui,sans-serif', fontWeight: '500', cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap' },
  grid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  loading: { textAlign: 'center', padding: '4rem', color: '#aaa', fontFamily: 'system-ui,sans-serif', fontSize: '14px' },
  empty: { textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: '12px', border: '1px solid #e8e0d0' },
  emptyIcon: { fontSize: '2.5rem', marginBottom: '1rem' },
  emptyText: { fontSize: '15px', color: '#888', fontFamily: 'system-ui,sans-serif', marginBottom: '1.5rem' },
}
const c = {
  card: { background: '#fff', border: '1px solid #e8e0d0', borderRadius: '12px', padding: '1.25rem 1.5rem' },
  cardTop: { display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' },
  cardLeft: { flex: 1 }, cardRight: { textAlign: 'right', flexShrink: 0 },
  tag: { display: 'inline-block', fontSize: '11px', fontWeight: '500', fontFamily: 'system-ui,sans-serif', background: '#f5ecd8', color: '#9c7c4a', padding: '3px 9px', borderRadius: '20px', marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' },
  cardTitle: { fontFamily: 'Georgia,serif', fontSize: '1.15rem', fontWeight: '400', color: '#1a1a1a', margin: '0 0 8px', lineHeight: 1.3 },
  cardMeta: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  metaItem: { fontSize: '13px', color: '#888', fontFamily: 'system-ui,sans-serif' },
  budgetLabel: { fontSize: '11px', color: '#bbb', fontFamily: 'system-ui,sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' },
  budget: { fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#9c7c4a', fontWeight: '600' },
  postedDate: { fontSize: '11px', color: '#ccc', fontFamily: 'system-ui,sans-serif', marginTop: '4px' },
  chips: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' },
  chip: { fontSize: '11px', fontFamily: 'system-ui,sans-serif', background: '#f5f5f5', color: '#777', padding: '3px 9px', borderRadius: '20px', border: '1px solid #eee' },
  expanded: { marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f0ece4' },
  expandRow: { display: 'flex', gap: '1rem', marginBottom: '6px', fontFamily: 'system-ui,sans-serif', fontSize: '13px' },
  expandLabel: { color: '#bbb', minWidth: '60px', flexShrink: 0 }, expandVal: { color: '#555' },
  contactBtn: { display: 'inline-block', marginTop: '1rem', padding: '9px 18px', background: '#1a1a1a', color: '#fff', borderRadius: '8px', fontSize: '13px', fontFamily: 'system-ui,sans-serif', fontWeight: '500', textDecoration: 'none' },
  expandBtn: { marginTop: '1rem', padding: '6px 0', background: 'none', border: 'none', color: '#9c7c4a', fontSize: '13px', fontFamily: 'system-ui,sans-serif', cursor: 'pointer' },
}
const fs = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' },
  modal: { background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 1.5rem 0' },
  modalTitle: { fontFamily: 'Georgia,serif', fontSize: '1.4rem', color: '#1a1a1a', fontWeight: '400' },
  closeBtn: { background: 'none', border: 'none', fontSize: '18px', color: '#aaa', cursor: 'pointer', padding: '4px 8px' },
  form: { padding: '1.25rem 1.5rem 1.5rem' },
  sectionTitle: { fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#bbb', marginBottom: '10px', fontWeight: '400' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  row3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' },
  errorMsg: { color: '#c0392b', fontSize: '13px', fontFamily: 'system-ui,sans-serif', background: '#fdf0f0', padding: '8px 12px', borderRadius: '6px', marginBottom: '10px' },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' },
  cancelBtn: { padding: '10px 20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', fontFamily: 'system-ui,sans-serif', cursor: 'pointer', color: '#666' },
  submitBtn: { padding: '10px 24px', background: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '14px', fontFamily: 'system-ui,sans-serif', fontWeight: '500', color: '#fff', cursor: 'pointer' },
  teamNote: { display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#fffdf7', border: '1px solid #e8d9b0', borderRadius: '8px', padding: '10px 14px', marginBottom: '1.25rem', textAlign: 'left', fontSize: '18px' },
}