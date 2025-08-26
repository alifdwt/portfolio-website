export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-3 h-10 w-64 rounded bg-gray-200"></div>
            <div className="mx-auto h-6 w-48 rounded bg-gray-200"></div>
          </div>
        </div>
      </section>

      {/* Category Filter Skeleton */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-3 py-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-20 rounded-full bg-gray-200"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl bg-white shadow-sm"
                >
                  <div className="h-48 animate-pulse bg-gray-200"></div>
                  <div className="p-6">
                    <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                    <div className="mb-1 h-3 w-full rounded bg-gray-200"></div>
                    <div className="mb-4 h-3 w-2/3 rounded bg-gray-200"></div>
                    <div className="flex justify-between">
                      <div className="h-3 w-20 rounded bg-gray-200"></div>
                      <div className="h-3 w-16 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
