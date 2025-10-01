'use client'

import * as React from 'react'

import { trackCatalogDownload, trackWhatsapp } from '@/lib/gtag'

type AnchorProps = Omit<React.ComponentPropsWithoutRef<'a'>, 'onClick'>

type WhatsappLinkProps = AnchorProps & { context: string }

type CatalogDownloadLinkProps = AnchorProps & { context: string }

export const WhatsappLink = React.forwardRef<HTMLAnchorElement, WhatsappLinkProps>(
  ({ context, ...props }, ref) => (
    <a
      {...props}
      ref={ref}
      onClick={(event) => {
        if (!event.defaultPrevented) {
          trackWhatsapp(context)
        }
      }}
    />
  )
)
WhatsappLink.displayName = 'WhatsappLink'

export const CatalogDownloadLink = React.forwardRef<HTMLAnchorElement, CatalogDownloadLinkProps>(
  ({ context, ...props }, ref) => (
    <a
      {...props}
      ref={ref}
      onClick={(event) => {
        if (!event.defaultPrevented) {
          trackCatalogDownload(context)
        }
      }}
    />
  )
)
CatalogDownloadLink.displayName = 'CatalogDownloadLink'
