import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import qualitiesService from "../services/quality.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        getQualitiesList();
    }, []);

    async function getQualitiesList() {
        try {
            const { content } = await qualitiesService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function getQuality(id) {
        return qualities.find((q) => q._id === id);
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default QualitiesProvider;
