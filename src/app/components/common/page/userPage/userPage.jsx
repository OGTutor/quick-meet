import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import QualitiesList from "../../../ui/qualities/qualitiesList";

import api from "../../../../api";

const UserPage = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const handleBackAllUsers = () => {
        navigate("/users", { replace: true });
    };
    const handleGoToEditUser = () => {
        navigate(`/users/${id}/edit`, { replace: true });
    };

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>{`Profession: ${user.profession.name}`}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>{`Completed Meetings: ${user.completedMeetings}`}</p>
                <h2>{`Rate: ${user.rate}`}</h2>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => handleBackAllUsers()}
                >
                    All Users
                </button>
                <button
                    className="btn btn-outline-secondary m-2"
                    onClick={() => handleGoToEditUser()}
                >
                    Edit User
                </button>
            </div>
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

export default UserPage;
