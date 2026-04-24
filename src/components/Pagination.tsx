import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // ex: "/" ou "/categoria/politica"
}

export default function Pagination({ currentPage, totalPages, basePath = "/" }: PaginationProps) {
  if (totalPages <= 1) return null;

  const makeHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?pagina=${page}`;

  // Gera os números de página com reticências inteligentes
  const getPages = (): (number | "...")[] => {
    const delta = 2; // páginas ao redor da atual
    const pages: (number | "...")[] = [];
    const left = currentPage - delta;
    const right = currentPage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const pages = getPages();

  return (
    <nav className="mt-12 flex items-center justify-center gap-1" aria-label="Paginação">
      {/* Anterior */}
      <Link
        href={makeHref(currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-full border text-sm font-medium transition-colors
          ${currentPage === 1
            ? "border-gray-200 text-gray-300 pointer-events-none"
            : "border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600"
          }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </Link>

      {/* Números */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm select-none">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={makeHref(page)}
            className={`flex items-center justify-center w-10 h-10 rounded-full border text-sm font-bold transition-colors
              ${page === currentPage
                ? "bg-blue-600 border-blue-600 text-white shadow-md"
                : "border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600"
              }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        )
      )}

      {/* Próximo */}
      <Link
        href={makeHref(currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-10 h-10 rounded-full border text-sm font-medium transition-colors
          ${currentPage === totalPages
            ? "border-gray-200 text-gray-300 pointer-events-none"
            : "border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600"
          }`}
      >
        <ChevronRight className="w-4 h-4" />
      </Link>
    </nav>
  );
}
