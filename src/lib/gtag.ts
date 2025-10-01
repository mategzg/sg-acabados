declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export {}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export type GtagEventParams = {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | Record<string, unknown>
    | Array<Record<string, unknown>>
}

export function sendEvent(eventName: string, params: GtagEventParams = {}) {
  if (!GA_MEASUREMENT_ID) {
    return
  }

  if (typeof window === 'undefined') {
    return
  }

  const gtag = window.gtag
  if (!gtag) {
    return
  }

  gtag('event', eventName, params)
}

export function trackWhatsapp(context: string) {
  sendEvent('click_whatsapp', { context })
}

export function trackCatalogDownload(source: string) {
  sendEvent('file_download', { source })
}

export function trackViewItemList(listName: string, items: { id: string; name: string }[]) {
  sendEvent('view_item_list', {
    item_list_name: listName,
    items: items.map((item, index) => ({
      item_id: item.id,
      item_name: item.name,
      index
    }))
  })
}

export function trackViewItem(item: { id: string; name: string; category?: string }) {
  sendEvent('view_item', {
    item_id: item.id,
    item_name: item.name,
    item_category: item.category
  })
}
