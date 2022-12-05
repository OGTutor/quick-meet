import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
