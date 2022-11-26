import React from "react";

import SelectField from "../../../form/selectField";
import { useUser } from "../../../../../hooks/useUsers";
import TextField from "../../../form/textField";

const CreateComments = () => {
    const { users } = useUser();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Publish");
    };
    console.log(users);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <div>
                        <h2>New comment</h2>
                        <form onSubmit={handleSubmit}>
                            <SelectField
                                defaultOption="Choose user..."
                                name="userId"
                                options={users}
                            />
                            <TextField
                                label="Message"
                                type="TextArea"
                                name="comment"
                                // value={data.password}
                                // onChange={handleChange}
                                // error={errors.password}
                            />
                            <button
                                type="submit"
                                className="btn btn-outline-primary w-10"
                            >
                                Publish
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateComments;
