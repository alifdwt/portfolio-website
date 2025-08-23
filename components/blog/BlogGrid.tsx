import BlogCard from "./BlogCard";

interface BlogGridProps {
  posts: BlogPostMetadata[];
  title?: string;
}

export default function BlogGrid({ posts, title }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-6xl text-gray-400">📝</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          No articles found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="mb-8 text-2xl font-bold text-gray-900">{title}</h2>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} featured={post.featured} />
        ))}
      </div>
    </div>
  );
}
