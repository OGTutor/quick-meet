import React, { useEffect } from "react";
import { orderBy } from "lodash";

import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const commentsLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    useEffect(() => {
        dispatch(loadCommentsList(id));
    }, [id]);

    const handleSubmit = (data) => {
        dispatch(createComment({ ...data, pageId: id }));
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };

    return (
        <>
            <div className="card mb-2 shadow">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-4 shadow">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {!commentsLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
