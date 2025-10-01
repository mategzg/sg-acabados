import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const origin = base ? (base as string).replace(/\/$/, '') : ''
  const urls = ['/es', '/es/productos', '/es/soluciones', '/es/proyectos', '/es/contacto', '/es/cotizar']
  return urls.map((p) => ({
    url: origin ? `${origin}${p}` : p,
    changeFrequency: 'weekly',
    priority: p === '/es' ? 1 : 0.7
  }))
}

