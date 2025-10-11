/** @type {import('next').NextConfig} */
const zapierCspDirectives = () => {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://interfaces.zapier.com",
    "connect-src 'self' https://interfaces.zapier.com",
    "frame-src https://interfaces.zapier.com https://*.zapier.app",
    "frame-ancestors 'self'",
    "img-src 'self' data: https:",
    "style-src 'self' 'unsafe-inline'"
  ]

  return `${directives.join('; ')};`
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
            value: zapierCspDirectives()
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
