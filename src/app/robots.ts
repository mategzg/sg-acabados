import type { MetadataRoute } from 'next'

function normalizeBase() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ?? ''
  if (!raw) return ''
  return raw.endsWith('/es') ? raw.slice(0, -3) : raw
}

export default function robots(): MetadataRoute.Robots {
  const origin = normalizeBase()
  const sitemapUrl = origin ? `${origin}/sitemap.xml` : '/sitemap.xml'

  const robotsConfig: MetadataRoute.Robots = {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: [sitemapUrl]
  }

  if (origin) {
    robotsConfig.host = origin
  }

  return robotsConfig
}
