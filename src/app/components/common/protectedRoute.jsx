import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { currentUser } = useAuth();
    const { id } = useParams();
    const isLoggedIn = useSelector(getIsLoggedIn());

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    } else if (currentUser._id !== id && children.type.name === "EditUser") {
        return (
            <Navigate
                to={`/users/${currentUser._id}/edit`}
                state={{ from: location }}
            />
        );
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
