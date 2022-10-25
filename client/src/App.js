import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import LibraryClient from "./library_client/LibraryClient";

import { UserCtx, UserContext, createUserCtx } from "./context/UserContext";

import NavBar from "./components/NavBar";
import Router from "./Router";

const App = () => {
    const [userCtx, setUserCtx] = useState(new UserCtx());

    useEffect(() => {
        LibraryClient.getCurrentUser()
            .then((user) => {
                if (user) {
                    setUserCtx(createUserCtx(user));
                }
            })
            .catch(console.warn);
    }, []);

    const handleLogOut = () => {
        LibraryClient.logout();
        setUserCtx(new UserCtx());
    };

    return (
        <UserContext.Provider value={userCtx}>
            <div>
                <NavBar logOut={handleLogOut} />
                <Router />
            </div>
        </UserContext.Provider>
    );
};

export default App;
