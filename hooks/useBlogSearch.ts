"use client";

import { useState, useMemo, useCallback } from "react";

interface UseBlogSearchResult {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredPosts: BlogPostMetadata[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  resetFilters: () => void;
}

export function useBlogSearch(posts: BlogPostMetadata[]): UseBlogSearchResult {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          post.category.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    return filtered;
  }, [posts, searchTerm, selectedCategory]);

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory(null);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filteredPosts,
    selectedCategory,
    setSelectedCategory,
    resetFilters,
  };
}
