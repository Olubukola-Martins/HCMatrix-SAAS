import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import HomeForApprover from "../Pages/HomeForApprover";

import CreatePayroll from "../Pages/CreatePayroll";
import PayrollBreakdown from "../Pages/PayrollBreakdown";
import PayrollComparison from "../Pages/PayrollComparison";
import PayrollHistory from "../Pages/PayrollHistory";
import PayrollReview from "../Pages/PayrollReview";
import PayrollScheme from "../Pages/PayrollScheme";
7;

const PayrollRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/payroll/home" element={<Home />} />
        <Route path="/payroll/home-approver" element={<HomeForApprover />} />

        <Route path="/payroll-review" element={<PayrollReview />} />
        <Route path="/payroll-breakdown" element={<PayrollBreakdown />} />
        <Route path="/payroll-history" element={<PayrollHistory />} />
        <Route path="/payroll-scheme" element={<PayrollScheme />} />
        <Route path="/payroll-comparison" element={<PayrollComparison />} />
        <Route path="/create-payroll" element={<CreatePayroll />} />
      </Routes>
    </>
  );
};

export default PayrollRoutes;
