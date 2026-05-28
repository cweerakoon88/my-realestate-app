import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PRICES = {
  basic: {
    name: 'Basic Listing',
    description: '1 property listing for 60 days · Visible to all buyers · Up to 8 photos',
    amount: 4900, // $49.00 AUD in cents
  },
  featured: {
    name: 'Featured Listing',
    description: 'Pinned at top for 30 days · AI-matched to buyers · Verified seller badge · Priority support',
    amount: 9900, // $99.00 AUD in cents
  },
}

export async function POST(request) {
  try {
    const { plan } = await request.json()

    if (!PRICES[plan]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const price = PRICES[plan]
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://propoffer.com.au'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: price.name,
              description: price.description,
            },
            unit_amount: price.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payment/success?plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?cancelled=true`,
      metadata: {
        plan,
      },
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: false },
      custom_text: {
        submit: {
          message: 'Your listing will go live immediately after payment. Our team will be in touch within 24 hours.',
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}