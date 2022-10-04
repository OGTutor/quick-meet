import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav className="nav">
                <NavLink className="nav-link" to="/">
                    Main
                </NavLink>

                <NavLink className="nav-link" to="/login">
                    Login
                </NavLink>

                <NavLink className="nav-link" to="/users">
                    Users
                </NavLink>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;
