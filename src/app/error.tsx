'use client'

import { LocalizedLink as Link } from '@/components/localized-link'

import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="es">
      <body>
        <Section className="bg-white">
          <div className="container flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Error inesperado</span>
            <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
              Algo salio mal
            </h1>
            <p className="max-w-xl text-muted-foreground">
              Hemos registrado la incidencia. Intenta recargar la pagina o vuelve al inicio mientras resolvemos el
              problema.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={() => reset()}>Reintentar</Button>
              <Button asChild variant="outline">
                <Link href="/">Ir al inicio</Link>
              </Button>
            </div>
          </div>
        </Section>
      </body>
    </html>
  )
}
