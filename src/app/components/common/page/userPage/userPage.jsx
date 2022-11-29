import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useUser } from "../../../../hooks/useUsers";
import UserCard from "./userCard/userCard";
import QualitiesCard from "./userQualitiesCard/qualitiesCard";
import MeetingsCard from "./userMeetingsCard/meetingsCard";
import CreateComments from "./userCreateComments/createComments";
import PublishedComments from "./userPublishedComments/comments";

const UserPage = () => {
    const [comments, setComments] = useState([]);
    const { getUser, users } = useUser();
    const { id } = useParams();
    const user = getUser(id);
    const navigate = useNavigate();

    const handleGoToEditUser = () => {
        navigate(`/users/${id}/edit`, { replace: true });
    };

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard
                            name={user.name}
                            profession={user.profession}
                            rate={user.rate}
                            goToEditUser={handleGoToEditUser}
                        />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard meetings={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CreateComments users={users} />
                        <PublishedComments comments={comments} />
                    </div>
                </div>
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
