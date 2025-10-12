import type { LucideIcon } from 'lucide-react'
import { Clock4, Layers3, Ruler, Sparkles, Stethoscope } from 'lucide-react'

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
    name: 'Aeropuerto Jorge Chavez',
    sector: 'Aeropuertos',
    summary: 'Renovacion de salas de embarque con pisos vinilicos, control solar y sistemas de audio evac.',
    metrics: [
      { label: 'Metros intervenidos', value: '3 200 m2', icon: Ruler },
      { label: 'Especialidades', value: 'Pisos, audio, control solar', icon: Layers3 },
      { label: 'Plazo', value: '8 semanas', icon: Clock4 }
    ],
    image: {
      src: '/images/proyectos/aeropuerto-jorge-chavez-1.jpg',
      alt: 'Hall del aeropuerto Jorge Chavez con acabados SG'
    },
    href: '/proyectos/aeropuerto-jorge-chavez'
  },
  {
    id: 'cineplanet-cayma',
    name: 'Cineplanet Cayma',
    sector: 'Retail',
    summary: 'Implementacion integral de salas premium con butacas, iluminacion y revestimientos acusticos.',
    metrics: [
      { label: 'Metros intervenidos', value: '1 450 m2', icon: Ruler },
      { label: 'Especialidades', value: 'Mobiliario, iluminacion', icon: Sparkles },
      { label: 'Plazo', value: '6 semanas', icon: Clock4 }
    ],
    image: {
      src: '/images/proyectos/cineplanet-cayma-1.jpg',
      alt: 'Sala de cine Cineplanet Cayma con iluminacion indirecta'
    },
    href: '/proyectos/cineplanet-cayma'
  },
  {
    id: 'clinica-arequipa',
    name: 'Clinica Arequipa',
    sector: 'Salud',
    summary: 'Pisos conductivos, carpinteria sanitaria y sistemas HVAC en areas criticas de hospitalizacion.',
    metrics: [
      { label: 'Metros intervenidos', value: '2 100 m2', icon: Ruler },
      { label: 'Especialidades', value: 'Pisos, HVAC, carpinteria', icon: Stethoscope },
      { label: 'Plazo', value: '10 semanas', icon: Clock4 }
    ],
    image: {
      src: '/images/proyectos/clinica-arequipa-1.jpg',
      alt: 'Pasillo de la Clinica Arequipa con acabados sanitarios'
    },
    href: '/proyectos/clinica-arequipa'
  }
]
