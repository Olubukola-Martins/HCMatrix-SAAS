import React from "react";
import { Route, Routes } from "react-router-dom";
import PayrollReview from "../Pages/PayrollReview";

const PayrollRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/payroll-review" element={<PayrollReview />} />
      </Routes>
    </>
  );
};

export default PayrollRoutes;
