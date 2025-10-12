const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const normalizedSiteUrl = rawSiteUrl.replace(/\/+$/, '').replace(/\/es$/, '')

export const siteConfig = {
  name: 'SG Acabados',
  legalName: 'SG Acabados S.A.C.',
  description:
    'Acabados integrales, mobiliario y sistemas para proyectos corporativos y de infraestructura en todo el Perú.',
  keywords: [
    'acabados integrales',
    'pisos vinílicos',
    'iluminación',
    'mobiliario corporativo',
    'control solar',
    'SG Servicios Generales'
  ],
  experienceYears: 20,
  siteUrl: normalizedSiteUrl,
  whatsapp: {
    number: '+51 959 375 235',
    link: 'https://wa.me/51959375235'
  },
  offices: [
    { city: 'Arequipa', address: 'Calle Misti 134, Yanahuara' }
  ],
  contact: {
    email: 'sgacabadossac@gmail.com',
    phone: '+51 959 375 235'
  },
  navigation: {
    main: [
      { label: 'Productos', href: '/productos' },
      { label: 'Soluciones', href: '/soluciones' },
      { label: 'Proyectos', href: '/proyectos' },
      { label: 'Nosotros', href: '/nosotros' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'Cotizar', href: '/cotizar' }
    ],
    footer: [
      { label: 'Descargar catálogo', href: '/descargas/CATALOGO-SG-2025.pdf', external: true },
      { label: 'Política de privacidad', href: '/politica-privacidad' },
      { label: 'Términos y condiciones', href: '/terminos-condiciones' }
    ]
  },
  hero: {
    title: 'Acabados que elevan y cumplen plazos',
    subtitle: 'Pisos, iluminación, control solar, mobiliario y sistemas integrales para proyectos en todo el Perú.',
    primaryCta: { label: 'Solicitar cotización', href: '/cotizar' },
    secondaryCta: { label: 'Ver proyectos', href: '/proyectos' }
  }
}

export type SiteConfig = typeof siteConfig
