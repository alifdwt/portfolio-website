import { notFound } from "next/navigation";

import BlogCategoryPage from "@/components/blog/BlogCategoryPage";
import { getPostsByCategory, getCategories } from "@/lib/blog";

export async function generateStaticParams({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const categories = await getCategories(locale as "en" | "id");

  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  const typedLocale = locale as "en" | "id";

  const [posts, allCategories] = await Promise.all([
    getPostsByCategory(category, typedLocale),
    getCategories(typedLocale),
  ]);

  // Check if category exists
  if (!allCategories.includes(category)) {
    notFound();
  }

  return (
    <BlogCategoryPage
      posts={posts}
      category={category}
      allCategories={allCategories}
      locale={typedLocale}
    />
  );
}
