/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/insights/automated-35-workflows",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/insights/cut-12-hours-admin",
        destination: "/insights",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
