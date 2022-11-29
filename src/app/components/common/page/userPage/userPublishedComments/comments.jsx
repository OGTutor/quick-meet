import React, { useState, useEffect } from "react";
import { useUser } from "../../../../../hooks/useUsers";

import api from "../../../../../api";

const PublishedComments = () => {
    const { getUser } = useUser();
    const [comments, setComments] = useState([]);

    const handleCommentOwner = (id) => {
        return getUser(id);
    };
    const handleDeleteComment = (id) => {
        api.comments.remove(id);
        setComments((prevState) =>
            prevState.filter((comment) => comment._id !== id)
        );
    };

    useEffect(() => {
        api.comments.fetchAll().then((data) => setComments(data));
    }, []);

    if (comments.length > 0) {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    {comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="bg-light card-body mb-3"
                        >
                            <div key={comment._id} className="row">
                                <div key={comment._id} className="col">
                                    <div className="d-flex flex-start">
                                        <img
                                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                                Math.random() + 1
                                            )
                                                .toString(36)
                                                .substring(7)}.svg`}
                                            className="rounded-circle shadow-1-strong me-3"
                                            alt="avatar"
                                            width="65"
                                            height="65"
                                        />
                                        <div className="flex-grow-1 flex-shrink-1">
                                            <div className="mb-4">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-1">
                                                        {` ${
                                                            handleCommentOwner(
                                                                comment.userId
                                                            ).name
                                                        } `}
                                                        <span className="small">
                                                            {comment.created_at +
                                                                ` seconds ago `}
                                                        </span>
                                                    </p>
                                                    <button
                                                        className="btn btn-sm text-primary d-flex align-items-center"
                                                        onClick={() =>
                                                            handleDeleteComment(
                                                                comment._id
                                                            )
                                                        }
                                                    >
                                                        <i className="bi bi-x-lg"></i>
                                                    </button>
                                                </div>
                                                <p className="small mb-0">
                                                    Loremajdnjsnadjadn
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export default PublishedComments;
