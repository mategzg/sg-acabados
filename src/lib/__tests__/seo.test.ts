import { describe, expect, it } from 'vitest'

import { absoluteUrl, createMetadata, resolvePath } from '@/lib/seo'

function normalizeImage(input: string | URL | undefined) {
  if (!input) {
    return undefined
  }
  return input instanceof URL ? input.href : input
}

describe('seo helpers', () => {
  it('resolves localized paths correctly', () => {
    expect(resolvePath('es', '/proyectos')).toBe('/proyectos')
    expect(resolvePath('en', '/proyectos')).toBe('/en/proyectos')
    expect(resolvePath('en', 'contacto')).toBe('/en/contacto')
  })

  it('builds absolute URLs from site config', () => {
    expect(absoluteUrl('/contacto')).toMatch(/https?:\/\//)
    expect(absoluteUrl('/contacto')).toContain('/contacto')
  })

  it('generates Open Graph metadata with local image', () => {
    const metadata = createMetadata({
      locale: 'es',
      title: 'Pagina de prueba',
      description: 'Descripcion demostrativa',
      path: '/demo'
    })

    const ogImages = metadata.openGraph?.images
    let ogUrl: string | undefined
    if (Array.isArray(ogImages)) {
      const first = ogImages[0]
      if (typeof first === 'string') {
        ogUrl = first
      } else if (first instanceof URL) {
        ogUrl = first.href
      } else {
        ogUrl = normalizeImage(first?.url)
      }
    } else if (ogImages) {
      if (typeof ogImages === 'string') {
        ogUrl = ogImages
      } else if (ogImages instanceof URL) {
        ogUrl = ogImages.href
      } else {
        ogUrl = normalizeImage(ogImages.url)
      }
    }
    expect(ogUrl).toContain('/images/og/sg-acabados.jpg')

    const twitterImages = metadata.twitter?.images
    let twitterUrl: string | undefined
    if (Array.isArray(twitterImages)) {
      const first = twitterImages[0]
      if (typeof first === 'string') {
        twitterUrl = first
      } else if (first instanceof URL) {
        twitterUrl = first.href
      } else {
        twitterUrl = normalizeImage(first?.url)
      }
    } else if (twitterImages) {
      if (typeof twitterImages === 'string') {
        twitterUrl = twitterImages
      } else if (twitterImages instanceof URL) {
        twitterUrl = twitterImages.href
      } else {
        twitterUrl = normalizeImage(twitterImages.url)
      }
    }
    expect(twitterUrl).toContain('/images/og/sg-acabados.jpg')
  })
})
