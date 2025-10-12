import type { Metadata } from 'next'
import Script from 'next/script'
import type { ReactNode } from 'react'

import './globals.css'
import { ZapierNative } from '@/components/chatbot/zapier-native'
import { siteConfig } from '@/config/site'
import { fontVariables } from '@/styles/fonts'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: 'es_PE',
    type: 'website',
    images: ['/images/og/sg-acabados.svg']
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg'
  },
  alternates: {
    canonical: '/'
  }
}

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
const baseUrl = siteConfig.siteUrl.replace(/\/$/, '')

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.siteUrl,
  logo: `${baseUrl}/logos/logo-sg.png`,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      areaServed: 'PE'
    }
  ]
}

const localBusinesses = siteConfig.offices.map((office) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: `${siteConfig.name} ${office.city}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: office.address,
    addressCountry: 'PE'
  },
  telephone: siteConfig.contact.phone,
  url: siteConfig.siteUrl
}))

const structuredData = JSON.stringify([organizationLd, ...localBusinesses])

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${fontVariables} bg-background font-sans text-foreground antialiased`}>
        {gaMeasurementId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {structuredData}
        </Script>
        {children}
        <ZapierNative />
      </body>
    </html>
  )
}

