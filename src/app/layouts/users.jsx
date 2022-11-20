import React from "react";

import UserProvider from "../hooks/useUsers";
import UsersListPage from "../components/common/page/usersListPage/usersListPage";

const Users = () => {
    return (
        <UserProvider>
            <UsersListPage />
        </UserProvider>
    );
};

export default Users;
