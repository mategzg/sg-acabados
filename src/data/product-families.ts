export type ProductFamily = {
  id: string
  name: string
  description: string
  image: {
    src: string
    alt: string
  }
  highlights: string[]
  href: string
}

export const productFamilies: ProductFamily[] = [
  {
    id: 'pisos-vinilicos',
    name: 'Pisos vinilicos y SPC',
    description:
      'Soluciones de alto tránsito con instalación flotante o pegada que aseguran continuidad visual y mantenimiento rápido.',
    image: {
      src: '/images/familias/pisos-1.jpg',
      alt: 'Pisos vinilicos instalados en oficina corporativa'
    },
    highlights: ['Garantía hasta 15 años', 'Resistentes a humedad y rayones', 'Instalación limpia y rápida'],
    href: '/cotizar?interes=pisos'
  },
  {
    id: 'iluminacion',
    name: 'Iluminación',
    description:
      'Luminarias LED con control DALI y escenas configurables para oficinas, retail y espacios de atención al cliente.',
    image: {
      src: '/images/familias/iluminacion-1.jpg',
      alt: 'Iluminación en sala de reuniones'
    },
    highlights: ['Eficiencia energética certificada', 'Layouts fotométricos incluidos', 'Integración con BMS existente'],
    href: '/cotizar?interes=iluminacion'
  },
  {
    id: 'control-solar',
    name: 'Control solar y blackout',
    description:
      'Cortinas roller, panel track y sistemas automatizados que controlan el deslumbramiento y la temperatura interior.',
    image: {
      src: '/images/familias/control-solar-1.jpg',
      alt: 'Cortinas roller motorizadas en sala de directorio'
    },
    highlights: ['Tejidos certificados Greenguard', 'Motorización Somfy y Lutron', 'Programación segun horario solar'],
    href: '/cotizar?interes=control-solar'
  },
  {
    id: 'mobiliario-corporativo',
    name: 'Mobiliario corporativo',
    description:
      'Workstations, salas colaborativas y recepciones con fabricación modular que optimiza montaje y cableado.',
    image: {
      src: '/images/familias/mobiliario-1.jpg',
      alt: 'Mobiliario corporativo modular en open space'
    },
    highlights: ['Configurable por celula', 'Ergonomia certificada BIFMA', 'Integración con electrificación oculta'],
    href: '/cotizar?interes=mobiliario'
  },
  {
    id: 'recubrimientos-verticales',
    name: 'Recubrimientos verticales',
    description:
      'Paneles acústicos, revestimientos en MDF laminado y pieles metalicas para auditorios, retail y hospitality.',
    image: {
      src: '/images/familias/recubrimientos-ventanas-1.jpg',
      alt: 'Revestimientos acústicos en lobby corporativo'
    },
    highlights: ['Absorción acústica NRC 0.75', 'Tratamientos ignifugos certificados', 'Diseños curvos y volumetricos'],
    href: '/cotizar?interes=recubrimientos'
  },
  {
    id: 'sistemas-integrales',
    name: 'Sistemas integrales',
    description:
      'Cielos modulares, tabiqueria, HVAC, cableado y seguridad electronica coordinados bajo un unico frente.',
    image: {
      src: '/images/familias/sistemas-integrales-1.jpg',
      alt: 'Sala de control con sistemas integrales instalados'
    },
    highlights: ['Single point of contact', 'Comisionamiento documentado', 'Soporte post entrega 12 meses'],
    href: '/cotizar?interes=sistemas-integrales'
  }
]

