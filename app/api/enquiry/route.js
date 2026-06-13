import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// In-memory rate limiter: max 5 requests per IP per 10 minutes
const rateLimitMap = new Map()
const RATE_LIMIT = 5
const WINDOW_MS = 10 * 60 * 1000

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip) || { count: 0, start: now }
  if (now - entry.start > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, start: now })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  rateLimitMap.set(ip, { count: entry.count + 1, start: entry.start })
  return true
}

// Escape HTML entities to prevent XSS in email body
function escapeHtml(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

export async function POST(request) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before sending another message.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, message, service } = body

    // Presence check
    if (!name || !email || !message || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Type check — all must be strings
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      typeof service !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid input types' }, { status: 400 })
    }

    // Length limits
    if (name.length > 100) {
      return NextResponse.json({ error: 'Name must be under 100 characters' }, { status: 400 })
    }
    if (email.length > 254) {
      return NextResponse.json({ error: 'Email address is too long' }, { status: 400 })
    }
    if (message.length > 3000) {
      return NextResponse.json({ error: 'Message must be under 3000 characters' }, { status: 400 })
    }
    if (service.length > 200) {
      return NextResponse.json({ error: 'Service field is too long' }, { status: 400 })
    }

    // Email format validation (server-side — not just client)
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    // Sanitise all user-supplied values before interpolating into HTML
    const safeName    = escapeHtml(name.trim())
    const safeEmail   = escapeHtml(email.trim().toLowerCase())
    const safePhone   = escapeHtml((phone || '').trim())
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>')
    const safeService = escapeHtml(service.trim())

    const { error } = await resend.emails.send({
      from: 'PropOffer <hello@propoffer.com.au>',
      to: ['callum.weerakoon@gmail.com', 'hello@propoffer.com.au'],
      replyTo: safeEmail,
      subject: `New enquiry: ${safeService} — ${safeName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #faf8f3; border: 1px solid #e8e0d0;">
          <div style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #e8e0d0;">
            <p style="font-family: sans-serif; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #b8924a; margin: 0 0 8px;">PropOffer · New Service Enquiry</p>
            <h1 style="font-size: 1.8rem; font-weight: 300; color: #1a1714; margin: 0;">${safeService}</h1>
          </div>

          <table style="width: 100%; font-family: sans-serif; font-size: 14px; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #aaa; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #1a1714; font-weight: 500;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #aaa;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #1a1714;">
                <a href="mailto:${safeEmail}" style="color: #b8924a;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #aaa;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #1a1714;">${safePhone || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #1a1714; line-height: 1.6;">${safeMessage}</td>
            </tr>
          </table>

          <div style="background: #f5ecd8; padding: 1rem 1.25rem; border-radius: 4px; font-family: sans-serif; font-size: 13px; color: #4a4540;">
            <strong style="color: #b8924a;">Next step:</strong> Forward this to your ${safeService} provider or reply directly to ${safeEmail}.
          </div>

          <p style="font-family: sans-serif; font-size: 11px; color: #bbb; margin-top: 2rem; text-align: center;">
            PropOffer · Australia's buyer-first property platform · propoffer.com.au
          </p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
