import BlogGrid from "./BlogGrid";
import CategoryFilter from "./CategoryFilter";

interface BlogCategoryPageProps {
  posts: BlogPostMetadata[];
  category: string;
  allCategories: string[];
  locale: "en" | "id";
}

export default function BlogCategoryPage({
  posts,
  category,
  allCategories,
  locale,
}: BlogCategoryPageProps) {
  const getCategoryLabel = (cat: string) => {
    const labels = {
      en: {
        tutorial: "Tutorial",
        career: "Career",
        projects: "Project Stories",
        review: "Tech Review",
        thoughts: "Thoughts",
      },
      id: {
        tutorial: "Tutorial",
        karir: "Karir",
        projects: "Project Stories",
        review: "Tech Review",
        refleksi: "Refleksi",
      },
    };
    return labels[locale][cat as keyof (typeof labels)[typeof locale]] || cat;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
              {getCategoryLabel(category)}
            </h1>
            <p className="text-gray-600">
              {posts.length}{" "}
              {locale === "id"
                ? "artikel dalam kategori ini"
                : "articles in this category"}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter
            categories={allCategories}
            activeCategory={category}
          />
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <BlogGrid posts={posts} />
          </div>
        </div>
      </section>
    </div>
  );
}
