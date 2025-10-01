import type { MDXEntry } from '@/lib/mdx'
import { loadMdxEntry, loadMdxList } from '@/lib/mdx'
import type { Family, Sector, Project, FaqItem, SubFamily } from '@/types/content'

export async function getFamilies(): Promise<MDXEntry<Family>[]> {
  const entries = await loadMdxList<Family>('familias')
  return entries.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}

export function getFamily(slug: string) {
  return loadMdxEntry<Family>('familias', slug)
}

export async function getSubFamilies(): Promise<MDXEntry<SubFamily>[]> {
  return loadMdxList<SubFamily>('subfamilias')
}

export function getSubFamily(slug: string) {
  return loadMdxEntry<SubFamily>('subfamilias', slug)
}

export async function getSectors(): Promise<MDXEntry<Sector>[]> {
  return loadMdxList<Sector>('sectores')
}

export function getSector(slug: string) {
  return loadMdxEntry<Sector>('sectores', slug)
}

export async function getProjects(): Promise<MDXEntry<Project>[]> {
  const entries = await loadMdxList<Project>('proyectos')
  return entries.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}

export function getProject(slug: string) {
  return loadMdxEntry<Project>('proyectos', slug)
}

export async function getFaqs(): Promise<MDXEntry<FaqItem>[]> {
  return loadMdxList<FaqItem>('faqs')
}