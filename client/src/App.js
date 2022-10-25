import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import LibraryClient from "./library_client/LibraryClient";

import NavBar from "./components/NavBar";
import Router from "./Router";

const defaultState = {
    userId: "",
    name: "",
    username: "",
    permissions: [],
};

const App = () => {
    const [user, setUser] = useState(defaultState);

    useEffect(() => {
        LibraryClient.getCurrentUser()
            .then((user) => {
                if (user) {
                    setUser(user);
                }
            })
            .catch(console.warn);
    }, []);

    const handleLogOut = () => {
        LibraryClient.logout();
        setUser(defaultState);
    };

    return (
        <div>
            <NavBar
                logOut={handleLogOut}
                isAdmin={user.permissions.includes("books:create")}
                isLogged={user.username !== ""}
                profileName={user.name}
            />
            <Router canDelete={user.permissions.includes("books:delete")} username={user.username} />
        </div>
    );
};

export default App;
