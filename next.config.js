/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["http://localhost:8080/barbar/"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
