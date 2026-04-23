
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

function Pagination ({ currentPage, totalPages, setCurrentPage }: PaginationProps) {

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const getPageNumbers = () => {
        const pages: (number | "...")[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="mt-12 border-t border-yellow-500/20 pt-8">
            <div className="flex items-center justify-between">
                {/* Left label */}
                <span className="text-gray-600 text-[10px] font-mono tracking-[0.4em] uppercase hidden sm:block">
                                Secteur {currentPage} / {totalPages}
                            </span>

                {/* Page controls */}
                <div className="flex items-center gap-1 mx-auto sm:mx-0">
                    {/* Prev button */}
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="group flex items-center gap-2 px-4 py-2 border border-yellow-500/30 text-yellow-500/60 text-xs font-mono tracking-widest uppercase hover:border-yellow-500 hover:text-yellow-400 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        <svg
                            className="w-3 h-3 transition-transform group-hover:-translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Préc
                    </button>

                    {/* Page numbers */}
                    <div className="flex items-center gap-1 mx-2">
                        {getPageNumbers().map((page, idx) =>
                            page === "..." ? (
                                <span
                                    key={`ellipsis-${idx}`}
                                    className="w-8 text-center text-gray-600 font-mono text-xs"
                                >
                                                ···
                                            </span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page as number)}
                                    className={`
                                                    relative w-9 h-9 text-xs font-mono font-bold tracking-wider transition-all duration-200
                                                    ${
                                        currentPage === page
                                            ? "bg-yellow-500 text-black"
                                            : "border border-yellow-500/20 text-gray-500 hover:border-yellow-500/60 hover:text-yellow-400"
                                    }
                                                `}
                                >
                                    {currentPage === page && (
                                        <span className="absolute inset-0 bg-yellow-400/20 animate-ping rounded-sm" />
                                    )}
                                    {String(page as number).padStart(2, "0")}
                                </button>
                            )
                        )}
                    </div>

                    {/* Next button */}
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="group flex items-center gap-2 px-4 py-2 border border-yellow-500/30 text-yellow-500/60 text-xs font-mono tracking-widest uppercase hover:border-yellow-500 hover:text-yellow-400 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        Suiv
                        <svg
                            className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Right decorative line */}
                <div className="hidden sm:flex items-center gap-3">
                    <div className="h-px w-16 bg-yellow-500/30" />
                    <div className="w-1.5 h-1.5 bg-yellow-500/40 rotate-45" />
                </div>
            </div>
        </div>
    )
}

export default Pagination;