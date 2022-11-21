import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ id }) => {
    const { getQualitie } = useQualities();
    const { _id, color, name } = getQualitie(id);

    return <span className={"badge m-1 bg-" + color}>{name}</span>;
};

Qualitie.propTypes = {
    id: PropTypes.string.isRequired
};

export default Qualitie;
