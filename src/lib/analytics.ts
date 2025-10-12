export type TrackParams = Record<string, unknown>

export function track(eventName: string, params: TrackParams = {}) {
  if (typeof window === 'undefined') {
    return
  }

  const gtag = window.gtag
  if (typeof gtag !== 'function') {
    return
  }

  gtag('event', eventName, params)
}
