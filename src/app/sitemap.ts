import type { MetadataRoute } from 'next'

function normalizeBase() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ?? ''
  if (!raw) return ''
  return raw.endsWith('/es') ? raw.slice(0, -3) : raw
}

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = normalizeBase()
  const pages = ['/', '/productos', '/soluciones', '/proyectos', '/contacto', '/cotizar']

  return pages.map((path) => ({
    url: origin ? `${origin}${path}` : path,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7
  }))
}
