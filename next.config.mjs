/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },

  images: {
    remotePatterns: [
      {
        hostname: "a.storyblok.com",
        protocol: "https",
      },
    ],
  },
}

export default nextConfig
