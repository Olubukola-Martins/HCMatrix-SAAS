import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const payrollRoutes: TRouteData[] = [
  {
    element: <div />,
    path: appRoutes.payrollSettings,
    isSearchable: true,
    title: "Payroll Settings",
  },
  {
    element: <div />,
    path: appRoutes.payGradeSettings,
    title: "Payroll Grade Setting",
    isSearchable: true,
  },
  {
    element: <div />,
    path: appRoutes.payrollPolicySettings,
    isSearchable: true,
    title: "Payroll Policy",
  },
  {
    element: <div />,
    path: appRoutes.payrollHome,
    isSearchable: true,
    title: "Payroll",
  },
  {
    element: <div />,
    path: appRoutes.payrollHome4Approver,
    isSearchable: true,
    title: "Payroll Approval",
  },
  {
    element: <div />,
    path: appRoutes.payrollReview,
    isSearchable: true,
    title: "Payroll Review",
  },
  {
    element: <div />,
    path: appRoutes.payrollBreakdown,
    isSearchable: true,
    title: "Payroll Breakdown",
  },
  {
    element: <div />,
    path: appRoutes.payrollCycle,
    isSearchable: true,
    title: "Payroll Cycle",
  },
  {
    element: <div />,
    path: appRoutes.payrollScheme,
    isSearchable: true,
    title: "Payroll Scheme",
  },
  {
    element: <div />,
    path: appRoutes.payrollComparison,
    isSearchable: true,
    title: "Payroll Comparison",
  },
  {
    element: <div />,
    path: appRoutes.createPayroll,
    isSearchable: true,
    title: "Create Payroll",
  },
  {
    element: <div />,
    path: appRoutes.payrollReport,
    isSearchable: true,
    title: "Payroll Report",
  },
  {
    element: <div />,
    path: appRoutes.payslips,
    isSearchable: true,
    title: "Payslips",
  },
  {
    element: <div />,
    path: appRoutes.employeePayslips,
    isSearchable: true,
    title: "Employee Payslips",
  },
  {
    element: <div />,
    path: appRoutes.createPayslipTemplate,
    isSearchable: true,
    title: "Payslips Template",
  },
];
