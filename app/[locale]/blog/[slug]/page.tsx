import { notFound } from "next/navigation";

import BlogPostPage from "@/components/blog/BlogPostPage";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";

export default async function BlogPostPageRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as "en" | "id";

  const post = await getPostBySlug(slug, typedLocale);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, post.category, typedLocale);

  return (
    <BlogPostPage
      post={post}
      relatedPosts={relatedPosts}
      locale={typedLocale}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale as "en" | "id");

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Alif Dewantara`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      locale: locale === "id" ? "id_ID" : "en_US",
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}
