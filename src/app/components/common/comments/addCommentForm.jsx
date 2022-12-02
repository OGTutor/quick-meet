import React, { useState } from "react";
import PropTypes from "prop-types";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";
import { useUser } from "../../../hooks/useUsers";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const { users } = useUser();
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: [target.value]
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        onSubmit(data);
        clearForm();
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Choose on whose behalf you want to leave a comment"
            }
        },
        content: {
            isRequired: { message: "Message cannot be empty" }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    console.log(data);

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={users}
                    name="userId"
                    value={data.userId}
                    defaultOption="Choose user..."
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Message"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary">Publish</button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
