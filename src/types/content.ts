import type { ReactNode } from 'react'

export type SpecItem = {
  key: string
  value: string
}

export type DownloadItem = {
  label: string
  href: string
}

export type ImageItem = {
  src: string
  alt: string
}

export type Family = {
  slug: string
  nombre: string
  resumen: string
  beneficios: string[]
  specs: SpecItem[]
  aplicaciones: string[]
  descargas: DownloadItem[]
  imagenes: ImageItem[]
}

export type FamilyDocument = Family & { content: ReactNode }

export type SubFamily = {
  slug: string
  familia: string
  nombre: string
  resumen: string
  beneficios: string[]
  especificaciones: SpecItem[]
  aplicaciones: string[]
  descargas: DownloadItem[]
  imagenes: ImageItem[]
  usos: ('interior' | 'exterior')[]
  sectores: string[]
  desempenos: string[]
  presupuesto: 'bajo' | 'medio' | 'alto'
}

export type SubFamilyDocument = SubFamily & { content: ReactNode }

export type Sector = {
  slug: string
  nombre: string
  resumen: string
  pains: string[]
  kitRecomendado: { categoria: string; item: string }[]
  imagen: ImageItem
}

export type SectorDocument = Sector & { content: ReactNode }

export type Project = {
  slug: string
  nombre: string
  cliente: string
  ubicacion: string
  metrosCuadrados: number
  plazo: string
  especialidades: string[]
  resumen: string
  descripcion: string
  galeria: ImageItem[]
  sector: string
}

export type ProjectDocument = Project & { content: ReactNode }

export type FaqItem = {
  slug: string
  pregunta: string
  respuesta: string
  categoria: string
}

export type FaqDocument = FaqItem & { content: ReactNode }
