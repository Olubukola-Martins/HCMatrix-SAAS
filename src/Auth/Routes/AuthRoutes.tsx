import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../Home/Pages/Home";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AuthRoutes;
