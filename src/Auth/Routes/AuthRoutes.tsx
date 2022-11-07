import React from "react";
import { Route, Routes } from "react-router-dom";
import { EmployeeRegister } from "../Pages/EmployeeRegister";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/employee-registration" element={<EmployeeRegister />} />
    </Routes>
  );
};

export default AuthRoutes;
