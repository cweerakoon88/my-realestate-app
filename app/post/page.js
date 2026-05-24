'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { getPriceGuide } from '../../lib/suburbData'

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

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function PostRequirement() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    buyer_email: '',
    location: '',
    property_type: '',
    bedrooms: '',
    bathrooms: '',
    toilets: '',
    land_size_min: '',
    land_size_max: '',
    budget_min: '',
    budget_max: '',
    mobile_number: '',
    phone_number: '',
    notes: ''
  })
  const [proximity, setProximity] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [priceGuide, setPriceGuide] = useState(null)

  // Check auth on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/?auth=1')
      } else {
        setUser(session.user)
        // Pre-fill email and name from auth
        const meta = session.user.user_metadata || {}
        setFormData(prev => ({
          ...prev,
          buyer_email: session.user.email || '',
          first_name: meta.full_name?.split(' ')[0] || '',
          last_name: meta.full_name?.split(' ').slice(1).join(' ') || '',
        }))
      }
      setAuthLoading(false)
    })
  }, [])

  // Price guide: recalculate when suburb/type/bedrooms change
  useEffect(() => {
    const { location, property_type, bedrooms } = formData
    if (!location || location.length < 3 || !property_type) {
      setPriceGuide(null)
      return
    }
    setPriceGuide(getPriceGuide(location, property_type, bedrooms))
  }, [formData.location, formData.property_type, formData.bedrooms])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  function toggleProximity(id) {
    setProximity(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  function validate() {
    const e = {}
    if (!formData.first_name.trim()) e.first_name = 'First name is required'
    if (!formData.last_name.trim()) e.last_name = 'Last name is required'
    if (!formData.buyer_email.trim()) {
      e.buyer_email = 'Email is required'
    } else if (!validateEmail(formData.buyer_email)) {
      e.buyer_email = 'Please enter a valid email address (e.g. name@example.com)'
    }
    if (!formData.location.trim()) e.location = 'Suburb is required'
    if (!formData.property_type) e.property_type = 'Please select a property type'
    if (!formData.mobile_number.trim()) {
      e.mobile_number = 'Mobile number is required'
    } else if (!/^[\d\s\+\-\(\)]{8,15}$/.test(formData.mobile_number.trim())) {
      e.mobile_number = 'Please enter a valid mobile number'
    }
    if (formData.phone_number && !/^[\d\s\+\-\(\)]{8,15}$/.test(formData.phone_number.trim())) {
      e.phone_number = 'Please enter a valid phone number'
    }
    if (!formData.budget_max) e.budget_max = 'Please enter a maximum budget'
    if (formData.budget_min && formData.budget_max &&
        parseInt(formData.budget_min) >= parseInt(formData.budget_max)) {
      e.budget_max = 'Maximum must be greater than minimum'
    }
    if (formData.land_size_min && formData.land_size_max &&
        parseInt(formData.land_size_min) >= parseInt(formData.land_size_max)) {
      e.land_size_max = 'Maximum must be greater than minimum'
    }
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstError = document.querySelector('[data-error="true"]')
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setLoading(true)
    const { error } = await supabase.from('requirements').insert([{
      user_id: user.id,
      buyer_name: `${formData.first_name.trim()} ${formData.last_name.trim()}`,
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      buyer_email: formData.buyer_email.trim().toLowerCase(),
      location: formData.location,
      property_type: formData.property_type,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
      toilets: formData.toilets ? parseInt(formData.toilets) : null,
      land_size_min: formData.land_size_min ? parseInt(formData.land_size_min) : null,
      land_size_max: formData.land_size_max ? parseInt(formData.land_size_max) : null,
      mobile_number: formData.mobile_number.trim(),
      phone_number: formData.phone_number.trim() || null,
      budget_min: formData.budget_min ? parseInt(formData.budget_min) : null,
      budget_max: parseInt(formData.budget_max),
      proximity_preferences: proximity,
      notes: formData.notes
    }])

    setLoading(false)
    if (error) {
      setErrors({ form: 'Something went wrong. Please try again.' })
    } else {
      setSuccess(true)
    }
  }

  function formatPrice(n) {
    if (!n && n !== 0) return '—'
    return '$' + n.toLocaleString('en-AU')
  }

  function resetForm() {
    setSuccess(false)
    setFormData({ first_name: '', last_name: '', buyer_email: user?.email || '', location: '', property_type: '', bedrooms: '', bathrooms: '', toilets: '', land_size_min: '', land_size_max: '', budget_min: '', budget_max: '', mobile_number: '', phone_number: '', notes: '' })
    setProximity([])
    setErrors({})
    setPriceGuide(null)
  }

  const trendColor = { rising: '#2d6a4f', stable: '#9c7c4a', falling: '#c0392b' }
  const trendBg    = { rising: '#f0faf4', stable: '#fffdf7', falling: '#fdf0f0' }
  const trendIcon  = { rising: '↑', stable: '→', falling: '↓' }

  // Show loading while checking auth
  if (authLoading) {
    return (
      <main style={s.page}>
        <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'system-ui, sans-serif', color: '#999' }}>
          Loading...
        </div>
      </main>
    )
  }

  // SUCCESS
  if (success) {
    return (
      <main style={s.page}>
        <div style={s.successBox}>
          <div style={s.successIcon}>✓</div>
          <h2 style={s.successTitle}>Requirement posted!</h2>
          <p style={s.successText}>
            Sellers in your area will see your requirement and reach out to you directly.
          </p>
          <div style={s.teamNote}>
            <span style={s.teamNoteIcon}>👋</span>
            <p style={s.teamNoteText}>
              <strong>Melina & Mikayla</strong> are working on your request and will contact you shortly.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={s.btnPrimary} onClick={resetForm}>Post another</button>
            <button style={{ ...s.btnPrimary, background: '#9c7c4a' }} onClick={() => router.push('/account')}>View my account</button>
          </div>
        </div>
      </main>
    )
  }

  // FORM
  return (
    <main style={s.page}>
      <div style={s.container}>
        <div style={s.header}>
          <a href="/" style={s.backBtn}>← Back to home</a>
          <p style={s.eyebrow}>For buyers</p>
          <h1 style={s.title}>Post your property requirement</h1>
          <p style={s.subtitle}>Tell sellers exactly what you're looking for and let them come to you.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate style={s.form}>

          {/* YOUR DETAILS */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Your details</h2>
            <div style={s.row}>
              <Field label="First name" error={errors.first_name}>
                <input style={inputStyle(errors.first_name)} type="text" name="first_name"
                  placeholder="Jane" value={formData.first_name} onChange={handleChange}
                  data-error={!!errors.first_name} />
              </Field>
              <Field label="Last name" error={errors.last_name}>
                <input style={inputStyle(errors.last_name)} type="text" name="last_name"
                  placeholder="Smith" value={formData.last_name} onChange={handleChange}
                  data-error={!!errors.last_name} />
              </Field>
            </div>
            <Field label="Email address" error={errors.buyer_email} hint="We'll never share your email with anyone.">
              <input style={inputStyle(errors.buyer_email)} type="email" name="buyer_email"
                placeholder="jane@example.com" value={formData.buyer_email} onChange={handleChange}
                data-error={!!errors.buyer_email} />
              {formData.buyer_email && !errors.buyer_email && validateEmail(formData.buyer_email) && (
                <span style={s.validTick}>✓ Valid email</span>
              )}
            </Field>
            <div style={s.row}>
              <Field label="Mobile number" error={errors.mobile_number}>
                <input style={inputStyle(errors.mobile_number)} type="tel" name="mobile_number"
                  placeholder="e.g. 0412 345 678" value={formData.mobile_number} onChange={handleChange}
                  data-error={!!errors.mobile_number} />
              </Field>
              <Field label="Phone number" error={errors.phone_number} hint="Optional">
                <input style={inputStyle(errors.phone_number)} type="tel" name="phone_number"
                  placeholder="e.g. 03 9123 4567" value={formData.phone_number} onChange={handleChange}
                  data-error={!!errors.phone_number} />
              </Field>
            </div>
          </div>

          {/* PROPERTY DETAILS */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Property details</h2>
            <Field label="Preferred suburb / location" error={errors.location}>
              <input style={inputStyle(errors.location)} type="text" name="location"
                placeholder="e.g. Richmond, Toorak, Bondi"
                value={formData.location} onChange={handleChange}
                data-error={!!errors.location} />
            </Field>
            <div style={s.row}>
              <Field label="Property type" error={errors.property_type}>
                <select style={inputStyle(errors.property_type)} name="property_type"
                  value={formData.property_type} onChange={handleChange}
                  data-error={!!errors.property_type}>
                  <option value="">Select type...</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </Field>
              <Field label="Bedrooms">
                <select style={s.input} name="bedrooms" value={formData.bedrooms} onChange={handleChange}>
                  <option value="">Any</option>
                  <option value="1">1 bedroom</option>
                  <option value="2">2 bedrooms</option>
                  <option value="3">3 bedrooms</option>
                  <option value="4">4 bedrooms</option>
                  <option value="5">5+ bedrooms</option>
                </select>
              </Field>
            </div>
            <div style={s.row}>
              <Field label="Bathrooms">
                <select style={s.input} name="bathrooms" value={formData.bathrooms} onChange={handleChange}>
                  <option value="">Any</option>
                  <option value="1">1 bathroom</option>
                  <option value="2">2 bathrooms</option>
                  <option value="3">3 bathrooms</option>
                  <option value="4">4+ bathrooms</option>
                </select>
              </Field>
              <Field label="Toilets">
                <select style={s.input} name="toilets" value={formData.toilets} onChange={handleChange}>
                  <option value="">Any</option>
                  <option value="1">1 toilet</option>
                  <option value="2">2 toilets</option>
                  <option value="3">3 toilets</option>
                  <option value="4">4+ toilets</option>
                </select>
              </Field>
            </div>
          </div>

          {/* LAND SIZE */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Land size <span style={s.optional}>(optional)</span></h2>
            <p style={s.sectionHint}>Leave blank if land size isn't important to you.</p>
            <div style={s.row}>
              <Field label="Minimum (m²)" error={errors.land_size_min}>
                <input style={inputStyle(errors.land_size_min)} type="number" name="land_size_min"
                  placeholder="e.g. 300" value={formData.land_size_min} onChange={handleChange} />
              </Field>
              <Field label="Maximum (m²)" error={errors.land_size_max}>
                <input style={inputStyle(errors.land_size_max)} type="number" name="land_size_max"
                  placeholder="e.g. 800" value={formData.land_size_max} onChange={handleChange} />
              </Field>
            </div>
          </div>

          {/* PRICE GUIDE */}
          {priceGuide && (
            <div style={{ ...s.priceGuideBox, borderColor: trendColor[priceGuide.trend] + '55', background: trendBg[priceGuide.trend] }}>
              <div style={s.priceGuideHeader}>
                <span style={s.priceGuideEyebrow}>✦ Price Guide</span>
                <span style={{ ...s.trendBadge, background: trendColor[priceGuide.trend] + '20', color: trendColor[priceGuide.trend] }}>
                  {trendIcon[priceGuide.trend]} Market {priceGuide.trend}
                  {priceGuide.annualGrowth !== undefined && (
                    <span> · {priceGuide.annualGrowth > 0 ? '+' : ''}{priceGuide.annualGrowth}% p.a.</span>
                  )}
                </span>
              </div>
              <div style={s.priceRow}>
                <div style={s.medianBlock}>
                  <div style={s.medianLabel}>Median price</div>
                  <div style={s.medianValue}>{formatPrice(priceGuide.median)}</div>
                </div>
                <div style={s.rangeBlock}>
                  <div style={s.rangeItem}>
                    <span style={s.rangeLabel}>Low end</span>
                    <span style={s.rangeValue}>{formatPrice(priceGuide.low)}</span>
                  </div>
                  <div style={s.rangeDivider} />
                  <div style={s.rangeItem}>
                    <span style={s.rangeLabel}>High end</span>
                    <span style={s.rangeValue}>{formatPrice(priceGuide.high)}</span>
                  </div>
                </div>
              </div>
              <div style={s.barWrap}>
                <div style={s.barTrack}>
                  <div style={{ ...s.barFill, background: trendColor[priceGuide.trend], width: `${Math.min(100, Math.max(10, ((priceGuide.median - priceGuide.low) / (priceGuide.high - priceGuide.low)) * 100))}%` }} />
                </div>
                <div style={s.barLabels}>
                  <span>{formatPrice(priceGuide.low)}</span>
                  <span>{formatPrice(priceGuide.high)}</span>
                </div>
              </div>
              <p style={s.sourceNote}>📊 {priceGuide.source} · Based on 2024–25 sales data{priceGuide.isFallback && ' · Enter a specific suburb for a more precise estimate'}</p>
            </div>
          )}

          {/* BUDGET */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Your budget</h2>
            {priceGuide && (
              <div style={s.budgetHint}>
                💡 Based on the price guide, a realistic budget is around <strong>{formatPrice(priceGuide.low)}</strong> – <strong>{formatPrice(priceGuide.high)}</strong>
              </div>
            )}
            <div style={s.row}>
              <Field label="Minimum ($)" error={errors.budget_min}>
                <input style={inputStyle(errors.budget_min)} type="number" name="budget_min"
                  placeholder={priceGuide ? String(priceGuide.low) : 'e.g. 500000'}
                  value={formData.budget_min} onChange={handleChange}
                  data-error={!!errors.budget_min} />
              </Field>
              <Field label="Maximum ($)" error={errors.budget_max}>
                <input style={inputStyle(errors.budget_max)} type="number" name="budget_max"
                  placeholder={priceGuide ? String(priceGuide.high) : 'e.g. 800000'}
                  value={formData.budget_max} onChange={handleChange}
                  data-error={!!errors.budget_max} />
              </Field>
            </div>
          </div>

          {/* PROXIMITY */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Proximity preferences <span style={s.optional}>(optional)</span></h2>
            <p style={s.sectionHint}>Select everything that matters to you.</p>
            <div style={s.proximityGrid}>
              {PROXIMITY_OPTIONS.map(opt => (
                <button key={opt.id} type="button" onClick={() => toggleProximity(opt.id)}
                  style={{ ...s.proximityBtn, ...(proximity.includes(opt.id) ? s.proximityBtnActive : {}) }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* NOTES */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Additional notes <span style={s.optional}>(optional)</span></h2>
            <textarea
              style={{ ...s.input, height: '100px', resize: 'vertical' }}
              name="notes"
              placeholder="Anything else? e.g. need a double garage, north-facing, granny flat, pool..."
              value={formData.notes} onChange={handleChange}
            />
          </div>

          {errors.form && <p style={s.errorMsg}>{errors.form}</p>}

          <button type="submit" style={s.btnPrimary} disabled={loading}>
            {loading ? 'Posting...' : 'Post my requirement →'}
          </button>

        </form>
      </div>
    </main>
  )
}

function Field({ label, error, hint, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '12px', position: 'relative' }}>
      <label style={{ fontSize: '14px', color: '#333', fontWeight: '500', fontFamily: 'system-ui, sans-serif' }}>{label}</label>
      {children}
      {hint && !error && <span style={{ fontSize: '11px', color: '#bbb', fontFamily: 'system-ui, sans-serif' }}>{hint}</span>}
      {error && <span style={{ fontSize: '12px', color: '#c0392b', fontFamily: 'system-ui, sans-serif' }}>⚠ {error}</span>}
    </div>
  )
}

function inputStyle(hasError) {
  return {
    padding: '10px 14px', border: `1px solid ${hasError ? '#e74c3c' : '#ddd'}`,
    borderRadius: '8px', fontSize: '15px', fontFamily: 'system-ui, sans-serif',
    color: '#1a1a1a', background: hasError ? '#fff8f8' : '#fafafa',
    outline: 'none', width: '100%', boxSizing: 'border-box',
  }
}

const s = {
  page: { minHeight: '100vh', background: '#f8f7f4', padding: '2rem 1rem', fontFamily: 'Georgia, serif' },
  container: { maxWidth: '660px', margin: '0 auto' },
  header: { marginBottom: '2rem' },
  backBtn: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontFamily: 'system-ui, sans-serif', color: '#9c7c4a', textDecoration: 'none', marginBottom: '1.5rem' },
  eyebrow: { fontSize: '12px', fontFamily: 'monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9c7c4a', marginBottom: '8px' },
  title: { fontSize: '2rem', fontWeight: '600', color: '#1a1a1a', margin: '0 0 8px', lineHeight: 1.2 },
  subtitle: { fontSize: '1rem', color: '#666', margin: 0, lineHeight: 1.6 },
  form: { display: 'flex', flexDirection: 'column' },
  section: { background: '#fff', border: '1px solid #e8e4dc', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' },
  sectionTitle: { fontSize: '13px', fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', margin: '0 0 0.75rem', fontWeight: '400' },
  sectionHint: { fontSize: '13px', color: '#bbb', fontFamily: 'system-ui, sans-serif', marginBottom: '1rem', marginTop: '-4px' },
  optional: { color: '#bbb', fontSize: '11px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  input: { padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a', background: '#fafafa', outline: 'none', width: '100%', boxSizing: 'border-box' },
  validTick: { fontSize: '12px', color: '#2d6a4f', fontFamily: 'system-ui, sans-serif' },
  priceGuideBox: { border: '1.5px solid', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '1rem' },
  priceGuideHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' },
  priceGuideEyebrow: { fontSize: '12px', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', fontWeight: '600' },
  trendBadge: { fontSize: '12px', fontFamily: 'system-ui, sans-serif', fontWeight: '500', padding: '3px 10px', borderRadius: '20px' },
  priceRow: { display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' },
  medianBlock: { flex: 1, minWidth: '130px' },
  medianLabel: { fontSize: '12px', color: '#999', fontFamily: 'system-ui, sans-serif', marginBottom: '4px' },
  medianValue: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a', lineHeight: 1 },
  rangeBlock: { flex: 1, minWidth: '120px', background: 'rgba(255,255,255,0.6)', borderRadius: '8px', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '6px' },
  rangeItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  rangeLabel: { fontSize: '12px', color: '#999', fontFamily: 'system-ui, sans-serif' },
  rangeValue: { fontSize: '13px', fontWeight: '600', color: '#1a1a1a', fontFamily: 'system-ui, sans-serif' },
  rangeDivider: { height: '1px', background: 'rgba(0,0,0,0.08)' },
  barWrap: { marginBottom: '10px' },
  barTrack: { height: '6px', background: 'rgba(0,0,0,0.08)', borderRadius: '3px', marginBottom: '4px', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: '3px', transition: 'width 0.4s ease' },
  barLabels: { display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#aaa', fontFamily: 'system-ui, sans-serif' },
  sourceNote: { fontSize: '11px', color: '#aaa', fontFamily: 'system-ui, sans-serif', margin: 0, fontStyle: 'italic' },
  proximityGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  proximityBtn: { fontFamily: 'system-ui, sans-serif', fontSize: '13px', padding: '8px 14px', borderRadius: '20px', border: '1px solid #ddd', background: '#fafafa', color: '#555', cursor: 'pointer', transition: 'all 0.15s' },
  proximityBtnActive: { background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' },
  budgetHint: { fontSize: '13px', color: '#555', fontFamily: 'system-ui, sans-serif', background: '#fffdf0', borderRadius: '6px', padding: '8px 12px', marginBottom: '12px', border: '1px solid #e8d9b0' },
  btnPrimary: { background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontFamily: 'system-ui, sans-serif', fontWeight: '500', cursor: 'pointer', marginTop: '0.5rem' },
  errorMsg: { color: '#c0392b', fontSize: '14px', fontFamily: 'system-ui, sans-serif', background: '#fdf0f0', padding: '10px 14px', borderRadius: '8px', border: '1px solid #f5c6c6', marginBottom: '1rem' },
  successBox: { maxWidth: '480px', margin: '4rem auto', background: '#fff', border: '1px solid #e8e4dc', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' },
  successIcon: { width: '56px', height: '56px', background: '#f0faf4', border: '1px solid #b7e4c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#2d6a4f', margin: '0 auto 1.5rem' },
  successTitle: { fontSize: '1.5rem', fontWeight: '600', color: '#1a1a1a', margin: '0 0 0.75rem' },
  successText: { fontSize: '15px', color: '#666', lineHeight: 1.6, margin: '0 0 1.25rem' },
  teamNote: { display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#fffdf7', border: '1px solid #e8d9b0', borderRadius: '10px', padding: '12px 16px', marginBottom: '1.5rem', textAlign: 'left' },
  teamNoteIcon: { fontSize: '18px', flexShrink: 0, marginTop: '1px' },
  teamNoteText: { fontSize: '14px', color: '#555', fontFamily: 'system-ui, sans-serif', lineHeight: 1.5, margin: 0 },
}