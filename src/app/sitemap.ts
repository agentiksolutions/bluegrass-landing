import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

const baseUrl = "https://bluegrassadvisorygroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Build-time date — refreshes on every deploy so lastmod is never stale.
  const lastModified = new Date();
  const staticPages = [
    { url: baseUrl, lastModified, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/services/web-design`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services/ai-integration`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services/dashboards`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services/operations`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/showroom`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/showroom/report`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/showroom/website`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/showroom/dashboard`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/showroom/examples`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...posts];
}
