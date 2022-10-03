import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import QualitiesList from "../qualitiesList";

import api from "../../api";

const UserPage = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, [id]);

    const handleBackAllUsers = () => {
        navigate("/users", { replace: true });
    };

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>{`Profession: ${user.profession.name}`}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>{`Completed Meetings: ${user.completedMeetings}`}</p>
                <h2>{`Rate: ${user.rate}`}</h2>
                <button onClick={() => handleBackAllUsers()}>All Users</button>
            </div>
        );
    }
    return <h1>Loading...</h1>;
};

export default UserPage;
