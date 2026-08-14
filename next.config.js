/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ],
    formats: ['image/avif', 'image/webp']
  },
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar'
  }
};

module.exports = nextConfig;
