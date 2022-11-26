import React from "react";
import PropTypes from "prop-types";

import Quality from "./quality";
import { useQualities } from "../../../../../hooks/useQualities";

const QualitiesCard = ({ qualities }) => {
    const { isLoading } = useQualities();

    if (!isLoading) {
        return (
            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Qualities</span>
                    </h5>
                    <p className="card-text">
                        {qualities.map((qual) => (
                            <Quality key={qual} id={qual} />
                        ))}
                    </p>
                </div>
            </div>
        );
    }
};

QualitiesCard.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesCard;
