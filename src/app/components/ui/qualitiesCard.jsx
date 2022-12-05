import React from "react";
import PropTypes from "prop-types";

import Qualities from "./qualities";
import { useQualities } from "../../hooks/useQualities";

const QualitiesCard = ({ data }) => {
    const { isLoading } = useQualities();

    if (!isLoading) {
        return (
            <div className="card mb-3 shadow">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Qualities</span>
                    </h5>
                    <p className="card-text">
                        <Qualities qualities={data} />
                    </p>
                </div>
            </div>
        );
    }
};

QualitiesCard.propTypes = {
    data: PropTypes.array
};

export default QualitiesCard;
