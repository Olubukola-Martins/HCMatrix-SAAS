import React from "react";
import { Route, Routes } from "react-router-dom";
import PayrollBreakdown from "../Pages/PayrollBreakdown";
import PayrollComparison from "../Pages/PayrollComparison";
import PayrollReview from "../Pages/PayrollReview";

const PayrollRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/payroll-review" element={<PayrollReview />} />
        <Route path="/payroll-breakdown" element={<PayrollBreakdown />} />
        <Route path="/payroll-comparison" element={<PayrollComparison />} />
      </Routes>
    </>
  );
};

export default PayrollRoutes;
