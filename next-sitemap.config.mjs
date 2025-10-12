/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sgacabados.pe'),
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  transform: async (config, path) => {
    if (path === '/es') {
      return null
    }

    const normalizedPath = normalizePath(path)

    return {
      loc: normalizedPath,
      changefreq: 'weekly',
      priority: normalizedPath === '/' ? 1 : 0.7
    }
  }
}

function normalizeSiteUrl(value) {
  const trimmed = value.replace(/\/+$/, '')
  return trimmed.endsWith('/es') ? trimmed.slice(0, -3) : trimmed
}

function normalizePath(path) {
  if (path.startsWith('/es/')) {
    return '/' + path.slice(4)
  }

  return path
}

export default config