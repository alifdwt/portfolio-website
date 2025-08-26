import { getBlogPosts } from "@/lib/blog";

export default async function TestBlog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = await getBlogPosts(locale as "en" | "id");

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="mb-8 text-3xl font-bold">Blog Posts ({locale})</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.slug} className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
            <div className="mt-2 text-sm text-gray-500">
              {post.date} • {post.readingTime} • {post.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
