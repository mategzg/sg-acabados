export type ProductSubfamily = {
  slug: string
  nombre: string
  resumen: string
  image: string
}

export type ProductFamilyTaxonomy = {
  slug: string
  titulo: string
  intro: string
  brands: string[]
  subfamilias: ProductSubfamily[]
}

export type ProductTaxonomy = {
  familias: ProductFamilyTaxonomy[]
}