"use client"

import { useEffect } from 'react'

import { trackViewItemList } from '@/lib/gtag'

export function ViewItemListAnalytics({
  listName,
  items
}: {
  listName: string
  items: { id: string; name: string }[]
}) {
  useEffect(() => {
    if (items.length === 0) return
    trackViewItemList(listName, items)
  }, [items, listName])

  return null
}
