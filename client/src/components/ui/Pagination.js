"use client"
import { ChevronLeft, ChevronRight } from "react-feather"

const Pagination = ({ currentPage, totalPages, onPageChange, siblingCount = 1, className = "" }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3 // siblings + current + first + last
    const totalBlocks = totalNumbers + 2 // +2 for the "..." blocks

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * siblingCount
      return [...Array.from({ length: leftItemCount }, (_, i) => i + 1), "...", totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * siblingCount
      return [1, "...", ...Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1)]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      return [
        1,
        "...",
        ...Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i),
        "...",
        totalPages,
      ]
    }
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className={`flex justify-center mt-8 ${className}`}>
      <ul className="flex items-center space-x-1">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </li>

        {pageNumbers?.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 py-2">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 rounded-md ${currentPage === page ? "bg-primary text-white" : "hover:bg-muted"}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination

