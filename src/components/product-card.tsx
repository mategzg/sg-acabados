import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/localized-link'

import type { FamilyDocument } from '@/types/content'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'

export function ProductCard({ family }: { family: FamilyDocument }) {
  const cover = family.imagenes?.[0]
  const fallbackCover = '/images/placeholders/generic-card.jpg'

  return (
    <Card className="flex h-full flex-col gap-4 bg-white/95 p-0 shadow-soft transition-transform hover:scale-[1.02]">
      <div className="relative h-40 w-full overflow-hidden rounded-t-3xl">
        <Image
          src={cover?.src ?? fallbackCover}
          alt={cover?.alt ?? `Visual de la familia ${family.nombre}`}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 33vw, 100vw"
          priority={false}
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_DATA_URL}
        />
      </div>
      <div className="space-y-2 px-6 pt-6">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{family.slug}</div>
        <h3 className="font-heading text-xl font-semibold text-foreground">{family.nombre}</h3>
        <p className="text-sm text-muted-foreground">{family.resumen}</p>
      </div>
      <ul className="space-y-2 px-6 text-sm text-muted-foreground">
        {family.beneficios.slice(0, 3).map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto px-6 pb-6">
        <Button asChild variant="ghost" className="px-0 text-primary hover:text-primary/80">
          <Link href={`/productos/${family.slug}`}>Ver familia</Link>
        </Button>
      </div>
    </Card>
  )
}
