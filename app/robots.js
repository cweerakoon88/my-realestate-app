// robots.txt — let search engines crawl the public site, not private pages.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/account', '/post', '/api/', '/auth/', '/payment/', '/email/'] }],
    sitemap: 'https://www.propoffer.com.au/sitemap.xml',
    host: 'https://www.propoffer.com.au',
  }
}
