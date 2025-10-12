import type { ReactNode } from 'react'

import { SolutionsNav } from '@/components/solutions/solutions-nav'
import { getSolutionsContent } from '@/lib/solutions-intent'

const content = getSolutionsContent()

const navItems = [
  { href: '/soluciones', label: 'Resumen' },
  ...content.segments.map((segment) => ({ href: `/soluciones/${segment.id}`, label: segment.label }))
]

export default function SolutionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-space-xl">
      <div className="border-b border-border/60 bg-secondary/20">
        <div className="container">
          <SolutionsNav items={navItems} />
        </div>
      </div>
      {children}
    </div>
  )
}
