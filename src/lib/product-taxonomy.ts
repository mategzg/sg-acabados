import fs from 'node:fs'
import path from 'node:path'
import taxonomyData from '@/content/productos/taxonomia.json'
import type { ProductFamilyTaxonomy, ProductSubfamily, ProductTaxonomy } from '@/types/product-taxonomy'

const taxonomy = taxonomyData as ProductTaxonomy
const PUBLIC_DIR = path.join(process.cwd(), 'public')
const imageVersionCache = new Map<string, string>()

const appendAssetVersion = (imagePath: string) => {
  if (!imagePath || imagePath.startsWith('http')) {
    return imagePath
  }

  if (imageVersionCache.has(imagePath)) {
    return imageVersionCache.get(imagePath)!
  }

  const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  const filesystemPath = path.join(PUBLIC_DIR, relativePath)

  try {
    const stats = fs.statSync(filesystemPath)
    const version = Math.floor(stats.mtimeMs).toString(36)
    const separator = imagePath.includes('?') ? '&' : '?'
    const value = `${imagePath}${separator}v=${version}`
    imageVersionCache.set(imagePath, value)
    return value
  } catch {
    return imagePath
  }
}

const withVersionedImages: ProductTaxonomy = {
  familias: taxonomy.familias.map((family) => ({
    ...family,
    subfamilias: family.subfamilias.map((subfamily) => ({
      ...subfamily,
      image: appendAssetVersion(subfamily.image)
    }))
  }))
}
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

export const getProductTaxonomy = (): ProductTaxonomy => withVersionedImages

export const getProductFamilies = (): ProductFamilyTaxonomy[] => withVersionedImages.familias

export const getProductFamily = (slug: string): ProductFamilyTaxonomy | undefined =>
  withVersionedImages.familias.find((family) => family.slug === slug)

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

export const getProductFamilySlugs = () => withVersionedImages.familias.map((family) => family.slug)

