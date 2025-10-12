"use client"

import { Card } from "@/components/ui/card"
import type { SolutionsKit } from "@/types/solutions"

type KitCardProps = {
  kit: SolutionsKit
}

export function KitCard({ kit }: KitCardProps) {
  return (
    <Card className="rounded-3xl border border-border/70 bg-white/95 p-space-lg shadow-soft">
      <div className="space-y-space-sm">
        <h4 className="font-heading text-lg font-semibold text-foreground">{kit.name}</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {kit.items.map((item) => (
            <li key={`${kit.name}-${item}`} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
