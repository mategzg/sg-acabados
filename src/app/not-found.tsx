import { LocalizedLink as Link } from '@/components/localized-link'

import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Section className="bg-white">
      <div className="container flex min-h-[60vh] flex-col items-center justify-center space-y-space-md text-center">
        <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">404</span>
        <h1 className="text-balance font-heading text-4xl font-semibold text-foreground md:text-5xl">
          Pagina no encontrada
        </h1>
        <p className="max-w-xl text-balance text-muted-foreground">
          La ruta que intentas visitar no esta disponible. Revisa el menu principal o solicita una cotizacion y te guiaremos personalmente.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-space-sm">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/cotizar">Solicitar cotizacion</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
