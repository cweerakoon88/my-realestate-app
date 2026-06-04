import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, service } = body

    if (!name || !email || !message || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'PropOffer <hello@propoffer.com.au>',
      to: ['callum.weerakoon@gmail.com', 'hello@propoffer.com.au'],
      replyTo: email,
      subject: `New enquiry: ${service} — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #faf8f3; border: 1px solid #e8e0d0;">
          <div style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #e8e0d0;">
            <p style="font-family: sans-serif; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #b8924a; margin: 0 0 8px;">PropOffer · New Service Enquiry</p>
            <h1 style="font-size: 1.8rem; font-weight: 300; color: #1a1714; margin: 0;">${service}</h1>
          </div>

          <table style="width: 100%; font-family: sans-serif; font-size: 14px; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #aaa; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #1a1714; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #aaa;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #1a1714;">
                <a href="mailto:${email}" style="color: #b8924a;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #aaa;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; color: #1a1714;">${phone || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #1a1714; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>

          <div style="background: #f5ecd8; padding: 1rem 1.25rem; border-radius: 4px; font-family: sans-serif; font-size: 13px; color: #4a4540;">
            <strong style="color: #b8924a;">Next step:</strong> Forward this to your ${service} provider or reply directly to ${email}.
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