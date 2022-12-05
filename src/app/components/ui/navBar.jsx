import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
    const { currentUser } = useAuth();
    return (
        <>
            <nav className="navbar bg-light shadow mb-4">
                <div className="container-fluid">
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to="/"
                            >
                                Main
                            </NavLink>
                        </li>
                        {currentUser && (
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/users"
                                >
                                    Users
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex">
                        {currentUser ? (
                            <NavProfile />
                        ) : (
                            <ul className="nav">
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link "
                                        aria-current="page"
                                        to="/login"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
};

export default NavBar;
