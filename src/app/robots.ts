import type { MetadataRoute } from 'next'

function resolveHost() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sgsac.com'
  return raw.replace(/\/+$/, '').replace(/\/es$/, '')
}

export default function robots(): MetadataRoute.Robots {
  const host = resolveHost()

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: [`${host}/sitemap.xml`],
    host
  }
}
