import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import SystemAdmins from "../Pages/SystemAdmins";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/system-administration-login" element={<Home />} />
      <Route path="/system-administrators" element={<SystemAdmins />} />
    </Routes>
  );
};

export default AdminRoutes;
