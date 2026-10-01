/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      { source: "/academy", destination: "/academy/index.html" },
      { source: "/prompt-studio", destination: "/prompt-studio/index.html" },
    ];
  },
  async redirects() {
    return [
      {
        source: "/academy/prompt-studio",
        destination: "/prompt-studio",
        permanent: true,
      },
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
