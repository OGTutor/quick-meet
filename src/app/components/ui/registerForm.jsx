import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        license: false
    });
    const qualities = useSelector(getQualities());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const professions = useSelector(getProfessions());
    const [errors, setErrors] = useState({});

    const handleBackToLogin = () => {
        navigate("/login");
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
        name: {
            isRequired: { message: "Name is required!" },
            min: {
                message: "Name must contain at least 3 characters!",
                value: 3
            }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        dispatch(signUp({ payload: newData, navigate }));

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
                                label="Name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
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
                                defaultOption="Choose profession..."
                                name="profession"
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
                                options={qualitiesList}
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
