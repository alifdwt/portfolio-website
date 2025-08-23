import { format } from "date-fns";
import { id as idLocale, enUS } from "date-fns/locale";
import { Clock } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface BlogSidebarProps {
  featuredPosts: BlogPostMetadata[];
  latestPosts: BlogPostMetadata[];
}

export default function BlogSidebar({
  featuredPosts,
  latestPosts,
}: BlogSidebarProps) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const dateLocale = locale === "id" ? idLocale : enUS;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy", { locale: dateLocale });
  };

  const getGradientClass = (category: string) => {
    const gradients = {
      tutorial: "bg-gradient-to-br from-blue-500 to-blue-600",
      karir: "bg-gradient-to-br from-green-500 to-emerald-600",
      career: "bg-gradient-to-br from-green-500 to-emerald-600",
      projects: "bg-gradient-to-br from-orange-500 to-amber-600",
      review: "bg-gradient-to-br from-purple-500 to-pink-600",
      thoughts: "bg-gradient-to-br from-gray-600 to-slate-700",
      refleksi: "bg-gradient-to-br from-gray-600 to-slate-700",
    };
    return gradients[category as keyof typeof gradients] || gradients.tutorial;
  };

  const SidebarPost = ({ post }: { post: BlogPostMetadata }) => (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <article className="flex gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50">
        <div
          className={`h-16 w-16 ${getGradientClass(
            post.category
          )} flex flex-shrink-0 items-center justify-center rounded-lg`}
        >
          <span className="text-sm text-white">
            {post.category === "tutorial" && "💻"}
            {(post.category === "karir" || post.category === "career") && "💼"}
            {post.category === "projects" && "🚀"}
            {post.category === "review" && "⭐"}
            {(post.category === "thoughts" || post.category === "refleksi") &&
              "💭"}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs text-gray-500">{formatDate(post.date)}</p>
          <h4 className="line-clamp-2 text-sm leading-tight font-semibold text-gray-900 transition-colors hover:text-primary">
            {post.title}
          </h4>
          <div className="mt-1 flex items-center space-x-2 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );

  return (
    <div className="space-y-8">
      {/* Featured Section */}
      {featuredPosts.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            {t("sidebar.featured")}
          </h3>
          <div className="space-y-1">
            {featuredPosts.map((post) => (
              <SidebarPost key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Latest Section */}
      {latestPosts.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            {t("sidebar.latest")}
          </h3>
          <div className="space-y-1">
            {latestPosts.map((post) => (
              <SidebarPost key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
