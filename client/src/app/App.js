import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Main from "./layouts/main";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";
import Users from "./layouts/users";
import UserPage from "./components/page/userPage/userPage";
import EditUser from "./components/page/editUserPage/editUser";
import LogOut from "./layouts/logOut";
import NotFoundPage from "./layouts/notFoundPage";

import NavBar from "./components/ui/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import AuthLoader from "./components/ui/hoc/authLoader";

const App = () => {
    return (
        <>
            <AuthLoader>
                <Routes>
                    <Route path="/" element={<NavBar />}>
                        <Route index element={<Main />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route
                            path="users"
                            element={
                                <ProtectedRoute>
                                    <Users />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="users/:id"
                            element={
                                <ProtectedRoute>
                                    <UserPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="users/:id/edit"
                            element={
                                <ProtectedRoute>
                                    <EditUser />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/logout" element={<LogOut />} />
                        <Route path="404" element={<NotFoundPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </AuthLoader>

            <ToastContainer />
        </>
    );
};

export default App;
