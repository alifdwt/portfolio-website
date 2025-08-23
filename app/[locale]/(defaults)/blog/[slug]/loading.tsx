export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation Skeleton */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="h-4 w-32 rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Article Header Skeleton */}
      <article className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Category Badge Skeleton */}
            <div className="mb-4 h-6 w-20 rounded bg-gray-200"></div>

            {/* Title Skeleton */}
            <div className="mb-6 h-12 w-full rounded bg-gray-200"></div>

            {/* Meta Information Skeleton */}
            <div className="mb-8 flex gap-6">
              <div className="h-4 w-24 rounded bg-gray-200"></div>
              <div className="h-4 w-20 rounded bg-gray-200"></div>
              <div className="h-4 w-32 rounded bg-gray-200"></div>
            </div>

            {/* Cover Image Skeleton */}
            <div className="mb-8 h-96 rounded-xl bg-gray-200"></div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 w-full rounded bg-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
