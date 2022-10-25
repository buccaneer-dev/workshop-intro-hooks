import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
    // use the hook useContext initialized with UserContext

    // replace props.isAdmin, props.isLogged, props.profileName
    // with methots provided by the context
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

                {props.isAdmin && (
                    <li className="nav-item">
                        <Link to={"/admin"} className="nav-link">
                            Add Book
                        </Link>
                    </li>
                )}

                {props.isLogged && (
                    <li className="nav-item">
                        <Link to={"/books"} className="nav-link">
                            Bookshelf
                        </Link>
                    </li>
                )}
            </div>

            {props.isLogged ? (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            {props.profileName}
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
