import type { Locale } from '@/lib/i18n-config'

export type Dictionary = typeof dictionary

const dictionary = {
  locale: 'es' as Locale,
  routes: {
    home: 'Inicio',
    services: 'Servicios',
    projects: 'Proyectos',
    about: 'Nosotros',
    contact: 'Contacto',
    privacy: 'Política de privacidad',
    terms: 'Términos y condiciones'
  },
  messages: {
    whatsappCta: 'Hablar por WhatsApp',
    requestQuote: 'Solicitar cotización',
    secondaryCta: 'Ver servicios',
    contactHeadline: 'Cuéntanos sobre tu proyecto'
  }
}

export default dictionary

