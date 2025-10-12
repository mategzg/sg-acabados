import type { LucideIcon } from 'lucide-react'
import {
  Layers3,
  Lightbulb,
  SunMedium,
  Armchair,
  Building2,
  Settings2
} from 'lucide-react'

export type ServiceItem = {
  id: string
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export const services: ServiceItem[] = [
  {
    id: 'pisos',
    title: 'Pisos vinílicos y técnicos',
    description: 'Sistemas vinílicos, porcelanato y superficies deportivas listos para tráfico alto y mantenimiento sencillo.',
    href: '/productos',
    icon: Layers3
  },
  {
    id: 'iluminacion',
    title: 'Iluminación',
    description: 'Proyectos de iluminación interior y exterior con fotometría, escenas programables y eficiencia energética.',
    href: '/productos',
    icon: Lightbulb
  },
  {
    id: 'control-solar',
    title: 'Control solar y envolventes',
    description: 'Cortinas screen, persianas, toldos y soluciones de protección solar adaptadas a cada fachada.',
    href: '/productos',
    icon: SunMedium
  },
  {
    id: 'mobiliario',
    title: 'Mobiliario y butacas',
    description: 'Líneas corporativas, hospitalarias y butacas premium con ergonomía y garantía postventa.',
    href: '/productos',
    icon: Armchair
  },
  {
    id: 'sistemas',
    title: 'Sistemas integrales',
    description: 'Aire acondicionado, CCTV, audio y fire protection coordinados con certificaciones y puesta en marcha.',
    href: '/soluciones/oficinas',
    icon: Settings2
  },
  {
    id: 'obra',
    title: 'Obra y supervisión',
    description: 'Coordinación BIM, supervisión en campo y control de plazos para entregar en la fecha acordada.',
    href: '/soluciones',
    icon: Building2
  }
]

