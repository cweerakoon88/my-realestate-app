const BASE = 'https://www.propoffer.com.au'

// sitemap.xml — PropOffer's public pages.
export default function sitemap() {
  return [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/marketplace', priority: 0.9, changeFrequency: 'hourly' },
    { path: '/services', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/calculator', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/hardship', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  ].map(p => ({ url: `${BASE}${p.path}`, lastModified: new Date(), changeFrequency: p.changeFrequency, priority: p.priority }))
}
