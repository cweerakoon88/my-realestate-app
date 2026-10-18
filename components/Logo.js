// PropOffer heritage crest — sibling of the CarOffer crest: an ink shield with a
// champagne-gold double border, a gold roofline and a white "P".
export const BRAND = {
  ink: '#1A1714',
  gold: '#B8924A',
  champagne: '#C9A96E',
}

export function Crest({ size = 36, title }) {
  const height = Math.round(size * 100 / 88)
  return (
    <svg width={size} height={height} viewBox="0 0 88 100" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d="M44 3 L82 14 V48 C82 72 66 88 44 97 C22 88 6 72 6 48 V14 Z" fill={BRAND.ink} stroke={BRAND.champagne} strokeWidth="2.5" />
      <path d="M44 10 L75 19 V48 C75 68 62 81 44 89 C26 81 13 68 13 48 V19 Z" fill="none" stroke={BRAND.champagne} strokeWidth="0.9" opacity="0.75" />
      <path d="M24 44 L44 28 L64 44" fill="none" stroke={BRAND.champagne} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M37 72 V44 h10 a8.5 8.5 0 0 1 0 17 h-10" fill="none" stroke="#ffffff" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Crest + "PROPOFFER" wordmark. `dark` is for ink/dark backgrounds.
export default function Logo({ size = 30, dark = false, fontSize, style }) {
  const fs = fontSize || Math.round(size * 0.62)
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(size * 0.32), ...style }}>
      <Crest size={size} />
      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif", fontWeight: 600, fontSize: fs, letterSpacing: '0.16em', lineHeight: 1, color: dark ? '#ffffff' : BRAND.ink, whiteSpace: 'nowrap' }}>
        PROP<span style={{ color: dark ? BRAND.champagne : BRAND.gold }}>OFFER</span>
      </span>
    </span>
  )
}
