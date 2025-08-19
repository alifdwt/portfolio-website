import BlogMainPage from "@/components/blog/BlogMainPage";
import { getBlogPosts, getFeaturedPosts, getCategories } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return {
    title: locale === "id" ? "Blog - Alif Dewantara" : "Blog - Alif Dewantara",
    description:
      locale === "id"
        ? "Tutorial programming, tips karir, dan insights tentang pengembangan web modern dari Alif Dewantara."
        : "Programming tutorials, career tips, and insights about modern web development from Alif Dewantara.",
    openGraph: {
      title:
        locale === "id" ? "Blog - Alif Dewantara" : "Blog - Alif Dewantara",
      description:
        locale === "id"
          ? "Tutorial programming, tips karir, dan insights tentang pengembangan web modern."
          : "Programming tutorials, career tips, and insights about modern web development.",
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as "en" | "id";

  // Fetch all blog data
  const [allPosts, featuredPosts, categories] = await Promise.all([
    getBlogPosts(typedLocale),
    getFeaturedPosts(typedLocale),
    getCategories(typedLocale),
  ]);

  return (
    <BlogMainPage
      allPosts={allPosts}
      featuredPosts={featuredPosts}
      categories={categories}
      locale={typedLocale}
    />
  );
}
