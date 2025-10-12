import taxonomyData from '@/content/productos/taxonomia.json'
import type { ProductFamilyTaxonomy, ProductSubfamily, ProductTaxonomy } from '@/types/product-taxonomy'

const taxonomy = taxonomyData as ProductTaxonomy

const removeAccents = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .normalize('NFC')

const slugify = (value: string) =>
  removeAccents(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const getProductTaxonomy = (): ProductTaxonomy => taxonomy

export const getProductFamilies = (): ProductFamilyTaxonomy[] => taxonomy.familias

export const getProductFamily = (slug: string): ProductFamilyTaxonomy | undefined =>
  taxonomy.familias.find((family) => family.slug === slug)

export const getProductFamilySubfamilies = (slug: string): ProductSubfamily[] => {
  const family = getProductFamily(slug)
  return family ? family.subfamilias : []
}

export const getProductFamilyBrandAssets = (brands: string[]) =>
  brands.map((brand) => ({
    name: brand,
    slug: slugify(brand),
    asset: `/brands/${slugify(brand)}.png`
  }))

export const getProductFamilySlugs = () => taxonomy.familias.map((family) => family.slug)