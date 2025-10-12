import type { Metadata } from 'next'
import { LocalizedLink as Link } from '@/components/localized-link'
import { WhatsappLink } from '@/components/tracked-links'
import { Mail, MessageCircle, Phone } from 'lucide-react'

import { ContactLeadForm } from '@/components/contact-form'
import { Section } from '@/components/section'
import { CatalogBanner } from '@/components/catalog-banner'
import { FinalCallToAction } from '@/components/home/final-call-to-action'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { createMetadata } from '@/lib/seo'

const mapEmbedUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=-71.5430%2C-16.3935%2C-71.5395%2C-16.3905&layer=mapnik&marker=-16.39195%2C-71.54126'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Contacto SG Acabados',
    description:
      'Agenda visitas técnicas, soporte y nuevas cotizaciones con el equipo de SG Acabados en Arequipa y proyectos a nivel nacional.',
    path: '/contacto',
    keywords: ['contacto sg acabados', 'visita técnica', 'proyectos corporativos Perú']
  })
}

const contactItems = [
  {
    label: 'Telefono',
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`
  },
  {
    label: 'Correo',
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`
  }
]

export default function ContactoPage() {
  return (
    <>
      <Section className="bg-white">
        <div className="container grid gap-space-xl lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
          <div className="space-y-space-lg">
            <div className="space-y-space-sm">
              <Badge variant="accent" className="w-fit">Contacto</Badge>
              <h1 className="text-balance font-heading text-4xl font-semibold text-foreground md:text-5xl">
                Coordina una visita con nuestro equipo
              </h1>
              <p className="max-w-2xl text-balance text-muted-foreground">
                Agenda un recorrido de obra, solicita soporte posventa o comparte los alcances de tu siguiente proyecto. Respondemos en menos de 1 dia habil.
              </p>
            </div>
            <div className="rounded-3xl border border-border/70 bg-secondary/20 p-space-lg shadow-soft">
              <h2 className="font-heading text-lg font-semibold text-foreground">Canales directos</h2>
              <div className="mt-space-sm grid gap-space-sm sm:grid-cols-2">
                {contactItems.map((item) => {
                  const Icon = item.label === 'Telefono' ? Phone : Mail

                  return (
                    <div key={item.label} className="rounded-2xl border border-border/40 bg-white/90 p-space-md">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span className="text-xs uppercase tracking-[0.3em]">{item.label}</span>
                      </div>
                      <a href={item.href} className="mt-1 inline-flex text-base font-semibold text-foreground underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                        {item.value}
                      </a>
                    </div>
                  )
                })}
                <div className="rounded-2xl border border-border/40 bg-white/90 p-space-md">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span className="text-xs uppercase tracking-[0.3em]">WhatsApp</span>
                  </div>
                  <WhatsappLink
                    href={siteConfig.whatsapp.link}
                    context="contact-page"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex text-base font-semibold text-primary underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Conversar por WhatsApp
                  </WhatsappLink>
                </div>
              </div>
              <div className="mt-space-md flex flex-col gap-space-sm sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/cotizar">Solicitar cotización</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href="/proyectos">Ver proyectos entregados</Link>
                </Button>
              </div>
            </div>
          </div>
          <Card className="rounded-3xl border border-border/70 bg-white/95 p-space-lg shadow-soft">
            <h2 className="font-heading text-xl font-semibold text-foreground">Escribe a nuestro equipo</h2>
            <p className="mt-space-xs text-sm text-muted-foreground">
              Cuentanos el tipo de espacio, ubicación y plazos estimados para ayudarte con rapidez.
            </p>
            <div className="mt-space-md">
              <ContactLeadForm />
            </div>
          </Card>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container grid gap-space-xl lg:grid-cols-[1fr,1fr] lg:items-start">
          <div className="space-y-space-sm">
            <h2 className="font-heading text-3xl font-semibold text-foreground">Oficinas y cobertura</h2>
            <p className="text-sm text-muted-foreground">
              Atendemos proyectos en todo el Perú desde nuestra base en Arequipa y equipos itinerantes. Coordinamos visitas segun agenda y protocolos de seguridad.
            </p>
            <div className="grid gap-space-sm sm:grid-cols-2">
              {siteConfig.offices.map((office) => (
                <Card key={office.city} className="rounded-3xl border border-border/70 bg-secondary/20 p-space-lg shadow-soft">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{office.city}</p>
                  <p className="mt-space-xs font-heading text-xl font-semibold text-foreground">{office.address}</p>
                  <p className="mt-space-xs text-sm text-muted-foreground">Visitas previa coordinación.</p>
                </Card>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-border/70 shadow-soft">
            <iframe
              src={mapEmbedUrl}
              title="Mapa SG Acabados"
              aria-label="Mapa con ubicación de SG Acabados en Yanahuara, Arequipa"
              className="h-[360px] w-full rounded-3xl"
              loading="lazy"
            />
            <div className="px-space-md py-space-sm text-sm text-muted-foreground">
              <a
                href="https://www.openstreetmap.org/?mlat=-16.39195&mlon=-71.54126#map=17/-16.39195/-71.54126"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline-offset-4 hover:text-primary/80"
              >
                Abrir mapa en una nueva pestana
              </a>
            </div>
          </div>
        </div>
      </Section>

      <CatalogBanner />
      <FinalCallToAction />
    </>
  )
}

