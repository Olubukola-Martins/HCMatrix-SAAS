import React from "react";
import { Route, Routes } from "react-router-dom";
import { EmployeeRegister } from "../Pages/EmployeeRegister";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { VerifyAdminEmail } from "../Pages/VerifyAdminEmail";
import { VerifyEmployeeEmail } from "../Pages/VerifyEmployeeEmail";
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/employee-registration" element={<EmployeeRegister />} />
      <Route path="/verify" element={<VerifyAdminEmail />} />
      <Route path="/verify-employee" element={<VerifyEmployeeEmail />} />
    </Routes>
  );
};

export default AuthRoutes;
