/** @type {import('next').NextConfig} */
const buildCspValue = () => {
  const directives = new Map([
    ['default-src', new Set(["'self'"])],
    ['base-uri', new Set(["'self'"])],
    [
      'script-src',
      new Set(["'self'", "'unsafe-inline'", 'https://interfaces.zapier.com', 'https://www.googletagmanager.com'])
    ],
    [
      'connect-src',
      new Set([
        "'self'",
        'https://interfaces.zapier.com',
        'https://www.google-analytics.com',
        'https://region1.google-analytics.com'
      ])
    ],
    [
      'frame-src',
      new Set(['https://interfaces.zapier.com', 'https://*.zapier.app'])
    ],
    ['frame-ancestors', new Set(["'self'"])],
    ['img-src', new Set(["'self'", 'data:', 'https:'])],
    ['style-src', new Set(["'self'", "'unsafe-inline'"])],
    ['font-src', new Set(["'self'", 'data:', 'https:'])]
  ])

  return (
    Array.from(directives.entries())
      .map(([directive, values]) => `${directive} ${Array.from(values).join(' ')}`)
      .join('; ') + ';'
  )
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
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: buildCspValue()
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
