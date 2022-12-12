import React from "react";
import { useSelector } from "react-redux";
import { redirect, useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { getCurrentUserId } from "../store/users";
import EditUserPage from "../components/page/editUserPage/editUser";
import UserPage from "../components/page/userPage/userPage";

const Users = () => {
    const params = useParams();
    const { id, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <UsersLoader>
            {id ? (
                edit ? (
                    id === currentUserId ? (
                        <EditUserPage />
                    ) : (
                        redirect(`/users/${currentUserId}/edit`)
                    )
                ) : (
                    <UserPage userId={id} />
                )
            ) : (
                <UsersListPage />
            )}
        </UsersLoader>
    );
};

export default Users;
