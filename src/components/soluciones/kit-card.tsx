"use client"

import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { track } from "@/lib/analytics"
import type { SolutionsKit } from "@/types/solutions"

type KitCardProps = {
  segmentId: string
  kit: SolutionsKit
  onSelect: (kitName: string) => void
}

export function KitCard({ segmentId, kit, onSelect }: KitCardProps) {
  const handleClick = () => {
    onSelect(kit.name)
    track("click_quote_kit", { segment: segmentId, kit_name: kit.name })
  }

  return (
    <Card className="flex h-full flex-col justify-between rounded-3xl border border-border/70 bg-white/95 p-space-lg shadow-soft">
      <div className="space-y-space-sm">
        <h4 className="font-heading text-lg font-semibold text-foreground">{kit.name}</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {kit.items.map((item) => (
            <li key={`${kit.name}-${item}`} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        type="button"
        variant="secondary"
        className="mt-space-md w-full"
        onClick={handleClick}
        aria-label={`Cotizar kit ${kit.name}`}
      >
        Cotizar este kit
      </Button>
    </Card>
  )
}
