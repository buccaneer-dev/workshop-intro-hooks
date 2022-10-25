import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const NavBar = (props) => {
    const userCtx = useContext(UserContext);

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
                DeveLibrary
            </Link>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        Home
                    </Link>
                </li>

                {userCtx.hasPermission("books:create") && (
                    <li className="nav-item">
                        <Link to={"/admin"} className="nav-link">
                            Add Book
                        </Link>
                    </li>
                )}

                {userCtx.isLogged() && (
                    <li className="nav-item">
                        <Link to={"/books"} className="nav-link">
                            Bookshelf
                        </Link>
                    </li>
                )}
            </div>

            {userCtx.isLogged() ? (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            {userCtx.getProfileName()}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/login" className="nav-link" onClick={props.logOut}>
                            Logout
                        </a>
                    </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link">
                            Login
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/register"} className="nav-link">
                            Sign Up
                        </Link>
                    </li>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
