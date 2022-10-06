import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import api from "../../api";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({});
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const handleBackToLogin = () => {
        navigate("/authorization/login");
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: { message: "Email is required!" },
            isEmail: { message: "Email entered incorrectly!" }
        },
        password: {
            isRequired: { message: "Password is required!" },
            isCapitalSymbol: {
                message:
                    "The password must contain at least one capital letter!"
            },
            isContainDigit: {
                message: "The password must contain at least one number!"
            },
            min: {
                message: "The password must contain at least 8 characters!",
                value: 8
            }
        },
        profession: { isRequired: { message: "Profession is required!" } },
        license: {
            isRequired: {
                message: "You need to confirm the license agreement!"
            }
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
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h3 className="mb-4">Register</h3>
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
                            <SelectField
                                label="Choose your profession"
                                value={data.profession}
                                onChange={handleChange}
                                defaultOption="Choose..."
                                name="professions"
                                options={professions}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Choose your gender"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Choose your qualities"
                            />
                            <CheckBoxField
                                value={data.license}
                                onChange={handleChange}
                                name="license"
                                error={errors.license}
                            >
                                I agree to the <a>license agreement</a>
                            </CheckBoxField>
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
                            onClick={() => handleBackToLogin()}
                        >
                            Sign in instead
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
