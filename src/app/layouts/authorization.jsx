import React from "react";
import { useNavigate } from "react-router-dom";

const Authorization = () => {
    const navigate = useNavigate();

    const handleToRegister = () => {
        navigate("/authorization/:login/register");
    };
    const handleToLogin = () => {
        navigate("/authorization/login");
    };

    return (
        <>
            <div className="col-md-6 offset-md-3 shadow p-4">
                <div className="d-grid gap-2">
                    <button
                        className="btn btn-outline-success"
                        onClick={() => handleToLogin()}
                    >
                        Sign in instead
                    </button>
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => handleToRegister()}
                    >
                        Create account
                    </button>
                </div>
            </div>
        </>
    );
};

export default Authorization;
