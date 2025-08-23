import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="mb-4 text-6xl">📝</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Blog Post Not Found
        </h1>
        <p className="mb-6 text-gray-600">
          The blog post you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
