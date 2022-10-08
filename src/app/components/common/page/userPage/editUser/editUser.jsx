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

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality]._id) {
                    qualitiesArray.push(qualities[quality]);
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return null;

        const { profession, qualities } = data;
        api.users.update(id, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        navigate(`/users/${id}`);
    };

    const transformData = (data) => {
        return data.map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
    };

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(id).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        );
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

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

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    if (!isLoading && Object.keys(professions).length > 0) {
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
                                    label="Choose gender"
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                    label="Choose qualities"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-outline-dark w-100 mx-auto"
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
