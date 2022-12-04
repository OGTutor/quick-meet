import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { validator } from "../../utils/validator";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);
    const { signIn } = useAuth();

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);
    };

    const handleBackToRegister = () => {
        navigate(`/authorization/:login/register`);
    };

    const validatorConfig = {
        email: {
            isRequired: { message: "Email is required!" }
        },
        password: {
            isRequired: { message: "Password is required!" }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        try {
            await signIn(data);
            navigate("/");
        } catch (error) {
            setEnterError(error.message);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h3 className="mb-4">Login</h3>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                error={errors.password}
                            />
                            <CheckBoxField
                                value={data.stayOn}
                                onChange={handleChange}
                                name="stayOn"
                            >
                                Remain in the system
                            </CheckBoxField>
                            {enterError && (
                                <p className="text-danger">{enterError}</p>
                            )}
                            <button
                                type="submit"
                                disabled={!isValid || enterError}
                                className="btn btn-outline-dark w-100 mx-auto"
                            >
                                Submit
                            </button>
                        </form>
                        <button
                            className="btn btn-outline-primary mt-4"
                            onClick={() => handleBackToRegister()}
                        >
                            Create account
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
