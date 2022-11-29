import React, { useState } from "react";
import PropTypes from "prop-types";

import api from "../../../../../api";

const CreateComments = ({ users }) => {
    const [comment, setComment] = useState({
        userId: "",
        message: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        api.comments.add(comment);
    };
    const handleChange = ({ target }) => {
        setComment((prevState) => ({
            ...prevState,
            [target.name]: [target.value]
        }));
    };

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <div>
                        <h2>New comment</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <select
                                    className="form-select"
                                    id="userId"
                                    name="userId"
                                    onChange={handleChange}
                                    value={comment.userId}
                                >
                                    <option disabled value="" selected>
                                        Choose user...
                                    </option>
                                    {users &&
                                        users.map((user) => (
                                            <option
                                                key={user._id}
                                                value={user._id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="comment">
                                    Message
                                </label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    type="text"
                                    rows="3"
                                    onChange={handleChange}
                                    value={comment.message}
                                ></textarea>
                            </div>
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

CreateComments.propTypes = {
    users: PropTypes.array
};

export default CreateComments;
