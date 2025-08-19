// components/blog/BlogMainPage.tsx
"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";

import BlogGrid from "./BlogGrid";
import BlogHeader from "./BlogHeader";
import BlogSidebar from "./BlogSidebar";
import CategoryFilter from "./CategoryFilter";

interface BlogMainPageProps {
  allPosts: BlogPostMetadata[];
  featuredPosts: BlogPostMetadata[];
  categories: string[];
  locale: "en" | "id";
}

export default function BlogMainPage({
  allPosts,
  featuredPosts,
  categories,
  locale,
}: BlogMainPageProps) {
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const t = useTranslations("blog");

  const handleSearchResults = useCallback((results: BlogPostMetadata[]) => {
    setFilteredPosts(results);
  }, []);

  // Get latest posts (excluding featured)
  const latestPosts = allPosts.filter((post) => !post.featured).slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      {/* Blog Header */}
      <BlogHeader onSearch={handleSearchResults} posts={allPosts} />

      {/* Category Filter */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter categories={categories} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-4">
              {/* Left Content - 3/4 width */}
              <div className="lg:col-span-3">
                <BlogGrid posts={filteredPosts} title={t("recentPosts")} />

                {/* Load More Button */}
                {filteredPosts.length > 6 && (
                  <div className="mt-12 text-center">
                    <button className="rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                      {locale === "id"
                        ? "Muat Artikel Lainnya"
                        : "Load More Articles"}
                    </button>
                  </div>
                )}
              </div>

              {/* Right Sidebar - 1/4 width */}
              <div className="lg:col-span-1">
                <BlogSidebar
                  featuredPosts={featuredPosts}
                  latestPosts={latestPosts}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              {locale === "id" ? "Tetap Update" : "Stay Updated"}
            </h2>
            <p className="mb-6 text-gray-600">
              {locale === "id"
                ? "Dapatkan artikel dan tutorial terbaru langsung ke inbox Anda."
                : "Get the latest articles and tutorials delivered to your inbox."}
            </p>
            <div className="mx-auto flex max-w-sm gap-3">
              <input
                type="email"
                placeholder={
                  locale === "id" ? "Email Anda..." : "Your email..."
                }
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary/80 focus:ring-2 focus:ring-primary/20"
              />
              <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium transition-colors hover:bg-primary/80">
                {locale === "id" ? "Subscribe" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
