// Vendor/seller disclosure requirements differ by Australian state & territory —
// this is the single source of truth so the form, badges and admin views agree.

export const AU_STATES = [
  { code: 'VIC', name: 'Victoria' },
  { code: 'NSW', name: 'New South Wales' },
  { code: 'QLD', name: 'Queensland' },
  { code: 'WA', name: 'Western Australia' },
  { code: 'SA', name: 'South Australia' },
  { code: 'TAS', name: 'Tasmania' },
  { code: 'ACT', name: 'Australian Capital Territory' },
  { code: 'NT', name: 'Northern Territory' },
]

export const VENDOR_DISCLOSURE = {
  VIC: { documentName: "Section 32 Statement", mandatory: true, note: "Victoria requires a Section 32 (Vendor's Statement) before a buyer can sign a contract of sale." },
  NSW: { documentName: 'Vendor Disclosure Statement', mandatory: true, note: 'NSW requires prescribed documents (title, s10.7 planning certificate, sewer diagram) attached to the contract before it can be signed.' },
  QLD: { documentName: 'Seller Disclosure Statement', mandatory: true, note: 'Queensland requires a Seller Disclosure Statement (Form 2) be given to the buyer before the contract is signed.' },
  SA: { documentName: "Vendor's Statement (Form 1)", mandatory: true, note: 'South Australia requires a Form 1 Vendor Statement before the contract is signed, or the buyer may have rescission rights.' },
  ACT: { documentName: "Vendor's Statement", mandatory: true, note: "The ACT requires a Vendor's Statement, including a Section 17 certificate, attached before contracts are exchanged." },
  WA: { documentName: 'Seller Disclosure Statement', mandatory: false, note: 'WA has no single mandatory disclosure form, but sellers must disclose known defects to the buyer or agent.' },
  TAS: { documentName: 'Vendor Disclosure', mandatory: false, note: 'Tasmania has no single mandatory disclosure document, but sellers should disclose known defects and title issues.' },
  NT: { documentName: 'Vendor Disclosure', mandatory: false, note: 'The Northern Territory has no single mandatory disclosure form, but sellers should disclose known defects and title issues.' },
}

export function disclosureInfo(stateCode) {
  return VENDOR_DISCLOSURE[stateCode] || null
}

export function disclosureFieldLabel(stateCode) {
  const info = disclosureInfo(stateCode)
  return info ? info.documentName : 'Vendor disclosure statement'
}

export function disclosureOptions(stateCode) {
  const doc = disclosureFieldLabel(stateCode)
  return [
    { value: '', label: 'Select...' },
    { value: 'yes', label: `Yes — ${doc} is prepared` },
    { value: 'in_progress', label: 'In progress — being prepared by solicitor/conveyancer' },
    { value: 'no', label: 'Not yet started' },
    { value: 'na', label: stateCode ? `Not applicable in ${stateCode}` : 'Not applicable' },
  ]
}

export const DISCLOSURE_STATUS_META = {
  yes: { icon: '✅', suffix: 'ready', color: '#2d6a4f', bg: '#f0faf4' },
  in_progress: { icon: '🔄', suffix: 'in progress', color: '#7a5c00', bg: '#fffbea' },
  no: { icon: '⏳', suffix: 'not started', color: '#888', bg: '#f5f5f5' },
  na: { icon: 'ℹ', suffix: 'not applicable', color: '#888', bg: '#f5f5f5' },
}

export function disclosureBadge(stateCode, status) {
  const meta = DISCLOSURE_STATUS_META[status]
  if (!meta) return null
  const text = status === 'na'
    ? `${meta.icon} Disclosure not applicable`
    : `${meta.icon} ${disclosureFieldLabel(stateCode)} ${meta.suffix}`
  return { text, color: meta.color, bg: meta.bg }
}
