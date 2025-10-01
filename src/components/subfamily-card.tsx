import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/localized-link'

import type { SubFamilyDocument } from '@/types/content'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'

export function SubFamilyCard({ subFamily }: { subFamily: SubFamilyDocument }) {
  const cover = subFamily.imagenes[0]
  const fallbackCover = '/images/placeholders/generic-card.jpg'
  const imageSrc = cover?.src ?? fallbackCover
  const imageAlt = cover?.alt ?? `Visual representativa de ${subFamily.nombre}`

  return (
    <Card className="flex h-full flex-col overflow-hidden bg-white/95 shadow-soft transition-transform hover:-translate-y-1">
      <div className="relative h-52">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 25vw, 100vw"
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_DATA_URL}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap gap-2">
          {subFamily.usos.map((uso) => (
            <Badge key={uso} variant="outline">
              {uso}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="font-heading text-xl font-semibold text-foreground">{subFamily.nombre}</h3>
          <p className="text-sm text-muted-foreground">{subFamily.resumen}</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {subFamily.beneficios.slice(0, 3).map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Presupuesto {subFamily.presupuesto}</span>
          <Link
            href={`/productos/${subFamily.familia}/${subFamily.slug}`}
            className="text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80"
          >
            Ver ficha
          </Link>
        </div>
      </div>
    </Card>
  )
}
