import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "insights");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  /** Path under public/, e.g. /images/insights/foo.webp. Required: see requireCover. */
  cover: string;
  coverAlt: string;
}

// Every post carries its own picture (Phil, 2026-09-24: "All blog posts should have a
// picture on them"). A post without one fails the build here rather than shipping a
// blank card, because the blog index, the post page and the Open Graph card all read it.
function requireCover(slug: string, data: Record<string, unknown>): string {
  const cover = typeof data.cover === "string" ? data.cover.trim() : "";
  if (!cover) {
    throw new Error(
      `content/insights/${slug}.mdx has no "cover" in its frontmatter. ` +
        `Add cover: "/images/insights/<file>.webp" and coverAlt: "<description>", ` +
        `and credit the image in public/images/brand/CREDITS.md.`,
    );
  }
  return cover;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      category: data.category || "General",
      date: data.date || "",
      readTime: data.readTime || "3 min read",
      cover: requireCover(slug, data),
      coverAlt: data.coverAlt || data.title || slug,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title || slug,
      description: data.description || "",
      category: data.category || "General",
      date: data.date || "",
      readTime: data.readTime || "3 min read",
      cover: requireCover(slug, data),
      coverAlt: data.coverAlt || data.title || slug,
    },
    content,
  };
}
