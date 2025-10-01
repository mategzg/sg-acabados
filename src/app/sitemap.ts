import type { MetadataRoute } from 'next'

import { getFamilies, getProjects, getSectors, getSubFamilies } from '@/lib/content'
import { siteConfig } from '@/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, '')
  const now = new Date()

  const [families, subfamilies, sectors, projects] = await Promise.all([
    getFamilies(),
    getSubFamilies(),
    getSectors(),
    getProjects()
  ])

  const toRoute = (path: string): MetadataRoute.Sitemap[number] => ({
    url: `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`,
    lastModified: now
  })

  const staticRoutes = [
    '/',
    '/productos',
    '/soluciones',
    '/proyectos',
    '/nosotros',
    '/contacto',
    '/cotizar',
    '/politica-privacidad',
    '/terminos-condiciones'
  ].map(toRoute)

  const familyRoutes = families.map((family) => toRoute(`/productos/${family.slug}`))
  const subfamilyRoutes = subfamilies.map((sub) => toRoute(`/productos/${sub.familia}/${sub.slug}`))
  const sectorRoutes = sectors.map((sector) => toRoute(`/soluciones/${sector.slug}`))
  const projectRoutes = projects.map((project) => toRoute(`/proyectos/${project.slug}`))

  return [...staticRoutes, ...familyRoutes, ...subfamilyRoutes, ...sectorRoutes, ...projectRoutes]
}