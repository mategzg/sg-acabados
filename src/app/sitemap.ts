import type { MetadataRoute } from 'next'

function resolveBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sgsac.com'
  return raw.replace(/\/+$/, '').replace(/\/es$/, '')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = resolveBaseUrl()
  const paths = ['/', '/productos', '/soluciones', '/proyectos', '/nosotros', '/contacto', '/cotizar']

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.8
  }))
}
