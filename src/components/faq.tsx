"use client"

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { FaqDocument } from '@/types/content'

export function FAQ({ items }: { items: FaqDocument[] }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {items.map((faq) => {
        const isOpen = open === faq.slug
        const contentId = `faq-${faq.slug}`

        return (
          <div key={faq.slug} className="rounded-3xl border border-border bg-white/95 p-6 shadow-soft">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setOpen((prev) => (prev === faq.slug ? null : faq.slug))}
            >
              <span className="font-heading text-base font-semibold text-foreground">{faq.pregunta}</span>
              <span className="text-xl text-muted-foreground" aria-hidden="true">
                {isOpen ? '-' : '+'}
              </span>
            </button>
            <div
              id={contentId}
              className={cn(
                'grid overflow-hidden transition-all duration-200',
                isOpen ? 'mt-3 grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="space-y-3 text-sm text-muted-foreground" style={{ minHeight: 0 }}>
                {isOpen ? (
                  <>
                    {faq.respuesta ? <p className="leading-relaxed">{faq.respuesta}</p> : null}
                    {faq.content}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
