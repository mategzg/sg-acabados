import MarketingLayout from "../[locale]/(marketing)/layout"
import SolutionsPage, { generateMetadata, revalidate } from "../[locale]/(marketing)/soluciones/page"

import { LocaleProvider } from "@/i18n/locale-provider"
import { getDefaultDictionary } from "@/i18n/get-dictionary"
import { defaultLocale } from "@/lib/i18n-config"

type RootSolucionesProps = {
  searchParams?: Record<string, string | string[] | undefined>
}

export { generateMetadata, revalidate }

export default async function RootSoluciones({ searchParams }: RootSolucionesProps) {
  const messages = await getDefaultDictionary()
  const segmentParam = searchParams?.segment
  const normalizedSearchParams =
    typeof segmentParam === "string" ? { segment: segmentParam } : undefined

  return (
    <LocaleProvider locale={defaultLocale} messages={messages}>
      <MarketingLayout>
        <SolutionsPage searchParams={normalizedSearchParams} />
      </MarketingLayout>
    </LocaleProvider>
  )
}
