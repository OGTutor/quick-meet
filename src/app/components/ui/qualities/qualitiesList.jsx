import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();

    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => (
                    <Quality key={qual} id={qual} />
                ))}
            </>
        );
    } else {
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>;
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
