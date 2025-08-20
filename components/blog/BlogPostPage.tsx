import { format } from "date-fns";
import { id as idLocale, enUS } from "date-fns/locale";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { HTMLAttributes } from "react";

import Callout from "@/components/mdx/Callout";
import CodeBlock from "@/components/mdx/CodeBlock";
import ImageWithCaption from "@/components/mdx/ImageWithCaption";
import { Badge } from "@/components/ui/badge";
import {
  MDXHeadingProps,
  MDXParagraphProps,
  MDXListProps,
  MDXListItemProps,
  MDXLinkProps,
  MDXCodeProps,
  MDXBlockquoteProps,
  MDXTableProps,
  MDXTableHeadProps,
  MDXTableBodyProps,
  MDXTableRowProps,
  MDXTableHeaderProps,
  MDXTableDataProps,
  MDXImageProps,
  MDXStrongProps,
  MDXEmphasisProps,
} from "@/types/mdx";

import BlogCard from "./BlogCard";
import ShareButton from "./other/ShareButton";

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogPostMetadata[];
  locale: "en" | "id";
}

// Properly typed MDX components
const mdxComponents = {
  // Typography
  h1: ({ children, ...props }: MDXHeadingProps) => (
    <h1 className="mb-6 text-3xl font-bold text-gray-900" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: MDXHeadingProps) => (
    <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-900" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: MDXHeadingProps) => (
    <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-900" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: MDXParagraphProps) => (
    <p className="mb-4 leading-relaxed text-gray-700" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: MDXListProps) => (
    <ul
      className="mb-4 list-inside list-disc space-y-1 text-gray-700"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: MDXListProps) => (
    <ol
      className="mb-4 list-inside list-decimal space-y-1 text-gray-700"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: MDXListItemProps) => (
    <li className="mb-1" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: MDXStrongProps) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: MDXEmphasisProps) => (
    <em className="text-gray-700 italic" {...props}>
      {children}
    </em>
  ),

  // Links
  a: ({ href, children, ...props }: MDXLinkProps) => (
    <a
      href={href}
      className="text-blue-600 underline hover:text-blue-800"
      {...props}
    >
      {children}
    </a>
  ),

  // Code
  code: ({ children, className, ...props }: MDXCodeProps) => {
    // If it's a code block (has className with language)
    if (className?.includes("language-")) {
      return (
        <CodeBlock className={className} {...props}>
          {children}
        </CodeBlock>
      );
    }
    // Inline code
    return (
      <code
        className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-800"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>, // Let CodeBlock handle the pre tag

  // Blockquotes
  blockquote: ({ children, ...props }: MDXBlockquoteProps) => (
    <blockquote
      className="my-6 border-l-4 border-blue-500 bg-blue-50 py-2 pl-4 text-gray-700 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children, ...props }: MDXTableProps) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: MDXTableHeadProps) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: MDXTableBodyProps) => (
    <tbody className="divide-y divide-gray-200 bg-white" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: MDXTableRowProps) => (
    <tr {...props}>{children}</tr>
  ),
  th: ({ children, ...props }: MDXTableHeaderProps) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: MDXTableDataProps) => (
    <td
      className="px-6 py-4 text-sm whitespace-nowrap text-gray-900"
      {...props}
    >
      {children}
    </td>
  ),

  // Horizontal rule
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-gray-200" {...props} />
  ),

  // Custom components
  Callout,
  ImageWithCaption,

  // Images
  img: ({ caption, ...props }: MDXImageProps) => {
    if (caption) {
      return <ImageWithCaption caption={caption} {...props} />;
    }
    return (
      <Image
        width={800}
        height={400}
        className="my-6 h-auto w-full rounded-lg shadow-lg"
        {...props}
        alt={props.alt}
      />
    );
  },
} as const;

export default function BlogPostPage({
  post,
  relatedPosts,
  locale,
}: BlogPostPageProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const dateLocale = locale === "id" ? idLocale : enUS;
    return format(date, "MMMM d, yyyy", { locale: dateLocale });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {locale === "id" ? "Kembali ke Blog" : "Back to Blog"}
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Category Badge */}
            <div className="mb-4">
              <Badge variant="secondary" className="capitalize">
                {post.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="mb-8 flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>{locale === "id" ? "Oleh" : "By"}</span>
                <span className="font-medium">{post.author}</span>
              </div>
              <ShareButton locale={locale} post={post} />
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-8">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="h-96 w-full rounded-xl object-cover"
                />
              </div>
            )}

            {/* Article Content with MDX */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote
                source={post.content || ""}
                components={mdxComponents}
              />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 border-t pt-8">
                <div className="mb-4 flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {locale === "id" ? "Tags" : "Tags"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-2xl font-bold text-gray-900">
                {locale === "id" ? "Artikel Terkait" : "Related Articles"}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost.slug}
                    post={relatedPost}
                    size="medium"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
