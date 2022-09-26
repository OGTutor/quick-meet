import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
    itemsCount,
    pageSize,
    onPageChange,
    currentPage,
    onPageChangeNextPrevious
}) => {
    const pageCount = Math.ceil(itemsCount / pageSize);

    if (pageCount === 1) return null;

    const pages = _.range(1, pageCount + 1);

    return (
        <>
            {pageCount > 0 && (
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className="page-item" key={"page_previous"}>
                            <button
                                className="page-link"
                                onClick={() =>
                                    onPageChangeNextPrevious(
                                        currentPage,
                                        "previous",
                                        pages.length
                                    )
                                }
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {pages.map((page) => (
                            <li
                                className={
                                    "page-item" +
                                    (page === currentPage ? " active" : "")
                                }
                                key={"page_" + page}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => onPageChange(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}
                        <li className="page-item" key={"page_next"}>
                            <button
                                className="page-link"
                                onClick={() =>
                                    onPageChangeNextPrevious(
                                        currentPage,
                                        "next",
                                        pages.length
                                    )
                                }
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChangeNextPrevious: PropTypes.func.isRequired
};

export default Pagination;
