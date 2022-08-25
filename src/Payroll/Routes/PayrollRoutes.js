import React from "react";
import { Route, Routes } from "react-router-dom";
import Review from "../Pages/Review";

const PayrollRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/payroll-review" element={<Review />} />
      </Routes>
    </>
  );
};

export default PayrollRoutes;
