import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";

const PayrollRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/payroll/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default PayrollRoutes;
