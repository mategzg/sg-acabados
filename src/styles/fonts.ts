import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

export const headingFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap'
})

export const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap'
})

export const fontVariables = `${headingFont.variable} ${bodyFont.variable}`
