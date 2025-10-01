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
    privacy: 'Politica de privacidad',
    terms: 'Terminos y condiciones'
  },
  messages: {
    whatsappCta: 'Hablar por WhatsApp',
    requestQuote: 'Solicitar cotizacion',
    secondaryCta: 'Ver servicios',
    contactHeadline: 'Cuentanos sobre tu proyecto'
  }
}

export default dictionary

