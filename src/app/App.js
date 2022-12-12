import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Main from "./layouts/main";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";
import Users from "./layouts/users";
import UserPage from "./components/common/page/userPage/userPage";
import EditUser from "./components/common/page/editUserPage/editUser";
import LogOut from "./layouts/logOut";
import NotFoundPage from "./layouts/notFoundPage";

import NavBar from "./components/ui/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import AuthProvider from "./hooks/useAuth";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";
import { loadUsersList } from "./store/users";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        dispatch(loadUsersList());
    }, []);

    return (
        <>
            <AuthProvider>
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
            </AuthProvider>

            <ToastContainer />
        </>
    );
};

export default App;
