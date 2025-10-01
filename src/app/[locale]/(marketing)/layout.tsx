import type { ReactNode } from 'react'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
