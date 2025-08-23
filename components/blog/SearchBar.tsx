"use client";

import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, useMemo } from "react";

interface SearchBarProps {
  posts: BlogPostMetadata[];
  onSearchResults: (results: BlogPostMetadata[]) => void;
}

export default function SearchBar({ posts, onSearchResults }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const locale = useLocale();
  const t = useTranslations("blog");

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) {
      return posts;
    }

    const searchLower = searchTerm.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        post.category.toLowerCase().includes(searchLower)
    );
  }, [posts, searchTerm]);

  // Call onSearchResults whenever filteredPosts changes
  useMemo(() => {
    onSearchResults(filteredPosts);
  }, [filteredPosts, onSearchResults]);

  return (
    <div className="mx-auto max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pl-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
      </div>

      {searchTerm && (
        <div className="mt-2 text-sm text-gray-600">
          {filteredPosts.length}{" "}
          {locale === "id" ? "artikel ditemukan" : "articles found"}
        </div>
      )}
    </div>
  );
}
