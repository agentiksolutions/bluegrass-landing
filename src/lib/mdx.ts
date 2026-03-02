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
    },
    content,
  };
}
