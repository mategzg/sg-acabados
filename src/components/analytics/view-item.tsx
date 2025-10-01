"use client"

import { useEffect } from 'react'

import { trackViewItem } from '@/lib/gtag'

export function ViewItemAnalytics({
  item
}: {
  item: { id: string; name: string; category?: string }
}) {
  useEffect(() => {
    if (!item?.id) return
    trackViewItem(item)
  }, [item])

  return null
}
