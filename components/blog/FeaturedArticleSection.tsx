import { format } from "date-fns";
import { id as idLocale, enUS } from "date-fns/locale";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedArticleSectionProps {
  post: BlogPostMetadata;
  locale: "en" | "id";
}

export default function FeaturedArticleSection({
  post,
  locale,
}: FeaturedArticleSectionProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const dateLocale = locale === "id" ? idLocale : enUS;
    return format(date, "MMM d, yyyy", { locale: dateLocale });
  };

  const getGradientClass = (category: string): string => {
    const gradients = {
      tutorial: "bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100",
      karir: "bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100",
      career: "bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100",
      projects: "bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100",
      review: "bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100",
      thoughts: "bg-gradient-to-br from-gray-100 via-slate-50 to-zinc-100",
      refleksi: "bg-gradient-to-br from-gray-100 via-slate-50 to-zinc-100",
    };
    return gradients[category as keyof typeof gradients] || gradients.tutorial;
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              {locale === "id" ? "Artikel Unggulan" : "Featured Article"}
            </h2>
          </div>

          <div className="grid gap-8 overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-500 hover:shadow-xl lg:grid-cols-2">
            {/* Left Side - Article Info */}
            <div className={`${getGradientClass(post.category)} p-8 lg:p-12`}>
              {/* Category */}
              <div className="mb-6">
                <Badge
                  variant="secondary"
                  className="bg-white/70 text-gray-700 capitalize"
                >
                  {post.category}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
                {post.title}
              </h3>

              {/* Meta */}
              <div className="mb-6 flex items-center text-sm text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{formatDate(post.date)}</span>
                <span className="mx-2">•</span>
                <Clock className="mr-2 h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>

              {/* Excerpt */}
              <p className="mb-8 leading-relaxed text-gray-600">
                {post.excerpt}
              </p>

              {/* Author Note */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700">
                  {locale === "id" ? "Oleh" : "By"} {post.author}
                </p>
              </div>

              {/* Read More Button */}
              <Button
                asChild
                className="group bg-gray-900 text-white hover:bg-gray-800"
              >
                <Link href={`/${locale}/blog/${post.slug}`}>
                  {locale === "id" ? "Baca Selengkapnya" : "Read More"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>

              {/* Tags */}
              <div className="mt-8">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-white/50 px-2 py-1 text-xs font-medium text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="rounded bg-white/50 px-2 py-1 text-xs font-medium text-gray-700">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                  <div className="text-center text-gray-400">
                    <div className="mb-4 text-6xl">
                      {post.category === "tutorial" && "💻"}
                      {(post.category === "karir" ||
                        post.category === "career") &&
                        "💼"}
                      {post.category === "projects" && "🚀"}
                      {post.category === "review" && "⭐"}
                      {(post.category === "thoughts" ||
                        post.category === "refleksi") &&
                        "💭"}
                    </div>
                    <p className="text-lg font-medium">Featured Article</p>
                  </div>
                </div>
              )}

              {/* Floating Featured Label */}
              <div className="absolute top-4 right-4">
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-sm">
                  {locale === "id" ? "Unggulan" : "Featured"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
