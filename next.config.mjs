// Enforced now: these four directives cannot conflict with anything the site loads.
const enforcedCsp = [
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

// ponytail: report-only because Next 14 hydration scripts are inline and vary per page.
// Enforcing a strict script-src needs per-request nonces (middleware), which ends static rendering.
// Google Analytics hosts: Google's published GA4 list plus analytics.google.com and doubleclick,
// which a headless browser run showed this property posting to (Google signals is on).
// challenges.cloudflare.com is the contact form's Turnstile check.
const reportOnlyCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://challenges.cloudflare.com",
  "media-src 'self'",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), midi=(), accelerometer=(), gyroscope=(), magnetometer=(), display-capture=(), browsing-topics=()",
  },
  { key: "Content-Security-Policy", value: enforcedCsp },
  { key: "Content-Security-Policy-Report-Only", value: reportOnlyCsp },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
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
