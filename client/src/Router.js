import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Boardshelf from "./components/Bookshelf";
import Admin from "./components/Admin";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books" element={<Boardshelf />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    );
};

export default Router;
