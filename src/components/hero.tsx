'use client'

import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/localized-link'
import { CalendarCheck, Layers3, MapPin } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { trackWhatsapp } from '@/lib/gtag'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'

const highlights = [
  {
    icon: Layers3,
    label: '6 especialidades coordinadas'
  },
  {
    icon: CalendarCheck,
    label: 'Plazos asegurados desde la propuesta'
  },
  {
    icon: MapPin,
    label: 'Equipos desplegables en todo el Peru'
  }
]

export function Hero() {
  return (
    <section className="relative overflow-hidden py-space-3xl lg:py-space-4xl">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-brand-marfil/60 to-white" aria-hidden="true" />
      <div className="container grid gap-space-2xl lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="space-y-space-xl md:space-y-space-2xl">
          <div className="space-y-space-xs sm:space-y-space-sm">
            <Badge variant="accent" className="w-fit">Especialistas multi disciplina</Badge>
            <h1 className="max-w-2xl text-balance font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl xl:text-6xl">
              {siteConfig.hero.title}
            </h1>
            <p className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg md:text-xl">
              {siteConfig.hero.subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-space-sm sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={siteConfig.hero.primaryCta.href}>{siteConfig.hero.primaryCta.label}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href={siteConfig.hero.secondaryCta.href}>{siteConfig.hero.secondaryCta.label}</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-center text-sm sm:w-auto">
              <a
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsapp('hero')}
              >
                WhatsApp directo
              </a>
            </Button>
          </div>
          <ul className="grid gap-space-sm sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-space-xs rounded-2xl bg-white/80 px-space-md py-space-sm text-sm text-muted-foreground shadow-soft backdrop-blur"
                >
                  <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="font-medium text-foreground/80">{item.label}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="relative lg:-mr-10">
          <div className="absolute -right-10 top-10 hidden h-56 w-56 rounded-full bg-brand-arena/30 blur-3xl lg:block" aria-hidden="true" />
          <div className="relative min-h-[300px] overflow-hidden rounded-4xl border border-border/60 shadow-soft sm:min-h-[380px] lg:aspect-[4/5]">
            <Image
              src="/images/hero/equipo-obra.jpg"
              alt="Equipo SG Acabados en obra"
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL={DEFAULT_BLUR_DATA_URL}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-carbon/85 to-transparent p-space-md text-sm text-white sm:text-base">
              +{siteConfig.experienceYears} años cumpliendo entregas multisede
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
