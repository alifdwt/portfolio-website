import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  basePath,
}: BlogPaginationProps) {
  const locale = useLocale();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.filter(
    (page) =>
      page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
  );

  return (
    <nav className="mt-12 flex items-center justify-center space-x-2">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link
          href={`/${locale}${basePath}?page=${currentPage - 1}`}
          className="flex items-center rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          {locale === "id" ? "Sebelumnya" : "Previous"}
        </Link>
      )}

      {/* Page Numbers */}
      {showPages.map((page, index) => (
        <span key={page}>
          {index > 0 && showPages[index - 1] !== page - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          <Link
            href={`/${locale}${basePath}?page=${page}`}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {page}
          </Link>
        </span>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={`/${locale}${basePath}?page=${currentPage + 1}`}
          className="flex items-center rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          {locale === "id" ? "Selanjutnya" : "Next"}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
