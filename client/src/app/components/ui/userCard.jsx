import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";
import { getCurrentUserId } from "../../store/users";

const UserCard = ({ user }) => {
    const navigate = useNavigate();
    const currentUserId = useSelector(getCurrentUserId());
    const userProfession = useSelector(getProfessionById(user.profession));
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const handleGoToEditUser = () => {
        navigate(`/users/${currentUserId}/edit`, { replace: false });
    };

    if (!professionsLoading && user) {
        return (
            <div className="card mb-3 shadow">
                <div className="card-body">
                    {currentUserId === user._id && (
                        <button
                            className="position-absolute top-0 end-0 btn btn-light btn-sm"
                            onClick={handleGoToEditUser}
                        >
                            <i className="bi bi-gear"></i>
                        </button>
                    )}
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <img
                            src={user.image}
                            className="rounded-circle shadow-1-strong shadow"
                            alt="avatar"
                            width="150"
                            height="150"
                        />
                        <div className="mt-3">
                            <h4>{user.name}</h4>
                            <p className="text-secondary mb-1">
                                {userProfession.name}
                            </p>
                            <div className="text-muted">
                                <i
                                    className="bi bi-caret-down-fill text-primary"
                                    role="button"
                                ></i>
                                <i
                                    className="bi bi-caret-up text-secondary"
                                    role="button"
                                ></i>
                                <span className="ms-2">{user.rate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
