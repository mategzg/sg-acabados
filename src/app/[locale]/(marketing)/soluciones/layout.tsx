import type { ReactNode } from 'react'

import { SolutionsNav } from '@/components/solutions/solutions-nav'
import { solutions } from '@/data/solutions'

const navItems = [
  { href: '/soluciones', label: 'Resumen' },
  ...solutions.map((solution) => ({ href: `/soluciones/${solution.slug}`, label: solution.name }))
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