/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/ourplaces/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/avatars/**",
      },
    ],
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "our-places.vercel.app",
      "ourplaces.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
