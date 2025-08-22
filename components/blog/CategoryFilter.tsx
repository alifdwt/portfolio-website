"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

interface CategoryFilterProps {
  categories: string[];
  activeCategory?: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  const router = useRouter();
  //   const pathname = usePathname()
  const locale = useLocale();
  const t = useTranslations("blog.categories");

  const handleCategoryClick = (category: string) => {
    if (category === "all") {
      router.push(`/${locale}/blog`);
    } else {
      router.push(`/${locale}/blog/category/${category}`);
    }
  };

  const getCategoryLabel = (category: string) => {
    try {
      // @ts-expect-error Server Component
      return t(category);
    } catch {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 py-4">
      <button
        onClick={() => handleCategoryClick("all")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          !activeCategory
            ? "bg-primary text-primary-foreground"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {locale === "id" ? "Semua" : "All"}
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
            activeCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {getCategoryLabel(category)}
        </button>
      ))}
    </div>
  );
}
