import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TextField from "../../../../common/form/textField";
import SelectField from "../../../form/selectField";
import RadioField from "../../../form/radioField";
import MultiSelectField from "../../../form/multiSelectField";
import { validator } from "../../../../../utils/validator";

import api from "../../../../../api";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({});
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});

    console.log(data);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
        api.users.getById(id).then((data) => setData(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSaveChanges = () => {
        navigate(`/users/${id}`);
        api.users.update(id, data).then((data) => setData(data));
    };

    const setUserQualities = () => {
        return data.qualities.map((qualitie) => ({
            label: qualitie.name,
            value: qualitie._id
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: { message: "Email is required!" },
            isEmail: { message: "Email entered incorrectly!" }
        },
        name: {
            isRequired: { message: "User`s name is required!" }
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
    if (data && professions && qualities) {
        return (
            <>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <h3 className="mb-4">Edit User</h3>
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
                                <SelectField
                                    label="Choose profession"
                                    value={data.profession._id}
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
                                    label="Choose gender"
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={setUserQualities()}
                                    name="qualities"
                                    label="Choose qualities"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-outline-dark w-100 mx-auto"
                                    onClick={() => handleSaveChanges()}
                                >
                                    Refresh
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
