import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
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
                        {isLoggedIn && (
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
                        {isLoggedIn ? (
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
