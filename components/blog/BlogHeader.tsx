"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlogHeaderProps {
  onSearch?: (results: BlogPostMetadata[]) => void;
  posts?: BlogPostMetadata[];
}

export default function BlogHeader({ onSearch, posts = [] }: BlogHeaderProps) {
  const t = useTranslations("blog");

  return (
    <section className="bg-hero-pattern py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Small Badge */}
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-100">Blog</span>
          </div>

          {/* Compact Title */}
          <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            {t("title")}
          </h1>

          {/* Short Subtitle */}
          <p className="mx-auto mb-6 max-w-2xl text-gray-300">
            {t("subtitle")}
          </p>

          {/* Compact Search Bar */}
          {onSearch && posts && (
            <div className="mx-auto max-w-md">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={t("searchPlaceholder")}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pl-10 text-sm text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    onChange={(e) => {
                      const searchTerm = e.target.value.toLowerCase();
                      const filtered = posts.filter(
                        (post) =>
                          post.title.toLowerCase().includes(searchTerm) ||
                          post.excerpt.toLowerCase().includes(searchTerm)
                      );
                      onSearch(filtered);
                    }}
                  />
                  <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                </div>
                <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium transition-colors hover:bg-primary/90">
                  {t("search")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
