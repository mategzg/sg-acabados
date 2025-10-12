import { track } from "@/lib/analytics"

export type LeadEventParams = Record<string, string | number | boolean | undefined>

export function trackLead(params: LeadEventParams = {}) {
  track("generate_lead", params)
}
