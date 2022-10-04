import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const handleBackToLogin = () => {
        navigate("/authorization/login");
    };
    return (
        <>
            <h1>Register Form</h1>
            <button
                className="btn btn-outline-primary"
                onClick={() => handleBackToLogin()}
            >
                Sign in instead
            </button>
        </>
    );
};

export default RegisterForm;
