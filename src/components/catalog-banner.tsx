'use client'

import { LocalizedLink as Link } from '@/components/localized-link'
import { FileDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { trackCatalogDownload } from '@/lib/gtag'

export function CatalogBanner() {
  return (
    <section className="py-space-3xl">
      <div className="container overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground shadow-soft">
        <div className="flex flex-col gap-space-lg px-space-lg py-space-2xl lg:flex-row lg:items-center lg:justify-between lg:px-space-xl lg:py-space-3xl">
          <div className="space-y-space-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">Recursos</p>
            <div className="flex items-center gap-space-sm">
              <FileDown className="h-7 w-7 flex-shrink-0 text-primary-foreground" aria-hidden="true" />
              <h2 className="text-balance font-heading text-2xl font-semibold md:text-3xl">Descarga el Catálogo SG 2025</h2>
            </div>
            <p className="max-w-2xl text-sm text-primary-foreground/80 md:text-base">
              Fichas técnicas de pisos, iluminación, control solar, mobiliario y sistemas integrales listas para especificar.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
            <Link
              href="/descargas/CATALOGO-SG-2025.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackCatalogDownload('catalog-banner')}
            >
              Descargar catálogo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

