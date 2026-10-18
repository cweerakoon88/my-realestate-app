import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// iPhone / iPad home-screen icon: the PropOffer crest on cream.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF8F3' }}>
        <svg width="118" height="134" viewBox="0 0 88 100">
          <path d="M44 3 L82 14 V48 C82 72 66 88 44 97 C22 88 6 72 6 48 V14 Z" fill="#1A1714" stroke="#C9A96E" stroke-width="2.5" />
          <path d="M44 10 L75 19 V48 C75 68 62 81 44 89 C26 81 13 68 13 48 V19 Z" fill="none" stroke="#C9A96E" stroke-width="0.9" opacity="0.75" />
          <path d="M24 44 L44 28 L64 44" fill="none" stroke="#C9A96E" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M37 72 V44 h10 a8.5 8.5 0 0 1 0 17 h-10" fill="none" stroke="#ffffff" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    ),
    size,
  )
}
