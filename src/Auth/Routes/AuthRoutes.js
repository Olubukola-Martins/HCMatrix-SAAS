import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../Home/Pages/Home";
import CompanyOrganogram from "../../Home/Pages/CompanyOrganogram";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ResetPassword from "../Pages/ResetPassword";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/company-organogram" element={<CompanyOrganogram />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AuthRoutes;
