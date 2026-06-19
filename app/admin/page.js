'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'
import { disclosureFieldLabel } from '../../lib/vendorDisclosure'

const ADMIN_EMAIL = 'callum.weerakoon@gmail.com'

function StatCard({ label, value, color }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '10px', padding: '1.25rem 1.5rem', flex: 1, minWidth: '140px' }}>
      <div style={{ fontSize: '11px', fontFamily: 'system-ui,sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaa', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontSize: '2rem', fontFamily: 'Georgia,serif', fontWeight: '300', color: color || '#1a1714' }}>{value}</div>
    </div>
  )
}

export default function Admin() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [tab, setTab] = useState('requirements')
  const [requirements, setRequirements] = useState([])
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)
  const [rejectModal, setRejectModal] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [toast, setToast] = useState(null)
  const [filterStatus, setFilterStatus] = useState('pending')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/?auth=1')
        return
      }
      if (session.user.email !== ADMIN_EMAIL) {
        router.push('/')
        return
      }
      setUser(session.user)
      setAuthLoading(false)
      fetchAll()
    })
  }, [])

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

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  async function sendEmail(to, subject, message, name) {
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'PropOffer Team',
          email: to,
          phone: '',
          service: subject,
          message: message,
        })
      })
    } catch (err) {
      console.error('Email failed:', err)
    }
  }

  async function approveRequirement(req) {
    setActionLoading(`approve-req-${req.id}`)
    const { error } = await supabase
      .from('requirements')
      .update({ req_status: 'active' })
      .eq('id', req.id)

    if (!error) {
      await sendEmail(
        req.buyer_email,
        '✅ Your PropOffer requirement is live!',
        `Hi ${req.first_name || req.buyer_name},

Great news — your property requirement on PropOffer has been approved and is now live in the marketplace!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR REQUIREMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Location:    ${req.location}
Type:        ${req.property_type}
Bedrooms:    ${req.bedrooms || 'Any'}
Budget:      $${req.budget_min ? parseInt(req.budget_min).toLocaleString() : '0'} – $${parseInt(req.budget_max).toLocaleString()}

Sellers with matching properties can now see your requirement and will contact you directly at ${req.buyer_email}.

View your requirement on the marketplace:
https://propoffer.com.au/marketplace

Good luck finding your perfect property!

The PropOffer Team
propoffer.com.au`
      )
      fetchAll()
      showToast(`✅ Requirement approved — email sent to ${req.buyer_email}`)
    } else {
      showToast('❌ Failed to approve requirement', 'error')
    }
    setActionLoading(null)
  }

  async function rejectRequirement(req, reason) {
    setActionLoading(`reject-req-${req.id}`)
    const { error } = await supabase
      .from('requirements')
      .update({ req_status: 'rejected', admin_notes: reason })
      .eq('id', req.id)

    if (!error) {
      await sendEmail(
        req.buyer_email,
        'Update on your PropOffer requirement',
        `Hi ${req.first_name || req.buyer_name},

Thank you for submitting your property requirement on PropOffer.

Unfortunately we were unable to approve your requirement at this time.

Reason: ${reason}

If you have any questions or would like to resubmit with changes, please contact us at hello@propoffer.com.au or visit propoffer.com.au/contact.

The PropOffer Team
propoffer.com.au`
      )
      fetchAll()
      showToast(`Requirement rejected — email sent to ${req.buyer_email}`)
    } else {
      showToast('❌ Failed to reject requirement', 'error')
    }
    setActionLoading(null)
    setRejectModal(null)
    setRejectReason('')
  }

  async function approveListing(listing) {
    setActionLoading(`approve-list-${listing.id}`)
    const { error } = await supabase
      .from('listings')
      .update({ status: 'active' })
      .eq('id', listing.id)

    if (!error) {
      await sendEmail(
        listing.seller_email,
        '✅ Your PropOffer listing is live!',
        `Hi ${listing.seller_name},

Great news — your property listing on PropOffer has been approved and is now live in the marketplace!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR LISTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Property:    ${listing.title}
Location:    ${listing.location}${listing.state ? `, ${listing.state}` : ''}
Type:        ${listing.property_type}
Asking:      $${parseInt(listing.asking_price).toLocaleString()}

Buyers looking for properties matching yours can now see your listing and will contact you directly at ${listing.seller_email}.

View your listing on the marketplace:
https://propoffer.com.au/marketplace

The PropOffer Team
propoffer.com.au`
      )
      fetchAll()
      showToast(`✅ Listing approved — email sent to ${listing.seller_email}`)
    } else {
      showToast('❌ Failed to approve listing', 'error')
    }
    setActionLoading(null)
  }

  async function rejectListing(listing, reason) {
    setActionLoading(`reject-list-${listing.id}`)
    const { error } = await supabase
      .from('listings')
      .update({ status: 'rejected', admin_notes: reason })
      .eq('id', listing.id)

    if (!error) {
      await sendEmail(
        listing.seller_email,
        'Update on your PropOffer listing',
        `Hi ${listing.seller_name},

Thank you for submitting your property listing on PropOffer.

Unfortunately we were unable to approve your listing at this time.

Reason: ${reason}

If you have any questions or would like to resubmit with changes, please contact us at hello@propoffer.com.au

The PropOffer Team
propoffer.com.au`
      )
      fetchAll()
      showToast(`Listing rejected — email sent to ${listing.seller_email}`)
    } else {
      showToast('❌ Failed to reject listing', 'error')
    }
    setActionLoading(null)
    setRejectModal(null)
    setRejectReason('')
  }

  const filteredReqs = requirements.filter(r => {
    if (filterStatus === 'pending') return !r.req_status || r.req_status === 'pending' || r.req_status === null
    return r.req_status === filterStatus
  })

  const filteredListings = listings.filter(l => {
    if (filterStatus === 'pending') return !l.status || l.status === 'pending_review' || l.status === 'pending' || l.status === null
    if (filterStatus === 'active') return l.status === 'active'
    if (filterStatus === 'rejected') return l.status === 'rejected'
    return true
  })

  const pendingReqCount = requirements.filter(r => !r.req_status || r.req_status === 'pending' || r.req_status === null).length
  const pendingListCount = listings.filter(l => !l.status || l.status === 'pending_review' || l.status === 'pending' || l.status === null).length

  if (authLoading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f7f4', fontFamily: 'system-ui,sans-serif', color: '#aaa' }}>
      Loading...
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f4', fontFamily: 'system-ui,sans-serif' }}>

      {/* TOAST */}
      {toast && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 999, background: toast.type === 'error' ? '#c0392b' : '#2d6a4f', color: '#fff', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', fontFamily: 'system-ui,sans-serif', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', maxWidth: '380px' }}>
          {toast.msg}
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.25rem', color: '#1a1714', marginBottom: '0.5rem', fontWeight: '400' }}>Reject this {rejectModal.type}?</h3>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '1.25rem' }}>An email will be sent to <strong>{rejectModal.email}</strong> explaining the rejection.</p>
            <label style={{ fontSize: '12px', fontWeight: '500', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>Reason for rejection *</label>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="e.g. Incomplete information, suspected fraud, duplicate listing..."
              style={{ width: '100%', height: '100px', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', fontFamily: 'system-ui,sans-serif', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: '10px', marginTop: '1.25rem', justifyContent: 'flex-end' }}>
              <button onClick={() => { setRejectModal(null); setRejectReason('') }} style={{ padding: '10px 20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', color: '#666' }}>Cancel</button>
              <button
                disabled={!rejectReason.trim()}
                onClick={() => {
                  if (rejectModal.type === 'requirement') rejectRequirement(rejectModal.item, rejectReason)
                  else rejectListing(rejectModal.item, rejectReason)
                }}
                style={{ padding: '10px 20px', background: rejectReason.trim() ? '#c0392b' : '#ddd', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: rejectReason.trim() ? 'pointer' : 'not-allowed', fontWeight: '500' }}
              >
                Reject & send email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ background: '#1a1714', padding: '1.5rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'Georgia,serif', fontSize: '1.3rem', color: '#faf8f3' }}>Prop<span style={{ color: '#b8924a' }}>Offer</span></span>
          <span style={{ color: 'rgba(250,248,243,0.3)', fontSize: '14px' }}>·</span>
          <span style={{ color: '#b8924a', fontSize: '12px', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/marketplace" style={{ color: 'rgba(250,248,243,0.5)', fontSize: '13px', textDecoration: 'none' }}>View site</Link>
          <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))} style={{ background: 'none', border: '1px solid rgba(250,248,243,0.2)', color: 'rgba(250,248,243,0.6)', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Sign out</button>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* STATS */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <StatCard label="Pending requirements" value={pendingReqCount} color={pendingReqCount > 0 ? '#b8924a' : '#2d6a4f'} />
          <StatCard label="Pending listings" value={pendingListCount} color={pendingListCount > 0 ? '#b8924a' : '#2d6a4f'} />
          <StatCard label="Total requirements" value={requirements.length} />
          <StatCard label="Total listings" value={listings.length} />
          <StatCard label="Active requirements" value={requirements.filter(r => r.req_status === 'active').length} color="#2d6a4f" />
          <StatCard label="Active listings" value={listings.filter(l => l.status === 'active').length} color="#2d6a4f" />
        </div>

        {/* TABS + FILTER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '4px', background: '#fff', border: '1px solid #e8e0d0', borderRadius: '10px', padding: '4px' }}>
            <button
              style={{ padding: '8px 18px', border: 'none', borderRadius: '7px', fontSize: '13px', cursor: 'pointer', background: tab === 'requirements' ? '#1a1714' : 'none', color: tab === 'requirements' ? '#fff' : '#888', fontWeight: tab === 'requirements' ? '500' : '400' }}
              onClick={() => setTab('requirements')}
            >
              🏠 Requirements {pendingReqCount > 0 && <span style={{ background: '#b8924a', color: '#fff', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', marginLeft: '4px' }}>{pendingReqCount}</span>}
            </button>
            <button
              style={{ padding: '8px 18px', border: 'none', borderRadius: '7px', fontSize: '13px', cursor: 'pointer', background: tab === 'listings' ? '#1a1714' : 'none', color: tab === 'listings' ? '#fff' : '#888', fontWeight: tab === 'listings' ? '500' : '400' }}
              onClick={() => setTab('listings')}
            >
              🏷️ Listings {pendingListCount > 0 && <span style={{ background: '#b8924a', color: '#fff', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', marginLeft: '4px' }}>{pendingListCount}</span>}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['pending', 'active', 'rejected'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '7px 14px', border: `1px solid ${filterStatus === s ? '#1a1714' : '#ddd'}`, borderRadius: '20px', fontSize: '12px', cursor: 'pointer', background: filterStatus === s ? '#1a1714' : '#fff', color: filterStatus === s ? '#fff' : '#666', fontWeight: filterStatus === s ? '500' : '400', textTransform: 'capitalize' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* REQUIREMENTS TAB */}
        {tab === 'requirements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {loading ? <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>Loading...</div> :
             filteredReqs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '12px', border: '1px solid #e8e0d0', color: '#aaa', fontSize: '14px' }}>
                No {filterStatus} requirements found.
              </div>
            ) : filteredReqs.map(req => (
              <div key={req.id} style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', background: req.req_status === 'active' ? '#f0faf4' : req.req_status === 'rejected' ? '#fdf0f0' : '#fff8f0', color: req.req_status === 'active' ? '#2d6a4f' : req.req_status === 'rejected' ? '#c0392b' : '#b8924a', border: `1px solid ${req.req_status === 'active' ? '#b7e4c7' : req.req_status === 'rejected' ? '#f5c6c2' : '#e8d0a0'}`, borderRadius: '20px', padding: '2px 10px', fontWeight: '500' }}>
                        {req.req_status === 'active' ? '✅ Active' : req.req_status === 'rejected' ? '❌ Rejected' : '⏳ Pending review'}
                      </span>
                      <span style={{ fontSize: '11px', color: '#aaa' }}>{new Date(req.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#1a1714', marginBottom: '4px' }}>
                      {req.bedrooms ? `${req.bedrooms}-bed ` : ''}{req.property_type} in {req.location}
                    </div>
                    <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
                      Budget: <strong style={{ color: '#1a1714' }}>${req.budget_min ? parseInt(req.budget_min).toLocaleString() : '0'} – ${parseInt(req.budget_max || 0).toLocaleString()}</strong>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '4px 16px' }}>
                      <div style={{ fontSize: '13px', color: '#555' }}>👤 {req.buyer_name || `${req.first_name} ${req.last_name}`}</div>
                      <div style={{ fontSize: '13px', color: '#555' }}>✉ {req.buyer_email}</div>
                      <div style={{ fontSize: '13px', color: '#555' }}>📱 {req.mobile_number || '—'}</div>
                      {req.bathrooms && <div style={{ fontSize: '13px', color: '#555' }}>🚿 {req.bathrooms} bath</div>}
                      {req.notes && <div style={{ fontSize: '13px', color: '#555', gridColumn: '1/-1' }}>📝 {req.notes}</div>}
                    </div>
                    {req.admin_notes && (
                      <div style={{ marginTop: '8px', fontSize: '12px', color: '#c0392b', background: '#fdf0f0', padding: '6px 10px', borderRadius: '6px' }}>
                        Admin note: {req.admin_notes}
                      </div>
                    )}
                  </div>

                  {/* ACTION BUTTONS */}
                  {(!req.req_status || req.req_status === 'pending' || req.req_status === null) && (
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => approveRequirement(req)}
                        disabled={actionLoading === `approve-req-${req.id}`}
                        style={{ padding: '8px 18px', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', opacity: actionLoading === `approve-req-${req.id}` ? 0.6 : 1 }}
                      >
                        {actionLoading === `approve-req-${req.id}` ? 'Approving...' : '✅ Approve'}
                      </button>
                      <button
                        onClick={() => setRejectModal({ type: 'requirement', item: req, email: req.buyer_email })}
                        style={{ padding: '8px 18px', background: '#fff', color: '#c0392b', border: '1px solid #f5c6c2', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                  {req.req_status === 'active' && (
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => setRejectModal({ type: 'requirement', item: req, email: req.buyer_email })}
                        style={{ padding: '8px 16px', background: '#fff', color: '#c0392b', border: '1px solid #f5c6c2', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LISTINGS TAB */}
        {tab === 'listings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {loading ? <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>Loading...</div> :
             filteredListings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '12px', border: '1px solid #e8e0d0', color: '#aaa', fontSize: '14px' }}>
                No {filterStatus} listings found.
              </div>
            ) : filteredListings.map(listing => (
              <div key={listing.id} style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', background: listing.status === 'active' ? '#f0faf4' : listing.status === 'rejected' ? '#fdf0f0' : '#fff8f0', color: listing.status === 'active' ? '#2d6a4f' : listing.status === 'rejected' ? '#c0392b' : '#b8924a', border: `1px solid ${listing.status === 'active' ? '#b7e4c7' : listing.status === 'rejected' ? '#f5c6c2' : '#e8d0a0'}`, borderRadius: '20px', padding: '2px 10px', fontWeight: '500' }}>
                        {listing.status === 'active' ? '✅ Active' : listing.status === 'rejected' ? '❌ Rejected' : '⏳ Pending review'}
                      </span>
                      {listing.council_doc_url && <span style={{ fontSize: '11px', background: '#f0faf4', color: '#2d6a4f', border: '1px solid #b7e4c7', borderRadius: '20px', padding: '2px 10px' }}>📄 Council doc uploaded</span>}
                      {listing.title_doc_url && <span style={{ fontSize: '11px', background: '#f0faf4', color: '#2d6a4f', border: '1px solid #b7e4c7', borderRadius: '20px', padding: '2px 10px' }}>📋 Title doc uploaded</span>}
                      <span style={{ fontSize: '11px', color: '#aaa' }}>{new Date(listing.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.1rem', color: '#1a1714', marginBottom: '4px' }}>{listing.title}</div>
                    <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
                      📍 {listing.location}{listing.state ? `, ${listing.state}` : ''} · {listing.property_type} · Asking: <strong style={{ color: '#1a6fa8' }}>${parseInt(listing.asking_price || 0).toLocaleString()}</strong>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '4px 16px' }}>
                      <div style={{ fontSize: '13px', color: '#555' }}>👤 {listing.seller_name}</div>
                      <div style={{ fontSize: '13px', color: '#555' }}>✉ {listing.seller_email}</div>
                      <div style={{ fontSize: '13px', color: '#555' }}>📱 {listing.seller_phone || '—'}</div>
                      <div style={{ fontSize: '13px', color: '#555' }}>🏠 {listing.ownership_type?.replace('_', ' ') || '—'}</div>
                      {listing.vendor_disclosure_status && (
                        <div style={{ fontSize: '13px', color: '#555' }}>📋 {disclosureFieldLabel(listing.state)}: {{ yes: 'Ready', in_progress: 'In progress', no: 'Not started', na: 'Not applicable' }[listing.vendor_disclosure_status] || listing.vendor_disclosure_status}</div>
                      )}
                    </div>
                    {listing.description && (
                      <div style={{ marginTop: '8px', fontSize: '13px', color: '#777', lineHeight: 1.5 }}>{listing.description.substring(0, 200)}{listing.description.length > 200 ? '...' : ''}</div>
                    )}
                    {listing.images && listing.images.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                        {listing.images.slice(0, 4).map((img, i) => (
                          <img key={i} src={img} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e8e0d0' }} />
                        ))}
                        {listing.images.length > 4 && <div style={{ width: '60px', height: '60px', background: '#f0ece4', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#888' }}>+{listing.images.length - 4}</div>}
                      </div>
                    )}
                    {listing.council_doc_url && (
                      <a href={listing.council_doc_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '8px', fontSize: '12px', color: '#b8924a', textDecoration: 'none' }}>
                        📄 View council document ↗
                      </a>
                    )}
                    {listing.admin_notes && (
                      <div style={{ marginTop: '8px', fontSize: '12px', color: '#c0392b', background: '#fdf0f0', padding: '6px 10px', borderRadius: '6px' }}>
                        Admin note: {listing.admin_notes}
                      </div>
                    )}
                  </div>

                  {/* ACTION BUTTONS */}
                  {(!listing.status || listing.status === 'pending_review' || listing.status === 'pending' || listing.status === null) && (
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => approveListing(listing)}
                        disabled={actionLoading === `approve-list-${listing.id}`}
                        style={{ padding: '8px 18px', background: '#2d6a4f', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', opacity: actionLoading === `approve-list-${listing.id}` ? 0.6 : 1 }}
                      >
                        {actionLoading === `approve-list-${listing.id}` ? 'Approving...' : '✅ Approve'}
                      </button>
                      <button
                        onClick={() => setRejectModal({ type: 'listing', item: listing, email: listing.seller_email })}
                        style={{ padding: '8px 18px', background: '#fff', color: '#c0392b', border: '1px solid #f5c6c2', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                  {listing.status === 'active' && (
                    <button
                      onClick={() => setRejectModal({ type: 'listing', item: listing, email: listing.seller_email })}
                      style={{ padding: '8px 16px', background: '#fff', color: '#c0392b', border: '1px solid #f5c6c2', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', flexShrink: 0 }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}