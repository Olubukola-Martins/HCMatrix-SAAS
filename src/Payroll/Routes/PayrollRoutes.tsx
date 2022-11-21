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
import EmployeePayslips from "../Pages/EmployeePayslips";
import CreatePayslipTemplate from "../Pages/CreatePayslipTemplate";
import { RequireAuth } from "react-auth-kit";

const PayrollRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/payroll/home"
          element={
            <RequireAuth loginPath={"/login"}>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/payroll/home-approver"
          element={
            <RequireAuth loginPath={"/login"}>
              <HomeForApprover />
            </RequireAuth>
          }
        />
        <Route
          path="/payroll/review"
          element={
            <RequireAuth loginPath={"/login"}>
              <PayrollReview />
            </RequireAuth>
          }
        />
        <Route
          path="/payroll/breakdown"
          element={
            <RequireAuth loginPath={"/login"}>
              <PayrollBreakdown />
            </RequireAuth>
          }
        />
        <Route
          path="/payroll/cycle"
          element={
            <RequireAuth loginPath={"/login"}>
              <PayrollCycle />
            </RequireAuth>
          }
        />
        <Route
          path="/payroll/scheme"
          element={
            <RequireAuth loginPath={"/login"}>
              <PayrollScheme />
            </RequireAuth>
          }
        />
        <Route
          path="/payroll/comparison"
          element={
            <RequireAuth loginPath={"/login"}>
              <PayrollComparison />
            </RequireAuth>
          }
        />
        <Route
          path="/payroll/create"
          element={
            <RequireAuth loginPath={"/login"}>
              <CreatePayroll />
            </RequireAuth>
          }
        />
        <Route
          path="/payroll/report"
          element={
            <RequireAuth loginPath={"/login"}>
              <PayrollReport />
            </RequireAuth>
          }
        />
        <Route
          path="/payroll/payslip"
          element={
            <RequireAuth loginPath={"/login"}>
              <Payslip />
            </RequireAuth>
          }
        />
        <Route
          path="/payroll/employee-payslip"
          element={
            <RequireAuth loginPath={"/login"}>
              <EmployeePayslips />
            </RequireAuth>
          }
        />
        <Route
          path="/payroll/create-payslip-template"
          element={
            <RequireAuth loginPath={"/login"}>
              <CreatePayslipTemplate />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default PayrollRoutes;
