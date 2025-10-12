"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LocalizedLink as Link } from "@/components/localized-link"
import { track } from "@/lib/analytics"
import type { SolutionsKit } from "@/types/solutions"

type KitCardProps = {
  segmentId: string
  kit: SolutionsKit
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function KitCard({ segmentId, kit }: KitCardProps) {
  const kitSlug = slugify(kit.name)
  const quoteHref = `/cotizar?segment=${encodeURIComponent(segmentId)}&kit=${encodeURIComponent(kitSlug)}`

  const handleClick = () => {
    track("click_quote_kit", { segment: segmentId, kit_name: kitSlug })
  }

  return (
    <Card className="flex h-full flex-col gap-space-sm rounded-3xl border border-border/70 bg-white/95 p-space-lg shadow-soft">
      <div className="space-y-space-sm">
        <h4 className="font-heading text-lg font-semibold text-foreground">{kit.name}</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {kit.items.map((item) => (
            <li key={`${kitSlug}-${item}`} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button asChild className="w-full">
        <Link href={quoteHref} aria-label={`Cotizar kit ${kit.name} para ${segmentId}`} onClick={handleClick}>
          Cotizar este kit
        </Link>
      </Button>
    </Card>
  )
}
