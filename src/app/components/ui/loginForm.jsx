import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { validator } from "../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signIn } from "../../store/users";

const LoginForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const loginError = useSelector(getAuthErrors());
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleBackToRegister = () => {
        navigate(`/register`);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        let redirect;
        if (state === null) {
            redirect = "/";
        } else {
            redirect = state.from.pathname ? state.from.pathname : "/";
        }
        dispatch(signIn({ payload: data, navigate, redirect }));
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
                            {loginError && (
                                <p className="text-danger">{loginError}</p>
                            )}
                            <button
                                type="submit"
                                disabled={!isValid}
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
