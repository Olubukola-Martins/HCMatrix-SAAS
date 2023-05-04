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
import { appRoutes } from "AppRoutes";

const PayrollRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path={appRoutes.payrollHome}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.payrollHome4Approver}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <HomeForApprover />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.payrollReview}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <PayrollReview />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.payrollBreakdown}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <PayrollBreakdown />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.payrollCycle}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <PayrollCycle />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.payrollScheme}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <PayrollScheme />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.payrollComparison}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <PayrollComparison />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.createPayroll}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <CreatePayroll />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.payrollReport}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <PayrollReport />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.payslips}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <Payslip />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.employeePayslips}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <EmployeePayslips />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.createPayslipTemplate}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <CreatePayslipTemplate />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default PayrollRoutes;
