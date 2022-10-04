import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import UserPage from "./components/common/page/userPage/userPage";
import NotFoundPage from "./layouts/notFoundPage";

import Layout from "./components/ui/layout";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="login" element={<Login />} />
                    <Route path="users" element={<Users />} />
                    <Route path="users/:id" element={<UserPage />} />
                    <Route path="404" element={<NotFoundPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
