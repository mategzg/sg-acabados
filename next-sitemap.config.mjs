/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sgsac.com'),
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  transform: async (config, path) => {
    const normalizedPath = stripDefaultLocale(path)

    if (!normalizedPath) {
      return null
    }

    return {
      loc: normalizedPath,
      changefreq: 'weekly',
      priority: normalizedPath === '/' ? 1 : 0.8
    }
  }
}

function normalizeSiteUrl(value) {
  return value.replace(/\/+$/, '').replace(/\/es$/, '')
}

function stripDefaultLocale(path) {
  if (path === '/es' || path === '/es/') {
    return null
  }

  if (path.startsWith('/es/')) {
    const rest = path.slice(3)
    return rest ? (rest.startsWith('/') ? rest : `/${rest}`) : '/'
  }

  return path
}

export default config
