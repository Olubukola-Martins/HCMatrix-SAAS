import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import HomeForApprover from "../Pages/HomeForApprover";

const PayrollRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/payroll/home" element={<Home />} />
        <Route path="/payroll/home-approver" element={<HomeForApprover />} />
      </Routes>
    </>
  );
};

export default PayrollRoutes;
