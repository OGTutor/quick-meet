import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Main from "./layouts/main";
import Authorization from "./layouts/authorization";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";
import Users from "./layouts/users";
import UserPage from "./components/common/page/userPage/userPage";
import EditUser from "./components/common/page/editUserPage/editUser";
import NotFoundPage from "./layouts/notFoundPage";

import Layout from "./components/ui/layout";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import { UserProvider } from "./hooks/useUsers";

const App = () => {
    return (
        <>
            <UserProvider>
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Main />} />
                                <Route
                                    path="authorization"
                                    element={<Authorization />}
                                />
                                <Route
                                    path="authorization/:login"
                                    element={<LoginForm />}
                                />
                                <Route
                                    path="authorization/:login/register"
                                    element={<RegisterForm />}
                                />
                                <Route path="users" element={<Users />} />
                                <Route
                                    path="users/:id"
                                    element={<UserPage />}
                                />
                                <Route
                                    path="users/:id/edit"
                                    element={<EditUser />}
                                />
                                <Route path="404" element={<NotFoundPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Route>
                        </Routes>
                    </QualitiesProvider>
                </ProfessionProvider>
            </UserProvider>
            <ToastContainer />
        </>
    );
};

export default App;
