export type Solution = {
  slug: 'oficinas' | 'retail' | 'salud'
  name: string
  excerpt: string
  description: string
  painPoints: string[]
  deliverables: string[]
  differentiators: string[]
  metrics: { label: string; value: string }[]
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export const solutions: Solution[] = [
  {
    slug: 'oficinas',
    name: 'Oficinas corporativas',
    excerpt: 'Remodelamos oficinas en bloques controlados coordinando acabados, mobiliario y sistemas TI sin frenar operaciones.',
    description:
      'El equipo SG planifica ventanas nocturnas o fines de semana para renovar oficinas activas, coordinando acabados, mobiliario y sistemas MEP bajo un solo frente.',
    painPoints: [
      'Plazos cortos y fases en horario extendido',
      'Coexistencia con equipos que siguen trabajando',
      'Actualizacion de cableado y HVAC sin detener servicios'
    ],
    deliverables: [
      'Cronograma por bloques con hitos de aprobacion',
      'Equipos especialistas en drywall, pisos, pintura y mobiliario',
      'Integracion de redes, climatizacion y control de acceso'
    ],
    differentiators: [
      'Mockups de estaciones y salas para aprobar acabados',
      'Plan de mudanza y reinstalacion de puestos',
      'Capacitacion a facilities y entrega de manuales'
    ],
    metrics: [
      { label: 'Plazo tipico', value: '6-10 semanas' },
      { label: 'Bloques nocturnos', value: 'Hasta 5 simultaneos' },
      { label: 'Puestos habilitados', value: '100-600' }
    ],
    primaryCta: {
      label: 'Agendar visita a oficinas',
      href: '/cotizar?sector=oficinas'
    },
    secondaryCta: {
      label: 'Ver portafolio de productos',
      href: '/productos'
    }
  },
  {
    slug: 'retail',
    name: 'Retail y hospitality',
    excerpt: 'Abrimos tiendas y locales en fechas de lanzamiento coordinando arquitectura, mobiliario y sistemas audiovisuales.',
    description:
      'SG Acabados gestiona aperturas de tiendas y locales de atencion al publico donde el tiempo en obra impacta ventas, alineando proveedores y mall management.',
    painPoints: [
      'Fechas de apertura fijas por campanas',
      'Coordinacion con mall management y requisitos de seguridad',
      'Instalacion de mobiliario y branding simultaneo'
    ],
    deliverables: [
      'Plan de obra fast track con hitos de inspeccion',
      'Fabricacion modular de mobiliario y cajas',
      'Integracion de audio, digital signage y POS'
    ],
    differentiators: [
      'Control de calidad diario y reportes fotograficos',
      'Equipos nocturnos para trabajar fuera de horario comercial',
      'Soporte para reposiciones y aperturas escalonadas'
    ],
    metrics: [
      { label: 'Plazo tipico', value: '3-6 semanas' },
      { label: 'Tiendas entregadas', value: '120+' },
      { label: 'Especialidades', value: 'Arquitectura, MEP, branding' }
    ],
    primaryCta: {
      label: 'Programar kickoff retail',
      href: '/cotizar?sector=retail'
    },
    secondaryCta: {
      label: 'Solicitar brochure retail',
      href: '/cotizar?descarga=retail'
    }
  },
  {
    slug: 'salud',
    name: 'Salud y laboratorios',
    excerpt: 'Adecuamos clinicas y laboratorios con acabados sanitarios, HVAC y equipos especiales asegurando continuidad de servicios.',
    description:
      'Disenamos y ejecutamos obras en clinicas, centros ambulatorios y laboratorios cumpliendo normativas sanitarias y validaciones de calidad.',
    painPoints: [
      'Aislamiento de areas criticas y control de particulas',
      'Coordinacion con equipos medicos y calibracion',
      'Trazabilidad documental para auditorias'
    ],
    deliverables: [
      'Pisos conductivos, cielos sanitarios y carpinteria en PVC o acero',
      'Sistemas HVAC con presiones diferenciales',
      'Integracion de gases medicos y monitoreo ambiental'
    ],
    differentiators: [
      'Protocolos de bioseguridad y EPP especializado',
      'Comisionamiento con registros y pruebas de sala limpia',
      'Garantia extendida y plan de mantenimiento preventivo'
    ],
    metrics: [
      { label: 'Plazo tipico', value: '8-12 semanas' },
      { label: 'Areas intervenidas', value: 'UBC, UPC, laboratorio' },
      { label: 'Certificaciones', value: 'ISO 14644, ASHRAE 170' }
    ],
    primaryCta: {
      label: 'Coordinar visita sanitaria',
      href: '/cotizar?sector=salud'
    },
    secondaryCta: {
      label: 'Solicitar ficha tecnica',
      href: '/cotizar?descarga=salud'
    }
  }
]

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug)
}
