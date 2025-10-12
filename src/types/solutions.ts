export type SolutionsHero = {
  title: string
  subtitle: string
  cta: string
}

export type SolutionsKit = {
  name: string
  items: string[]
}

export type SolutionsFaq = {
  q: string
  a: string
}

export type SolutionsForm = {
  fields: string[]
  cta: string
}

export type SolutionsSegment = {
  id: string
  label: string
  intro: string
  pains: string[]
  kits: SolutionsKit[]
  evidenceSlugs: string[]
  form: SolutionsForm
  faqs: SolutionsFaq[]
}

export type SolutionsContent = {
  hero: SolutionsHero
  segments: SolutionsSegment[]
}

export type SolutionsProjectCard = {
  slug: string
  name: string
  summary: string
  href: string
  sector?: string
  location?: string
  image: {
    src: string
    alt: string
  }
}
