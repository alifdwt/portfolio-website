import { format } from "date-fns";
import { id as idLocale, enUS } from "date-fns/locale";
import { Calendar, Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: BlogPostMetadata;
  featured?: boolean;
  size?: "small" | "medium" | "large";
}

export default function BlogCard({
  post,
  featured = false,
  size = "medium",
}: BlogCardProps) {
  const locale = useLocale();
  const dateLocale = locale === "id" ? idLocale : enUS;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy", { locale: dateLocale });
  };

  const getGradientClass = (category: string) => {
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

  const getCardHeight = () => {
    if (size === "small") return "h-40";
    if (size === "large") return "h-64";
    return "h-48";
  };

  const getTextSize = () => {
    if (size === "small") return { title: "text-sm", excerpt: "text-xs" };
    if (size === "large") return { title: "text-lg", excerpt: "text-sm" };
    return { title: "text-base", excerpt: "text-sm" };
  };

  const textSizes = getTextSize();

  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <article
        className={`group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${
          featured ? "border-2 border-blue-200" : ""
        }`}
      >
        {/* Image/Cover Area */}
        <div
          className={`${getCardHeight()} ${getGradientClass(
            post.category
          )} relative flex items-center justify-center`}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="text-center text-gray-600">
              <div className="mb-2 text-3xl">
                {post.category === "tutorial" && "💻"}
                {(post.category === "karir" || post.category === "career") &&
                  "💼"}
                {post.category === "projects" && "🚀"}
                {post.category === "review" && "⭐"}
                {(post.category === "thoughts" ||
                  post.category === "refleksi") &&
                  "💭"}
              </div>
              <p className="text-sm font-medium capitalize">{post.category}</p>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              variant="secondary"
              className="bg-white/90 text-gray-700 capitalize"
            >
              {post.category}
            </Badge>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary">Featured</Badge>
            </div>
          )}
        </div>

        {/* Content Area */}
        {/* <div className={`p-${size === "small" ? "4" : "6"}`}> */}
        <div className={size === "small" ? "p-4" : "p-6"}>
          {/* Title */}
          <h3
            className={`mb-2 line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-primary ${textSizes.title}`}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={`mb-4 line-clamp-2 text-gray-600 ${textSizes.excerpt}`}>
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center space-x-1">
                <Tag className="h-3 w-3" />
                <span className="max-w-20 truncate">
                  {post.tags[0]}
                  {post.tags.length > 1 && ` +${post.tags.length - 1}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
