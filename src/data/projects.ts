import type { LucideIcon } from 'lucide-react'
import { Clock4, Layers3, MapPin, Ruler, Sparkles } from 'lucide-react'

export type ProjectMetric = {
  label: string
  value: string
  icon: LucideIcon
}

export type FeaturedProject = {
  id: string
  name: string
  sector: string
  summary: string
  metrics: ProjectMetric[]
  image: { src: string; alt: string }
  href: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'jorge-chavez',
    name: 'Aeropuerto Internacional Jorge Chávez  Ampliación',
    sector: 'Aeropuertos y transporte',
    summary: 'Suministro e instalación de tabiquería de drywall para el terminal del proyecto de ampliación.',
    metrics: [
      { label: 'Metros intervenidos', value: '3 200 m2', icon: Ruler },
      { label: 'Especialidades', value: 'Tabiquería drywall', icon: Layers3 },
      { label: 'Plazo', value: '8 semanas', icon: Clock4 }
    ],
    image: {
      src: '/images/proyectos/aeropuerto-jorge-chavez-1.jpg',
      alt: 'Sala de embarque renovada en el aeropuerto Jorge Chávez'
    },
    href: '/proyectos/aeropuerto-jorge-chavez'
  },
  {
    id: 'videna-control-solar',
    name: 'VIDENA  Sistema de Control Solar y de Vientos',
    sector: 'Deportes / Infraestructura',
    summary: 'Venta e instalación de sistemas de control solar y vientos con celosías de lamas orientables exteriores.',
    metrics: [
      { label: 'Especialidades', value: 'Control solar, celosías orientables', icon: Layers3 },
      { label: 'Ubicación', value: 'San Luis, Lima', icon: MapPin },
      { label: 'Entrega', value: 'Junio 2019', icon: Clock4 }
    ],
    image: {
      src: '/images/proyectos/videna-centro-deportivo-1.jpg',
      alt: 'Celosías orientables instaladas en la VIDENA'
    },
    href: '/proyectos/videna-centro-deportivo'
  },
  {
    id: 'tecsup-auditorio',
    name: 'TECSUP  Auditorio (Sede Arequipa)',
    sector: 'Educación',
    summary: 'Construcción de auditorio con tabiquería, cielos rasos, recubrimiento de pisos, butacas e iluminación.',
    metrics: [
      { label: 'Alcance', value: 'Auditorio sede Arequipa', icon: Layers3 },
      { label: 'Especialidades', value: 'Tabiquería, cielos, butacas', icon: Sparkles },
      { label: 'Entrega', value: '2017', icon: Clock4 }
    ],
    image: {
      src: '/images/placeholders/generic-card.webp',
      alt: 'Vista referencial de auditorio TECSUP en Arequipa'
    },
    href: '/cotizar?proyecto=tecsup-auditorio-arequipa'
  }
]

