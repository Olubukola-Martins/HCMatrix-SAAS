import React from "react";
import { Route, Routes } from "react-router-dom";
import PayrollBreakdown from "../Pages/PayrollBreakdown";
import PayrollReview from "../Pages/PayrollReview";

const PayrollRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/payroll-review" element={<PayrollReview />} />
        <Route path="/payroll-breakdown" element={<PayrollBreakdown />} />
      </Routes>
    </>
  );
};

export default PayrollRoutes;
