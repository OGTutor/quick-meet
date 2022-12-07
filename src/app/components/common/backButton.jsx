import React from "react";
import { useNavigate } from "react-router-dom";

const BackHistoryButton = () => {
    const navigate = useNavigate();

    const handleBackToUserPage = () => {
        navigate(-1);
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
