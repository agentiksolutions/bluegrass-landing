import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

const baseUrl = "https://bluegrassadvisorygroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/services/web-design`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services/ai-integration`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services/dashboards`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services/operations`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/showroom`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/showroom/report`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/showroom/website`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/showroom/dashboard`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/showroom/examples`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/insights`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...posts];
}
