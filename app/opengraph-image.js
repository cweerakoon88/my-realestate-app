import { ImageResponse } from 'next/og'

export const alt = 'PropOffer — Buyers post. Sellers respond.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INK = '#1A1714'
const GOLD = '#B8924A'
const CHAMPAGNE = '#C9A96E'
const TAGLINE = 'Buyers post. Sellers respond.'
const SUBLINE = "AUSTRALIA'S BUYER-FIRST PROPERTY MARKETPLACE"

// Load the brand fonts (Cormorant Garamond for the wordmark, DM Sans for the
// taglines). Falls back to the default font if Google Fonts can't be reached.
async function loadFont(family, text) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)).text()
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
    return url ? await (await fetch(url)).arrayBuffer() : null
  } catch {
    return null
  }
}

export default async function Image() {
  const [serif, sans] = await Promise.all([
    loadFont('Cormorant+Garamond:wght@600', 'PROPOFFER'),
    loadFont('DM+Sans:wght@400', TAGLINE + SUBLINE),
  ])
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: INK, alignItems: 'center', padding: '0 90px', fontFamily: 'DM Sans' }}>
        <div style={{ position: 'absolute', top: 24, left: 24, right: 24, bottom: 24, border: `1px solid ${CHAMPAGNE}`, display: 'flex' }} />
        <svg width="250" height="284" viewBox="0 0 88 100" style={{ marginRight: '80px' }}>
          <path d="M44 3 L82 14 V48 C82 72 66 88 44 97 C22 88 6 72 6 48 V14 Z" fill="#26211c" stroke={CHAMPAGNE} strokeWidth="2.5" />
          <path d="M44 10 L75 19 V48 C75 68 62 81 44 89 C26 81 13 68 13 48 V19 Z" fill="none" stroke={CHAMPAGNE} strokeWidth="0.9" opacity="0.75" />
          <path d="M24 44 L44 28 L64 44" fill="none" stroke={CHAMPAGNE} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M37 72 V44 h10 a8.5 8.5 0 0 1 0 17 h-10" fill="none" stroke="#ffffff" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 104, color: '#ffffff', letterSpacing: '12px', fontFamily: 'Cormorant' }}>
            PROP<span style={{ color: GOLD }}>OFFER</span>
          </div>
          <div style={{ width: 560, height: 2, background: CHAMPAGNE, marginTop: 18, display: 'flex' }} />
          <div style={{ fontSize: 34, color: '#ffffff', marginTop: 28 }}>{TAGLINE}</div>
          <div style={{ fontSize: 22, color: '#a89c8c', marginTop: 14, letterSpacing: '3px' }}>{SUBLINE}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        serif && { name: 'Cormorant', data: serif, weight: 600, style: 'normal' },
        sans && { name: 'DM Sans', data: sans, weight: 400, style: 'normal' },
      ].filter(Boolean),
    },
  )
}
