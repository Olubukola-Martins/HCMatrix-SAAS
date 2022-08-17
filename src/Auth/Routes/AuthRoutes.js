import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../Home/Pages/Home";
import Disciplinary from "../Pages/Disciplinary";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ResetPassword from "../Pages/ResetPassword";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/disciplinary" element={<Disciplinary />} />
    </Routes>
  );
};

export default AuthRoutes;
