// lib/blog.ts
import fs from "fs";
import path from "path";

import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  author: string;
  readingTime: string;
  coverImage?: string;
  content: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  author: string;
  readingTime: string;
  coverImage?: string;
}

const postsDirectory = path.join(process.cwd(), "content/blog");

export async function getBlogPosts(
  locale: "en" | "id"
): Promise<BlogPostMetadata[]> {
  const localeDir = path.join(postsDirectory, locale);

  // Check if directory exists
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDir);
  const posts = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const slug = name.replace(/\.mdx$/, "");
      const fullPath = path.join(localeDir, name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const readingTimeResult = readingTime(content);

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        category: data.category,
        tags: data.tags || [],
        featured: data.featured || false,
        author: data.author,
        readingTime: readingTimeResult.text,
        coverImage: data.coverImage,
      } as BlogPostMetadata;
    });

  // Sort posts by date (newest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string,
  locale: "en" | "id"
): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, locale, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const readingTimeResult = readingTime(content);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      category: data.category,
      tags: data.tags || [],
      featured: data.featured || false,
      author: data.author,
      readingTime: readingTimeResult.text,
      coverImage: data.coverImage,
      content,
    };
  } catch (error) {
    return null;
  }
}

export async function getFeaturedPosts(
  locale: "en" | "id"
): Promise<BlogPostMetadata[]> {
  const posts = await getBlogPosts(locale);
  return posts.filter((post) => post.featured).slice(0, 3);
}

export async function getPostsByCategory(
  category: string,
  locale: "en" | "id"
): Promise<BlogPostMetadata[]> {
  const posts = await getBlogPosts(locale);
  return posts.filter((post) => post.category === category);
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  locale: "en" | "id"
): Promise<BlogPostMetadata[]> {
  const posts = await getBlogPosts(locale);
  return posts
    .filter((post) => post.category === category && post.slug !== currentSlug)
    .slice(0, 3);
}

// Get all unique categories
export async function getCategories(locale: "en" | "id"): Promise<string[]> {
  const posts = await getBlogPosts(locale);
  const categories = posts.map((post) => post.category);
  return [...new Set(categories)];
}

// Get all unique tags
export async function getTags(locale: "en" | "id"): Promise<string[]> {
  const posts = await getBlogPosts(locale);
  const tags = posts.flatMap((post) => post.tags);
  return [...new Set(tags)];
}
