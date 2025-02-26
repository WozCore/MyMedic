import React from "react";
import PropTypes from "prop-types";
import "./CustomPagination.css";

interface CustomPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (newPage: number) => void;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages + 2) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);

            const startPage = Math.max(currentPage - 2, 2);
            const endPage = Math.min(currentPage + 2, totalPages - 1);

            if (startPage > 2) {
                pageNumbers.push("...");
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalPages - 1) {
                pageNumbers.push("...");
            }

            pageNumbers.push(totalPages);
        }

        return pageNumbers.map((page, index) => {
            if (typeof page === "number") {
                return (
                    <button
                        key={index}
                        className={`paginationButton ${
                            currentPage === page ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                );
            } else {
                return (
                    <span key={index} className="paginationDots">
                        ...
                    </span>
                );
            }
        });
    };

    return (
        <div className="paginationContainer">
            <button
                className={`paginationButton ${
                    currentPage === 1 ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {"<"}
            </button>

            {renderPageNumbers()}

            <button
                className={`paginationButton ${
                    currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {">"}
            </button>
        </div>
    );
};

CustomPagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};
