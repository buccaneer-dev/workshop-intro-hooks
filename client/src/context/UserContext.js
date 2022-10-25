import { createContext } from "react";

export const defaultUserData = () => {
    return {
        userId: "",
        name: "",
        username: "",
        permissions: [],
    };
};

export class UserCtx {
    _opts = {};

    constructor(user) {
        user = user || defaultUserData();
        this._opts = user;
    }

    hasPermission(permission) {
        return (this._opts?.permissions || []).includes(permission);
    }

    setUser(user) {
        this._opts = user;
    }

    isLogged() {
        return this._opts?.username && this._opts?.username !== "";
    }

    getProfileName() {
        return this._opts?.name || "unknown";
    }

    getUsername() {
        return this._opts?.username;
    }
}

export const createUserCtx = (user) => {
    return new UserCtx(user);
};

export const UserContext = createContext(new UserCtx());
