export const siteConfig = {
  name: 'SG Acabados',
  legalName: 'SG Acabados S.A.C.',
  description:
    'Acabados integrales, mobiliario y sistemas para proyectos corporativos y de infraestructura en todo el Peru.',
  keywords: [
    'acabados integrales',
    'pisos vinilicos',
    'iluminacion',
    'mobiliario corporativo',
    'control solar',
    'SG Servicios Generales'
  ],
  experienceYears: 20,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
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
      { label: 'Descargar catalogo', href: '/descargas/CATALOGO-SG-2025.pdf', external: true },
      { label: 'Politica de privacidad', href: '/politica-privacidad' },
      { label: 'Terminos y condiciones', href: '/terminos-condiciones' }
    ]
  },
  hero: {
    title: 'Acabados que elevan y cumplen plazos',
    subtitle: 'Pisos, iluminacion, control solar, mobiliario y sistemas integrales para proyectos en todo el Peru.',
    primaryCta: { label: 'Solicitar cotizacion', href: '/cotizar' },
    secondaryCta: { label: 'Ver proyectos', href: '/proyectos' }
  }
}

export type SiteConfig = typeof siteConfig


