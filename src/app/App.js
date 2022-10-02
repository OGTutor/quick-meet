import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import MainPage from "./components/pages/mainPage";
import LoginPage from "./components/pages/loginPage";
import UsersPage from "./components/pages/usersPage";
import UserPage from "./components/pages/userPage";
import NotFoundPage from "./components/pages/notFoundPage";

import Layout from "./components/layout";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/:id" element={<UserPage />} />
                    <Route path="404" element={<NotFoundPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
