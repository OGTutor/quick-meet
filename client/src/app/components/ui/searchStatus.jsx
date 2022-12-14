import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "people hang";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "people are hanging";
        if (lastOne === 1) return "person hangs";
    };

    return (
        <h2>
            <span
                className={
                    "m-1 shadow badge bg-" + (length > 0 ? "primary" : "danger")
                }
            >
                {length > 0
                    ? `${length} ${renderPhrase(length)} out with you today!`
                    : "Nobody hangs out with you!"}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number
};

export default SearchStatus;
