'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import NavBar from '@/components/NavBar'
import AuthModal from '@/components/AuthModal'

// ── IMAGE UPLOADER ─────────────────────────────────────────────────────
function ImageUploader({ images, onChange }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const MAX = 5

  async function handleFiles(files) {
    const remaining = MAX - images.length
    if (remaining <= 0) return
    const toUpload = Array.from(files).slice(0, remaining).filter(f => f.type.startsWith('image/'))
    for (const file of toUpload) {
      const reader = new FileReader()
      reader.onload = (e) => onChange(prev => [...prev, { file, preview: e.target.result }])
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <div
        style={{ border: `2px dashed ${dragging ? '#b8924a' : '#e8e0d0'}`, borderRadius: '8px', padding: '2rem', textAlign: 'center', background: dragging ? '#fdf8f0' : '#fafafa', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '1rem' }}
        onClick={() => images.length < MAX && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: '14px', color: '#555', marginBottom: '4px' }}>
          {images.length >= MAX ? `Maximum ${MAX} images reached` : 'Drag & drop photos here, or click to browse'}
        </p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: '12px', color: '#bbb' }}>{images.length}/{MAX} images · JPG, PNG, WEBP</p>
        <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
      </div>
      {images.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
          {images.map((img, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e8e0d0' }}>
              <img src={img.preview || img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button type="button" onClick={() => onChange(prev => prev.filter((_, j) => j !== i))} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', fontSize: '12px', cursor: 'pointer' }}>✕</button>
              {i === 0 && <div style={{ position: 'absolute', bottom: '4px', left: '4px', background: '#b8924a', color: '#fff', fontSize: '9px', fontFamily: 'system-ui,sans-serif', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: '3px' }}>Cover</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── DOCUMENT UPLOADER ──────────────────────────────────────────────────
function DocUploader({ label, file, onChange, accept = '.pdf,.jpg,.jpeg,.png', hint }) {
  const inputRef = useRef(null)
  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        style={{ border: `2px dashed ${file ? '#b8924a' : '#e8e0d0'}`, borderRadius: '8px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', background: file ? '#fffdf7' : '#fafafa', transition: 'all 0.2s' }}
      >
        <span style={{ fontSize: '1.5rem' }}>{file ? '✅' : '📄'}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '13px', fontWeight: '500', color: file ? '#b8924a' : '#555' }}>
            {file ? file.name : `Upload ${label}`}
          </div>
          {hint && !file && <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '11px', color: '#bbb', marginTop: '2px' }}>{hint}</div>}
          {file && <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '11px', color: '#aaa', marginTop: '2px' }}>{(file.size / 1024).toFixed(0)} KB · Click to change</div>}
        </div>
        {file && <button type="button" onClick={e => { e.stopPropagation(); onChange(null) }} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '16px' }}>✕</button>}
      </div>
      <input ref={inputRef} type="file" accept={accept} style={{ display: 'none' }} onChange={e => onChange(e.target.files[0] || null)} />
    </div>
  )
}

// ── SELLER POST FORM ───────────────────────────────────────────────────
function SellerPostForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    seller_name: '', seller_email: '', seller_phone: '',
    title: '', location: '', property_type: '', bedrooms: '',
    bathrooms: '', land_size: '', asking_price: '', description: '',
    ownership_type: '', section32_ready: '',
  })
  const [images, setImages] = useState([])
  const [councilDoc, setCouncilDoc] = useState(null)
  const [titleDoc, setTitleDoc] = useState(null)
  const [declaration, setDeclaration] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')

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
    if (!form.ownership_type) e.ownership_type = 'Required'
    if (!declaration) e.declaration = 'You must confirm ownership before listing'
    return e
  }

  async function uploadDoc(file, folder, listingId) {
    if (!file) return null
    const ext = file.name.split('.').pop()
    const path = `listings/${listingId}/${folder}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('listing-images').upload(path, file, { contentType: file.type })
    if (error) return null
    const { data: { publicUrl } } = supabase.storage.from('listing-images').getPublicUrl(path)
    return publicUrl
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }
    setLoading(true)

    try {
      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .insert([{
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
          ownership_type: form.ownership_type,
          section32_ready: form.section32_ready === 'yes',
          images: [],
          status: 'pending_review',
        }])
        .select().single()

      if (listingError) throw listingError

      let imageUrls = []
      if (images.length > 0) {
        setUploadProgress(`Uploading ${images.length} photo${images.length > 1 ? 's' : ''}...`)
        for (let i = 0; i < images.length; i++) {
          const img = images[i]
          const ext = img.file.name.split('.').pop()
          const path = `listings/${listing.id}/${Date.now()}-${i}.${ext}`
          const { error: uploadError } = await supabase.storage.from('listing-images').upload(path, img.file, { contentType: img.file.type })
          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage.from('listing-images').getPublicUrl(path)
            imageUrls.push(publicUrl)
          }
        }
      }

      setUploadProgress('Uploading documents...')
      const councilUrl = await uploadDoc(councilDoc, 'council', listing.id)
      const titleUrl = await uploadDoc(titleDoc, 'title', listing.id)

      await supabase.from('listings').update({
        images: imageUrls,
        council_doc_url: councilUrl,
        title_doc_url: titleUrl,
      }).eq('id', listing.id)

      setLoading(false)
      setUploadProgress('')
      onSuccess()
    } catch (err) {
      setLoading(false)
      setUploadProgress('')
      setErrors({ form: 'Something went wrong. Please try again.' })
    }
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
            <FormField label="Full legal name" error={errors.seller_name}>
              <input style={fld(errors.seller_name)} name="seller_name" placeholder="As it appears on title" value={form.seller_name} onChange={handleChange} />
            </FormField>
            <FormField label="Email" error={errors.seller_email}>
              <input style={fld(errors.seller_email)} name="seller_email" type="email" placeholder="your@email.com" value={form.seller_email} onChange={handleChange} />
            </FormField>
          </div>
          <FormField label="Phone (optional)">
            <input style={fld()} name="seller_phone" placeholder="e.g. 0412 345 678" value={form.seller_phone} onChange={handleChange} />
          </FormField>

          <div style={{ ...fs.sectionTitle, marginTop: '1.25rem' }}>Ownership details</div>
          <FormField label="Your relationship to this property" error={errors.ownership_type}>
            <select style={fld(errors.ownership_type)} name="ownership_type" value={form.ownership_type} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="sole_owner">Sole owner</option>
              <option value="co_owner">Co-owner (joint ownership)</option>
              <option value="authorised_agent">Authorised agent / Power of attorney</option>
              <option value="deceased_estate">Deceased estate executor</option>
            </select>
          </FormField>
          <FormField label="Section 32 (Vendor's Statement)">
            <select style={fld()} name="section32_ready" value={form.section32_ready} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="yes">Yes — Section 32 is prepared</option>
              <option value="in_progress">In progress — being prepared by solicitor</option>
              <option value="no">Not yet started</option>
              <option value="na">Not applicable (outside Victoria)</option>
            </select>
          </FormField>
          <div style={{ fontSize: '11px', color: '#aaa', fontFamily: 'system-ui,sans-serif', marginBottom: '1rem', lineHeight: 1.5 }}>
            💡 A Section 32 is required in Victoria before a buyer can sign a contract of sale.
          </div>

          <div style={{ ...fs.sectionTitle, marginTop: '0.5rem' }}>Property details</div>
          <FormField label="Listing title" error={errors.title}>
            <input style={fld(errors.title)} name="title" placeholder="e.g. Charming 3-bed home with north-facing garden" value={form.title} onChange={handleChange} />
          </FormField>
          <div style={fs.row}>
            <FormField label="Suburb / location" error={errors.location}>
              <input style={fld(errors.location)} name="location" placeholder="e.g. Richmond, Melbourne" value={form.location} onChange={handleChange} />
            </FormField>
            <FormField label="Property type" error={errors.property_type}>
              <select style={fld(errors.property_type)} name="property_type" value={form.property_type} onChange={handleChange}>
                <option value="">Select...</option>
                <option>House</option><option>Apartment</option><option>Townhouse</option><option>Land</option><option>Commercial</option>
              </select>
            </FormField>
          </div>
          <div style={fs.row3}>
            <FormField label="Bedrooms">
              <select style={fld()} name="bedrooms" value={form.bedrooms} onChange={handleChange}>
                <option value="">Any</option>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}{n===5?'+':''}</option>)}
              </select>
            </FormField>
            <FormField label="Bathrooms">
              <select style={fld()} name="bathrooms" value={form.bathrooms} onChange={handleChange}>
                <option value="">Any</option>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n}{n===4?'+':''}</option>)}
              </select>
            </FormField>
            <FormField label="Land size (m²)">
              <input style={fld()} name="land_size" type="number" placeholder="e.g. 450" value={form.land_size} onChange={handleChange} />
            </FormField>
          </div>
          <FormField label="Asking price ($)" error={errors.asking_price}>
            <input style={fld(errors.asking_price)} name="asking_price" type="number" placeholder="e.g. 850000" value={form.asking_price} onChange={handleChange} />
          </FormField>
          <FormField label="Description" error={errors.description}>
            <textarea style={{ ...fld(errors.description), height: '90px', resize: 'vertical' }} name="description" placeholder="Describe the property..." value={form.description} onChange={handleChange} />
          </FormField>

          <div style={{ ...fs.sectionTitle, marginTop: '1.25rem' }}>
            Property photos <span style={{ color: '#bbb', fontSize: '10px', fontFamily: 'system-ui,sans-serif', textTransform: 'none', letterSpacing: 0 }}>(optional · up to 5)</span>
          </div>
          <ImageUploader images={images} onChange={setImages} />

          <div style={{ ...fs.sectionTitle, marginTop: '1.5rem' }}>Ownership documents <span style={{ color: '#bbb', fontSize: '10px', fontFamily: 'system-ui,sans-serif', textTransform: 'none', letterSpacing: 0 }}>(optional but recommended)</span></div>
          <div style={{ background: '#fffdf7', border: '1px solid #f0e8d0', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#7a6a4a', lineHeight: 1.6 }}>
            📋 Documents are reviewed by our team only and are not shown publicly.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1rem' }}>
            <FormField label="Council rates notice (PDF or image)">
              <DocUploader label="council rates notice" file={councilDoc} onChange={setCouncilDoc} hint="Shows property address and owner name" />
            </FormField>
            <FormField label="Certificate of title (optional)">
              <DocUploader label="title document" file={titleDoc} onChange={setTitleDoc} hint="Most reliable ownership proof" />
            </FormField>
          </div>

          <div style={{ ...fs.sectionTitle, marginTop: '1.25rem' }}>Declaration</div>
          <div
            style={{ background: errors.declaration ? '#fff8f8' : '#f8f8f8', border: `1px solid ${errors.declaration ? '#e74c3c' : '#e8e0d0'}`, borderRadius: '8px', padding: '1rem', marginBottom: '1rem', cursor: 'pointer' }}
            onClick={() => { setDeclaration(!declaration); setErrors(p => ({ ...p, declaration: null })) }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '20px', height: '20px', border: `2px solid ${declaration ? '#b8924a' : '#ccc'}`, borderRadius: '4px', background: declaration ? '#b8924a' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px', transition: 'all 0.2s' }}>
                {declaration && <span style={{ color: '#fff', fontSize: '12px', fontWeight: '700' }}>✓</span>}
              </div>
              <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#555', lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: '#1a1a1a' }}>I confirm that I am the legal owner of this property, or am duly authorised to sell it on behalf of the owner.</strong> I understand that submitting a fraudulent listing is a criminal offence under Australian law.
              </p>
            </div>
            {errors.declaration && <p style={{ color: '#c0392b', fontSize: '11px', fontFamily: 'system-ui,sans-serif', marginTop: '8px', marginLeft: '32px' }}>⚠ {errors.declaration}</p>}
          </div>

          {errors.form && <p style={fs.errorMsg}>{errors.form}</p>}

          <div style={{ background: '#f0f7ff', border: '1px solid #c8dff7', borderRadius: '8px', padding: '10px 14px', marginBottom: '1rem', fontFamily: 'system-ui,sans-serif', fontSize: '12px', color: '#3a6ea8', lineHeight: 1.6 }}>
            🔍 <strong>Listings are reviewed before going live.</strong> Our team will verify within 24 hours.
          </div>

          <div style={fs.modalFooter}>
            <button type="button" style={fs.cancelBtn} onClick={onCancel}>Cancel</button>
            <button type="submit" style={fs.submitBtn} disabled={loading}>
              {loading ? (uploadProgress || 'Submitting...') : 'Submit listing for review →'}
            </button>
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

function fld(err) {
  return { padding: '8px 12px', border: `1px solid ${err ? '#e74c3c' : '#ddd'}`, borderRadius: '7px', fontSize: '14px', fontFamily: 'system-ui,sans-serif', color: '#1a1a1a', background: err ? '#fff8f8' : '#fafafa', outline: 'none', width: '100%', boxSizing: 'border-box' }
}

// ── LOGIN GATE ─────────────────────────────────────────────────────────
function LoginGate({ onSignIn }) {
  return (
    <div style={{ marginTop: '1rem', background: '#f8f7f4', border: '1px solid #e8e0d0', borderRadius: '8px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '1.2rem' }}>🔒</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '13px', fontWeight: '500', color: '#1a1a1a', marginBottom: '2px' }}>Sign in to view contact details</div>
        <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '12px', color: '#888' }}>Create a free account or sign in to contact buyers and sellers directly.</div>
      </div>
      <button onClick={onSignIn} style={{ background: '#1a1714', color: '#faf8f3', border: 'none', borderRadius: '6px', padding: '8px 18px', fontFamily: 'system-ui,sans-serif', fontSize: '13px', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}>
        Sign in free
      </button>
    </div>
  )
}

// ── BUYER CARD ─────────────────────────────────────────────────────────
function BuyerCard({ req, user, onSignIn }) {
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
      {expanded && (
        <div style={c.expanded}>
          <div style={c.expandRow}>
            <span style={c.expandLabel}>Buyer</span>
            <span style={c.expandVal}>{req.buyer_name || `${req.first_name || ''} ${req.last_name || ''}`.trim()}</span>
          </div>
          {req.notes && <div style={c.expandRow}><span style={c.expandLabel}>Notes</span><span style={c.expandVal}>{req.notes}</span></div>}
          {user ? (
            <a href={`mailto:${req.buyer_email}?subject=Property offer for your requirement in ${req.location}`} style={c.contactBtn}>✉ Contact this buyer</a>
          ) : (
            <LoginGate onSignIn={onSignIn} />
          )}
        </div>
      )}
      <button style={c.expandBtn} onClick={() => setExpanded(e => !e)}>{expanded ? 'Show less ↑' : 'View details & contact ↓'}</button>
    </div>
  )
}

// ── LISTING CARD ───────────────────────────────────────────────────────
function ListingCard({ listing, user, onSignIn }) {
  const [expanded, setExpanded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [reporting, setReporting] = useState(false)
  const [reportSent, setReportSent] = useState(false)
  const hasImages = listing.images && listing.images.length > 0

  const section32Labels = {
    yes: { label: '✅ Section 32 ready', color: '#2d6a4f', bg: '#f0faf4' },
    in_progress: { label: '🔄 Section 32 in progress', color: '#7a5c00', bg: '#fffbea' },
    no: { label: '⏳ Section 32 not started', color: '#888', bg: '#f5f5f5' },
    na: { label: 'ℹ Not applicable', color: '#888', bg: '#f5f5f5' },
  }

  return (
    <div style={c.card}>
      {hasImages && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', marginBottom: '6px', background: '#f0ece4' }}>
            <img src={listing.images[activeImg]} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {listing.images.length > 1 && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {listing.images.map((img, i) => (
                <div key={i} onClick={() => setActiveImg(i)} style={{ width: '48px', height: '48px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${activeImg === i ? '#b8924a' : 'transparent'}`, opacity: activeImg === i ? 1 : 0.7 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={c.cardTop}>
        <div style={c.cardLeft}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '6px', alignItems: 'center' }}>
            <span style={{ ...c.tag, background: '#e8f4fd', color: '#1a6fa8' }}>{listing.property_type || 'Property'}</span>
            {listing.section32_ready && section32Labels[listing.section32_ready] && (
              <span style={{ fontSize: '11px', fontFamily: 'system-ui,sans-serif', background: section32Labels[listing.section32_ready].bg, color: section32Labels[listing.section32_ready].color, padding: '3px 8px', borderRadius: '20px', fontWeight: '500' }}>
                {section32Labels[listing.section32_ready].label}
              </span>
            )}
            {listing.council_doc_url && (
              <span style={{ fontSize: '11px', fontFamily: 'system-ui,sans-serif', background: '#f0faf4', color: '#2d6a4f', padding: '3px 8px', borderRadius: '20px', fontWeight: '500' }}>✅ Ownership verified</span>
            )}
          </div>
          <h3 style={c.cardTitle}>{listing.title}</h3>
          <div style={c.cardMeta}>
            <span style={c.metaItem}>📍 {listing.location}</span>
            {listing.bedrooms && <span style={c.metaItem}>🛏 {listing.bedrooms} bed</span>}
            {listing.bathrooms && <span style={c.metaItem}>🚿 {listing.bathrooms} bath</span>}
            {listing.land_size && <span style={c.metaItem}>📐 {listing.land_size.toLocaleString()}m²</span>}
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
          {listing.ownership_type && (
            <div style={c.expandRow}>
              <span style={c.expandLabel}>Seller type</span>
              <span style={c.expandVal}>{{ sole_owner: 'Sole owner', co_owner: 'Co-owner', authorised_agent: 'Authorised agent', deceased_estate: 'Deceased estate' }[listing.ownership_type] || listing.ownership_type}</span>
            </div>
          )}

          {user ? (
            <>
              <a href={`mailto:${listing.seller_email}?subject=Enquiry about ${listing.title}`} style={{ ...c.contactBtn, background: '#1a6fa8' }}>✉ Contact seller</a>
              <div style={{ marginTop: '1rem', background: '#fffbea', border: '1px solid #f0d060', borderRadius: '8px', padding: '10px 14px', fontFamily: 'system-ui,sans-serif', fontSize: '12px', color: '#7a5c00', lineHeight: 1.6 }}>
                ⚠️ <strong>Important:</strong> Never pay a deposit directly to a seller. Use a licensed conveyancer.
              </div>
            </>
          ) : (
            <LoginGate onSignIn={onSignIn} />
          )}

          {user && !reportSent && (
            !reporting ? (
              <button onClick={() => setReporting(true)} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#ccc', fontSize: '12px', fontFamily: 'system-ui,sans-serif', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                🚩 Report this listing
              </button>
            ) : (
              <div style={{ marginTop: '10px', background: '#fff8f8', border: '1px solid #f5c6c2', borderRadius: '8px', padding: '12px' }}>
                <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#555', marginBottom: '8px' }}>Why are you reporting this listing?</p>
                {['Not the actual owner', 'Fraudulent or scam listing', 'Property does not exist', 'Misleading information', 'Other'].map(reason => (
                  <button key={reason} onClick={async () => {
                    await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Report System', email: 'hello@propoffer.com.au', service: `LISTING REPORT: ${listing.title}`, message: `Reason: ${reason}\nListing: ${listing.title}\nSeller: ${listing.seller_name} (${listing.seller_email})` }) })
                    setReportSent(true); setReporting(false)
                  }} style={{ display: 'block', width: '100%', textAlign: 'left', background: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '8px 12px', marginBottom: '6px', fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#555', cursor: 'pointer' }}>
                    {reason}
                  </button>
                ))}
                <button onClick={() => setReporting(false)} style={{ background: 'none', border: 'none', color: '#bbb', fontSize: '12px', cursor: 'pointer', fontFamily: 'system-ui,sans-serif' }}>Cancel</button>
              </div>
            )
          )}
          {reportSent && <p style={{ marginTop: '10px', fontFamily: 'system-ui,sans-serif', fontSize: '12px', color: '#2d6a4f' }}>✅ Report submitted. Our team will review within 24 hours.</p>}
        </div>
      )}
      <button style={c.expandBtn} onClick={() => setExpanded(e => !e)}>{expanded ? 'Show less ↑' : 'View details & contact ↓'}</button>
    </div>
  )
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────
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
  const [user, setUser] = useState(null)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    fetchAll()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function fetchAll() {
    setLoading(true)
    const [reqRes, listRes] = await Promise.all([
      supabase.from('requirements').select('*').eq('req_status', 'active').order('created_at', { ascending: false }),
      supabase.from('listings').select('*').eq('status', 'active').order('created_at', { ascending: false }),
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
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => setShowAuth(false)}
          defaultMode="signin"
        />
      )}

      <NavBar />

      <div style={p.container}>
        <div style={p.header}>
          <h1 style={p.title}>Property Marketplace</h1>
          <p style={p.subtitle}>Browse buyer requirements or listed properties across Australia.</p>
        </div>

        {/* LOGIN PROMPT for logged out users */}
        {!user && (
          <div style={{ background: '#f5ecd8', border: '1px solid #e8d0a0', borderRadius: '8px', padding: '12px 16px', marginBottom: '1.5rem', fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#7a5c00', lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span>🔒 <strong>Sign in to contact buyers and sellers directly.</strong> Browsing is free — no account needed to see listings.</span>
            <button onClick={() => setShowAuth(true)} style={{ background: '#b8924a', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px 16px', fontFamily: 'system-ui,sans-serif', fontSize: '12px', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}>Sign in free</button>
          </div>
        )}

        <div style={{ background: '#fffbea', border: '1px solid #f0d060', borderRadius: '8px', padding: '12px 16px', marginBottom: '1.5rem', fontFamily: 'system-ui,sans-serif', fontSize: '13px', color: '#7a5c00', lineHeight: 1.6 }}>
          ⚠️ <strong>Buyer reminder:</strong> Always conduct independent due diligence and <strong>never transfer funds without a formal contract and licensed conveyancer.</strong>
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
              filteredReqs.length === 0
                ? <div style={p.empty}><div style={p.emptyIcon}>🏠</div><p style={p.emptyText}>No buyer requirements found.</p><Link href="/post" style={p.actionBtn}>Be the first to post</Link></div>
                : <div style={p.grid}>{filteredReqs.map(r => <BuyerCard key={r.id} req={r} user={user} onSignIn={() => setShowAuth(true)} />)}</div>
            )}
            {tab === 'sellers' && (
              filteredListings.length === 0
                ? <div style={p.empty}><div style={p.emptyIcon}>🏷️</div><p style={p.emptyText}>No properties listed yet.</p><button style={p.actionBtn} onClick={() => setShowSellerForm(true)}>List the first property</button></div>
                : <div style={p.grid}>{filteredListings.map(l => <ListingCard key={l.id} listing={l} user={user} onSignIn={() => setShowAuth(true)} />)}</div>
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
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '0.75rem' }}>Listing submitted!</h2>
            <p style={{ fontSize: '14px', color: '#666', fontFamily: 'system-ui,sans-serif', lineHeight: 1.6, marginBottom: '1.5rem' }}>Your listing is under review. Our team will verify it within 24 hours.</p>
            <div style={fs.teamNote}><span>👋</span><p style={{ fontSize: '13px', color: '#555', fontFamily: 'system-ui,sans-serif', margin: 0, lineHeight: 1.5 }}><strong>Melina & Mikayla</strong> will be in touch shortly.</p></div>
            <button style={fs.submitBtn} onClick={() => { setSellerSuccess(false); setShowSellerForm(false) }}>Back to marketplace</button>
          </div>
        </div>
      )}

      <footer style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e8e0d0', fontFamily: 'system-ui,sans-serif', fontSize: '12px', color: '#bbb', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#4a4540' }}>Prop<span style={{ color: '#b8924a' }}>Offer</span></div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[['/', 'Home'], ['/services', 'Services'], ['/pricing', 'Pricing'], ['/about', 'About'], ['/contact', 'Contact'], ['/terms', 'Terms']].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: '#bbb', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
        <div>© 2026 PropOffer · Australia's buyer-first property platform</div>
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

const p = {
  page: { minHeight: '100vh', background: '#f8f7f4', fontFamily: 'Georgia,serif' },
  container: { maxWidth: '900px', margin: '0 auto', padding: '5rem 1.5rem 2rem' },
  header: { marginBottom: '1.5rem', paddingTop: '1rem' },
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
  expanded: { marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f0ece4' },
  expandRow: { display: 'flex', gap: '1rem', marginBottom: '6px', fontFamily: 'system-ui,sans-serif', fontSize: '13px' },
  expandLabel: { color: '#bbb', minWidth: '80px', flexShrink: 0 }, expandVal: { color: '#555' },
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