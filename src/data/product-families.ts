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
      'Soluciones de alto transito con instalacion flotante o pegada que aseguran continuidad visual y mantenimiento rapido.',
    image: {
      src: '/images/familias/pisos-1.jpg',
      alt: 'Pisos vinilicos instalados en oficina corporativa'
    },
    highlights: ['Garantia hasta 15 años', 'Resistentes a humedad y rayones', 'Instalacion limpia y rapida'],
    href: '/cotizar?interes=pisos'
  },
  {
    id: 'iluminacion',
    name: 'Iluminacion',
    description:
      'Luminarias LED con control DALI y escenas configurables para oficinas, retail y espacios de atencion al cliente.',
    image: {
      src: '/images/familias/iluminacion-1.jpg',
      alt: 'Iluminacion en sala de reuniones'
    },
    highlights: ['Eficiencia energetica certificada', 'Layouts fotometricos incluidos', 'Integracion con BMS existente'],
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
    highlights: ['Tejidos certificados Greenguard', 'Motorizacion Somfy y Lutron', 'Programacion segun horario solar'],
    href: '/cotizar?interes=control-solar'
  },
  {
    id: 'mobiliario-corporativo',
    name: 'Mobiliario corporativo',
    description:
      'Workstations, salas colaborativas y recepciones con fabricacion modular que optimiza montaje y cableado.',
    image: {
      src: '/images/familias/mobiliario-1.jpg',
      alt: 'Mobiliario corporativo modular en open space'
    },
    highlights: ['Configurable por celula', 'Ergonomia certificada BIFMA', 'Integracion con electrificacion oculta'],
    href: '/cotizar?interes=mobiliario'
  },
  {
    id: 'recubrimientos-verticales',
    name: 'Recubrimientos verticales',
    description:
      'Paneles acusticos, revestimientos en MDF laminado y pieles metalicas para auditorios, retail y hospitality.',
    image: {
      src: '/images/familias/recubrimientos-ventanas-1.jpg',
      alt: 'Revestimientos acusticos en lobby corporativo'
    },
    highlights: ['Absorcion acustica NRC 0.75', 'Tratamientos ignifugos certificados', 'Disenos curvos y volumetricos'],
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

