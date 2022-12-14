import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";

const BackHistoryButton = () => {
    const navigate = useNavigate();
    const currentUserId = useSelector(getCurrentUserId());

    const handleBackToUserPage = () => {
        navigate(`/users/${currentUserId}`);
    };

    return (
        <button
            className="btn btn-primary"
            onClick={() => handleBackToUserPage()}
        >
            <i className="bi bi-caret-left-fill"></i>
            Back
        </button>
    );
};

export default BackHistoryButton;
