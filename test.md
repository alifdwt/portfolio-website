# MDX Setup untuk Blog Multi-Language

## 📦 Step 1: Install Dependencies

Jalankan command berikut untuk install semua dependencies yang dibutuhkan:

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter reading-time rehype-highlight rehype-slug rehype-autolink-headings remark-gfm date-fns
```

### Package Explanations:

- `@next/mdx` & `@mdx-js/*` - Core MDX support
- `gray-matter` - Parse frontmatter dari MDX files
- `reading-time` - Calculate estimated reading time
- `rehype-highlight` - Syntax highlighting untuk code blocks
- `rehype-slug` & `rehype-autolink-headings` - Auto-generate heading anchors
- `remark-gfm` - GitHub Flavored Markdown support
- `date-fns` - Date formatting utilities

## ⚙️ Step 2: Configure Next.js untuk MDX

Buat atau update `next.config.mjs`:

```javascript
// next.config.mjs
import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
```

## 📁 Step 3: Create Content Directory Structure

Buat struktur folder untuk blog content:

```bash
mkdir -p content/blog/en content/blog/id
```

Struktur akan terlihat seperti ini:

```
content/
└── blog/
    ├── en/
    │   └── (English blog posts akan disini)
    └── id/
        └── (Indonesian blog posts akan disini)
```

## 🔧 Step 4: Create Blog Utilities

Buat `lib/blog.ts` untuk handle MDX processing:

```typescript
// lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { notFound } from "next/navigation";

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
```

## 📝 Step 5: Create Sample Blog Posts

Buat file sample untuk testing. Pertama, buat Indonesian blog post:

````markdown
## <!-- content/blog/id/tutorial-nextjs-golang.mdx -->

title: "Membangun Full-Stack App dengan Next.js 15 dan Golang"
slug: "tutorial-nextjs-golang"
excerpt: "Pelajari cara membangun aplikasi full-stack modern menggunakan Next.js 15 App Router untuk frontend dan Golang dengan Fiber untuk backend. Complete dengan authentication dan deployment ke production."
date: "2025-01-15"
category: "tutorial"
tags: ["nextjs", "golang", "fullstack", "tutorial"]
featured: true
author: "Alif Dewantara"
coverImage: "/images/blog/nextjs-golang-cover.jpg"

---

# Membangun Full-Stack App dengan Next.js 15 dan Golang

Dalam tutorial ini, kita akan belajar cara membangun aplikasi full-stack modern menggunakan teknologi yang powerful: **Next.js 15** untuk frontend dan **Golang dengan Fiber** untuk backend.

## Prerequisites

Sebelum memulai, pastikan Anda sudah familiar dengan:

- JavaScript/TypeScript dasar
- React fundamentals
- Basic understanding of REST APIs
- Golang basics (optional, tapi recommended)

## Setup Project Structure

Mari kita mulai dengan membuat struktur project yang clean dan scalable:

```bash
mkdir fullstack-nextjs-golang
cd fullstack-nextjs-golang
mkdir frontend backend
```
````

## Frontend: Next.js 15 Setup

Pertama, kita setup Next.js frontend:

```bash
cd frontend
npx create-next-app@latest . --typescript --tailwind --app
```

## Backend: Golang Fiber Setup

Sekarang kita setup Golang backend dengan Fiber:

```bash
cd ../backend
go mod init backend
go get github.com/gofiber/fiber/v2
```

## Database Integration

Untuk database, kita akan menggunakan PostgreSQL dengan GORM:

```bash
go get gorm.io/gorm
go get gorm.io/driver/postgres
```

## Authentication Implementation

Kita akan implement JWT authentication untuk secure API access.

## Deployment Strategy

Aplikasi ini akan di-deploy menggunakan:

- **Frontend**: Vercel
- **Backend**: VPS dengan Docker
- **Database**: PostgreSQL di cloud

## Kesimpulan

Dengan mengikuti tutorial ini, Anda akan memiliki foundation yang solid untuk membangun aplikasi full-stack modern yang scalable dan maintainable.

Happy coding! 🚀

````

Dan buat juga English version:

```markdown
<!-- content/blog/en/nextjs-golang-tutorial.mdx -->
---
title: "Building Full-Stack Apps with Next.js 15 and Golang"
slug: "nextjs-golang-tutorial"
excerpt: "Learn how to build modern full-stack applications using Next.js 15 App Router for frontend and Golang with Fiber for backend. Complete with authentication and production deployment."
date: "2025-01-15"
category: "tutorial"
tags: ["nextjs", "golang", "fullstack", "tutorial"]
featured: true
author: "Alif Dewantara"
coverImage: "/images/blog/nextjs-golang-cover.jpg"
---

# Building Full-Stack Apps with Next.js 15 and Golang

In this tutorial, we'll learn how to build modern full-stack applications using powerful technologies: **Next.js 15** for the frontend and **Golang with Fiber** for the backend.

## Prerequisites

Before starting, make sure you're familiar with:

- Basic JavaScript/TypeScript
- React fundamentals
- Basic understanding of REST APIs
- Golang basics (optional but recommended)

## Project Structure Setup

Let's start by creating a clean and scalable project structure:

```bash
mkdir fullstack-nextjs-golang
cd fullstack-nextjs-golang
mkdir frontend backend
````

## Frontend: Next.js 15 Setup

First, let's set up the Next.js frontend:

```bash
cd frontend
npx create-next-app@latest . --typescript --tailwind --app
```

## Backend: Golang Fiber Setup

Now let's set up the Golang backend with Fiber:

```bash
cd ../backend
go mod init backend
go get github.com/gofiber/fiber/v2
```

## Database Integration

For the database, we'll use PostgreSQL with GORM:

```bash
go get gorm.io/gorm
go get gorm.io/driver/postgres
```

## Authentication Implementation

We'll implement JWT authentication for secure API access.

## Deployment Strategy

This application will be deployed using:

- **Frontend**: Vercel
- **Backend**: VPS with Docker
- **Database**: Cloud PostgreSQL

## Conclusion

By following this tutorial, you'll have a solid foundation for building modern, scalable, and maintainable full-stack applications.

Happy coding! 🚀

````

## 🎨 Step 6: Add Syntax Highlighting Styles

Tambahkan CSS untuk syntax highlighting. Update `app/globals.css`:

```css
/* Add to app/globals.css */

/* Syntax highlighting styles */
.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 0.5rem;
}

.hljs-comment,
.hljs-quote {
  color: #718096;
  font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-subst {
  color: #f56565;
  font-weight: bold;
}

.hljs-number,
.hljs-literal,
.hljs-variable,
.hljs-template-variable,
.hljs-tag .hljs-attr {
  color: #ed8936;
}

.hljs-string,
.hljs-doctag {
  color: #38b2ac;
}

.hljs-title,
.hljs-section,
.hljs-selector-id {
  color: #4299e1;
  font-weight: bold;
}

.hljs-subst {
  font-weight: normal;
}

.hljs-type,
.hljs-class .hljs-title {
  color: #9f7aea;
  font-weight: bold;
}

.hljs-tag,
.hljs-name,
.hljs-attribute {
  color: #4299e1;
  font-weight: normal;
}

.hljs-regexp,
.hljs-link {
  color: #38b2ac;
}

.hljs-symbol,
.hljs-bullet {
  color: #ed8936;
}

.hljs-built_in,
.hljs-builtin-name {
  color: #4299e1;
}

.hljs-meta {
  color: #718096;
}

.hljs-deletion {
  background: #f56565;
}

.hljs-addition {
  background: #48bb78;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
````

## ✅ Testing Setup

Untuk test apakah setup berhasil, jalankan:

```bash
npm run dev
```

Dan buat simple test page di `app/[locale]/test-blog/page.tsx`:

```typescript
// app/[locale]/test-blog/page.tsx
import { getBlogPosts } from "@/lib/blog";

export default async function TestBlog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = await getBlogPosts(locale as "en" | "id");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts ({locale})</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.slug} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
            <div className="text-sm text-gray-500 mt-2">
              {post.date} • {post.readingTime} • {post.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

Akses `/test-blog` dan `/id/test-blog` untuk melihat apakah MDX posts ter-load dengan benar!
