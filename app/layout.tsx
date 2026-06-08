import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ── CORE ────────────────────────────────────────────────────────────
  title: {
    default: "PropOffer — Australia's Buyer-First Property Marketplace",
    template: "%s | PropOffer",
  },
  description:
    "Buyers post exactly what they want. Sellers respond directly. Free for buyers, from $49 for sellers. No auctions, no agent commissions, no boards. Australia's buyer-first property marketplace.",

  // ── KEYWORDS ────────────────────────────────────────────────────────
  keywords: [
    "property marketplace Australia",
    "buy property without auction",
    "sell house privately Melbourne",
    "off market property Australia",
    "buyer first property platform",
    "sell property without agent",
    "no commission property sale",
    "private property sale Australia",
    "property requirements marketplace",
    "sell house without real estate agent",
    "off market property Melbourne",
    "property buyers Australia",
    "propoffer",
  ],

  // ── CANONICAL & ROBOTS ──────────────────────────────────────────────
  metadataBase: new URL("https://propoffer.com.au"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── OPEN GRAPH ──────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://propoffer.com.au",
    siteName: "PropOffer",
    title: "PropOffer — Australia's Buyer-First Property Marketplace",
    description:
      "Buyers post exactly what they want. Sellers respond directly. Free for buyers, from $49. No auctions, no commissions, no boards.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PropOffer — Buyers post. Sellers respond.",
      },
    ],
  },

  // ── TWITTER / X ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "PropOffer — Australia's Buyer-First Property Marketplace",
    description:
      "Buyers post exactly what they want. Sellers respond directly. Free for buyers, from $49 for sellers.",
    images: ["/og-image.png"],
  },

  // ── ICONS ───────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* ── STRUCTURED DATA — Google rich results ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PropOffer",
              url: "https://propoffer.com.au",
              description:
                "Australia's buyer-first property marketplace. Buyers post requirements, sellers respond directly.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://propoffer.com.au/marketplace?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* ── ORGANISATION SCHEMA ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PropOffer",
              url: "https://propoffer.com.au",
              logo: "https://propoffer.com.au/og-image.png",
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@propoffer.com.au",
                contactType: "customer service",
                areaServed: "AU",
                availableLanguage: "English",
              },
              sameAs: ["https://www.linkedin.com/company/propoffer"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Melbourne",
                addressRegion: "VIC",
                addressCountry: "AU",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>

        {/* ── META PIXEL — uncomment and add Pixel ID when ready ──
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID_HERE');
              fbq('track', 'PageView');
            `,
          }}
        />
        ── */}

        {/* ── GOOGLE ANALYTICS — uncomment and add GA4 ID when ready ──
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        ── */}
      </body>
    </html>
  );
}
