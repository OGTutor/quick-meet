import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`}
                    height="40"
                    className="img-responsive shadow rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <NavLink
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Profile
                </NavLink>
                <NavLink to="/logout" className="dropdown-item">
                    Log out
                </NavLink>
            </div>
        </div>
    );
};

export default NavProfile;
