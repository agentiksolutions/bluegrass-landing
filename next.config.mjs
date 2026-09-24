/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The Academy and Prompt Studio are static pages in public/. Next does not
  // serve a folder's index.html on its own, so map the clean URLs to them.
  async rewrites() {
    return [
      { source: "/academy", destination: "/academy/index.html" },
      { source: "/academy/prompt-studio", destination: "/academy/prompt-studio/index.html" },
      { source: "/prompt-studio", destination: "/prompt-studio/index.html" },
    ];
  },
};

export default nextConfig;
