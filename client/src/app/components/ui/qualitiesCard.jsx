import React from "react";
import PropTypes from "prop-types";

import Qualities from "./qualities";
import { useSelector } from "react-redux";
import { getQualitiesLoadingStatus } from "../../store/qualities";

const QualitiesCard = ({ data }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());

    if (isLoading) {
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>;
    }
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
};

QualitiesCard.propTypes = {
    data: PropTypes.array
};

export default QualitiesCard;
