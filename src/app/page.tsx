import MarketingLayout from './[locale]/(marketing)/layout'
import HomePage from './[locale]/(marketing)/page'

import { LocaleProvider } from '@/i18n/locale-provider'
import { getDefaultDictionary } from '@/i18n/get-dictionary'
import { defaultLocale } from '@/lib/i18n-config'

export { generateMetadata, revalidate } from './[locale]/(marketing)/page'

export default async function RootHome() {
  const messages = await getDefaultDictionary()

  return (
    <LocaleProvider locale={defaultLocale} messages={messages}>
      <MarketingLayout>
        <HomePage />
      </MarketingLayout>
    </LocaleProvider>
  )
}
