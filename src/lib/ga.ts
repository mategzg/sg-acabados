export type LeadEventParams = Record<string, string | number | boolean | undefined>

export function trackLead(params: LeadEventParams = {}) {
  if (typeof window === 'undefined') {
    return
  }

  const gtag = window.gtag
  if (typeof gtag !== 'function') {
    return
  }

  gtag('event', 'generate_lead', params)
}
