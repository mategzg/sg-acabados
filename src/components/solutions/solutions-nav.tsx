"use client"

import { LocalizedLink as Link } from '@/components/localized-link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export type SolutionsNavItem = {
  href: string
  label: string
}

export function SolutionsNav({ items }: { items: SolutionsNavItem[] }) {
  const pathname = usePathname() ?? '/'

  return (
    <nav aria-label="Soluciones" className="flex flex-wrap gap-2 py-space-sm">
      {items.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-full px-4 py-2 text-sm transition-colors',
              active ? 'bg-foreground text-background' : 'bg-white/60 text-muted-foreground hover:bg-accent/20 hover:text-foreground'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}