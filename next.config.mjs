/** @type {import('next').NextConfig} */
const parseCsp = (policy = '') => {
  const map = new Map()
  if (!policy) {
    return map
  }

  for (const directive of policy.split(';')) {
    const trimmed = directive.trim()
    if (!trimmed) {
      continue
    }
    const [name, ...values] = trimmed.split(/\s+/)
    if (!name) {
      continue
    }
    map.set(name, new Set(values))
  }

  return map
}

const mergeCsp = (existingPolicy, requiredDirectives) => {
  const merged = parseCsp(existingPolicy)

  for (const [directive, values] of Object.entries(requiredDirectives)) {
    if (!merged.has(directive)) {
      merged.set(directive, new Set())
    }
    const currentValues = merged.get(directive)
    for (const value of values) {
      currentValues.add(value)
    }
  }

  return (
    Array.from(merged.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([directive, values]) => `${directive} ${Array.from(values).sort().join(' ')}`)
      .join('; ') + ';'
  )
}

const requiredCsp = {
  "default-src": ["'self'"],
  "base-uri": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", 'https://interfaces.zapier.com', 'https://www.googletagmanager.com'],
  "connect-src": ["'self'", 'https://interfaces.zapier.com', 'https://www.google-analytics.com', 'https://region1.google-analytics.com'],
  "frame-src": ['https://interfaces.zapier.com', 'https://*.zapier.app', 'https://www.openstreetmap.org'],
  "frame-ancestors": ["'self'"],
  "img-src": ["'self'", 'data:', 'https:'],
  "style-src": ["'self'", "'unsafe-inline'"],
  "font-src": ["'self'", 'data:', 'https:']
}

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      }
    ]
  },
  async headers() {
    const existingCsp = (process.env.NEXT_PUBLIC_BASE_CSP || '').trim()
    const cspValue = mergeCsp(existingCsp, requiredCsp)

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspValue
          },
          { key: 'Referrer-Policy', value: 'no-referrer' }
        ]
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      },
      {
        source: '/logos/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      }
    ]
  }
}

export default nextConfig

