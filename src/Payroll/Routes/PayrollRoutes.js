import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import HomeForApprover from "../Pages/HomeForApprover";

import CreatePayroll from "../Pages/CreatePayroll";
import PayrollBreakdown from "../Pages/PayrollBreakdown";
import PayrollComparison from "../Pages/PayrollComparison";
import PayrollReview from "../Pages/PayrollReview";
import PayrollScheme from "../Pages/PayrollScheme";
import PayrollReport from "../Pages/PayrollReport";
import PayrollCycle from "../Pages/PayrollCycle";
import Payslip from "../Pages/Payslip";

const PayrollRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/payroll/home" element={<Home />} />
        <Route path="/payroll/home-approver" element={<HomeForApprover />} />
        <Route path="/payroll/review" element={<PayrollReview />} />
        <Route path="/payroll/breakdown" element={<PayrollBreakdown />} />
        <Route path="/payroll/cycle" element={<PayrollCycle />} />
        <Route path="/payroll/scheme" element={<PayrollScheme />} />
        <Route path="/payroll/comparison" element={<PayrollComparison />} />
        <Route path="/payroll/create" element={<CreatePayroll />} />
        <Route path="/payroll/report" element={<PayrollReport />} />
        <Route path="/payroll/payslip" element={<Payslip />} />
      </Routes>
    </>
  );
};

export default PayrollRoutes;
