export type ProjectShowcase = {
  id: string
  name: string
  sector: 'Oficinas' | 'Retail' | 'Salud'
  location: string
  area: string
  areaM2: number
  timeframe: string
  summary: string
  challenges: string[]
  solution: string[]
  results: string[]
  specialties: string[]
  image: {
    src: string
    alt: string
  }
  href: string
}

export const projectShowcase: ProjectShowcase[] = [
  {
    id: 'jorge-chavez-terminal',
    name: 'Aeropuerto Jorge Chavez',
    sector: 'Retail',
    location: 'Callao, Lima',
    area: '3 200 m2',
    areaM2: 3200,
    timeframe: '8 semanas',
    summary: 'Modernizamos salas de embarque coordinando pisos vinilicos, control solar y sistemas de audio evacuacion en horario nocturno.',
    challenges: [
      'Trabajos nocturnos sin cerrar operaciones',
      'Compatibilizar cableado de audio, voz y datos',
      'Control de polvo y limpieza entre turnos'
    ],
    solution: [
      'Instalacion de pisos SPC con juntas selladas',
      'Cortinas roller screen y blackout motorizadas',
      'Sistema de audio evacuacion en rack centralizado'
    ],
    results: [
      'Reapertura de salas sin retrasos',
      'Satisfaccion del operador aeroportuario',
      'Reduccion de tiempos de limpieza post turno'
    ],
    specialties: ['Pisos vinilicos', 'Control solar', 'Audio evacuacion'],
    image: {
      src: '/images/proyectos/aeropuerto-jorge-chavez-1.jpg',
      alt: 'Sala de embarque renovada en el aeropuerto Jorge Chavez'
    },
    href: '/cotizar?proyecto=jorge-chavez'
  },
  {
    id: 'cineplanet-cayma',
    name: 'Cineplanet Cayma',
    sector: 'Retail',
    location: 'Arequipa',
    area: '1 450 m2',
    areaM2: 1450,
    timeframe: '6 semanas',
    summary: 'Implementamos salas premium con mobiliario custom, iluminacion escenica y revestimientos acusticos.',
    challenges: [
      'Plazo fijo previo al estreno de temporada',
      'Coordinacion con mall management para descargas nocturnas',
      'Integracion de butacas motorizadas y audio envolvente'
    ],
    solution: [
      'Fabricacion modular de butacas premium y barras',
      'Iluminacion LED regulable con escenas preprogramadas',
      'Paneles acusticos y control de sonido certificado'
    ],
    results: [
      'Apertura en fecha de estreno',
      'Experiencia premium validada por cliente',
      'Reduccion de ruido a salas contiguas'
    ],
    specialties: ['Mobiliario', 'Iluminacion', 'Revestimientos acusticos'],
    image: {
      src: '/images/proyectos/cineplanet-cayma-1.jpg',
      alt: 'Sala premium Cineplanet Cayma con iluminacion indirecta'
    },
    href: '/cotizar?proyecto=cineplanet'
  },
  {
    id: 'clinica-arequipa',
    name: 'Clinica Arequipa',
    sector: 'Salud',
    location: 'Arequipa',
    area: '2 100 m2',
    areaM2: 2100,
    timeframe: '10 semanas',
    summary: 'Adecuamos areas criticas con pisos conductivos, carpinteria sanitaria y HVAC con presiones diferenciales.',
    challenges: [
      'Intervencion por etapas con areas en servicio',
      'Validaciones de presion positiva y particulado',
      'Trazabilidad documental para auditorias clinicas'
    ],
    solution: [
      'Pisos conductivos con soldadura termo fusion',
      'Cielos sanitarios y puertas hermeticas en PVC',
      'HVAC con monitoreo continuo de presiones y temperatura'
    ],
    results: [
      'Habilitacion de UCI y salas de procedimientos',
      'Auditoria sanitaria aprobada sin observaciones',
      'Plan de mantenimiento preventivo entregado'
    ],
    specialties: ['Pisos conductivos', 'Cielos sanitarios', 'HVAC sanitario'],
    image: {
      src: '/images/proyectos/clinica-arequipa-1.jpg',
      alt: 'Pasillo clinica Arequipa con acabados sanitarios'
    },
    href: '/cotizar?proyecto=clinica-arequipa'
  }
]