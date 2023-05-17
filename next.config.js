
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@Prisma/client'],
    serverActions: true,
  },
};

module.exports = nextConfig;