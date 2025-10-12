import { LocalizedLink as Link } from '@/components/localized-link'
import { ArrowUpRight, PhoneCall } from 'lucide-react'

import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'

export function FinalCallToAction() {
  return (
    <Section className="bg-transparent">
      <div className="container">
        <div className="grid gap-space-xl rounded-4xl bg-brand-carbon px-space-lg py-space-3xl text-white shadow-soft lg:grid-cols-[1.4fr,1fr] lg:px-space-xl">
          <div className="space-y-space-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-arena">Checkpoint MVP-1D</p>
            <h2 className="text-balance font-heading text-3xl font-semibold md:text-4xl">
              Listos para cotizar tu siguiente proyecto
            </h2>
            <p className="max-w-xl text-balance text-sm text-white/80 md:text-base">
              Unimos acabados, mobiliario y sistemas integrales en un cronograma unico. Coordina una llamada y asegura fecha de entrega.
            </p>
          </div>
          <div className="flex flex-col gap-space-sm self-center text-brand-arena">
            <Button asChild size="lg" className="flex w-full items-center justify-center gap-2 bg-brand-arena text-brand-carbon hover:bg-brand-arena/90 sm:w-auto">
              <Link href="/cotizar">
                Solicitar cotización
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="flex w-full items-center justify-center gap-2 border-white/40 text-white hover:bg-white/10 sm:w-auto"
            >
              <Link href="/contacto">
                Hablar con ventas
                <PhoneCall className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
