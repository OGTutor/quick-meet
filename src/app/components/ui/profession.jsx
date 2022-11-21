import React from "react";
import PropTypes from "prop-types";

import { useProfessions } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h1>Loading...</h1>
                    </div>
                </div>
            </div>
        );
    }
};

Profession.propTypes = { id: PropTypes.string };

export default Profession;
