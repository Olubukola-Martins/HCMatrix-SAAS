import PayrollHome from "features/payroll/pages/PayrollHome";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import PayrollHomeForApprover from "features/payroll/pages/PayrollHomeForApprover";
import PayrollReview from "features/payroll/pages/PayrollReview";
import PayrollBreakdown from "features/payroll/pages/PayrollBreakdown";
import PayrollCycle from "features/payroll/pages/PayrollCycle";
import PayrollScheme from "features/payroll/pages/PayrollScheme";
import PayrollComparison from "features/payroll/pages/PayrollComparison";
import CreatePayroll from "features/payroll/pages/CreatePayroll";
import PayrollReport from "features/payroll/pages/PayrollReport";
import { PayrollPayslip } from "features/payroll/pages/PayrollPayslip";
import EmployeePayslips from "features/payroll/pages/EmployeePayslips";
import CreatePayslipTemplate from "features/payroll/pages/CreatePayslipTemplate";
import PayrollSettings from "features/payroll/pages/PayrollSettings";
import PayGrades from "features/payroll/pages/PayGrades";
import PayrollCostCentresPage from "features/payroll/pages/PayrollCostCentresPage";
import PayrollTaxPoliciesPage from "features/payroll/pages/PayrollTaxPoliciesPage";
import CreateTaxPolicyPage from "features/payroll/pages/CreateTaxPolicyPage";
import ExchangeRatesPage from "features/payroll/pages/ExchangeRatesPage";
import PayrollSchemesPage from "features/payroll/pages/PayrollSchemesPage";
import SetupGradePayrollSchemePage from "features/payroll/pages/SetupGradePayrollSchemePage";

export const payrollRoutes: TRouteData[] = [
  {
    element: <PayrollCostCentresPage />,
    path: appRoutes.payrollCostCentres,
    isSearchable: true,
    title: "Cost Centres",
    isPrimaryFeature: true,
  },
  {
    element: <PayrollTaxPoliciesPage />,
    path: appRoutes.payrollTaxPolicies,
    isSearchable: true,
    title: "Tax Policies",
    isPrimaryFeature: true,
  },
  {
    element: <CreateTaxPolicyPage />,
    path: appRoutes.createTaxPolicy,
    isSearchable: true,
    title: "Create Tax Policy",
    isPrimaryFeature: false,
  },
  {
    element: <ExchangeRatesPage />,
    path: appRoutes.payrollExchangeRates,
    isSearchable: true,
    title: "Exchange Rates",
    isPrimaryFeature: true,
  },

  {
    element: <PayrollSchemesPage />,
    path: appRoutes.payrollSchemes,
    isSearchable: true,
    title: "Payroll Schemes",
    isPrimaryFeature: true,
  },
  {
    element: <SetupGradePayrollSchemePage />,
    path: appRoutes.setupGradePayrollScheme,
    isSearchable: true,
    title: "Office Payroll Scheme",
    isPrimaryFeature: false,
  },
  {
    element: <PayrollSettings />,
    path: appRoutes.payrollSettings,
    isSearchable: true,
    title: "Payroll Settings",
    isPrimaryFeature: true,
  },
  {
    element: <PayGrades />,
    path: appRoutes.payGradeSettings,
    title: "Payroll Grade Setting",
    isSearchable: true,
    isPrimaryFeature: true,
  },
  {
    element: <div />,
    path: appRoutes.payrollSettings,
    isSearchable: true,
    title: "Payroll Policy",
  },
  {
    element: <PayrollHome />,
    path: appRoutes.payrollHome,
    isSearchable: true,
    title: "Payroll",
  },
  {
    element: <PayrollHomeForApprover />,
    path: appRoutes.payrollHome4Approver,
    isSearchable: true,
    title: "Payroll Approval",
  },
  {
    element: <PayrollReview />,
    path: appRoutes.payrollReview,
    isSearchable: true,
    title: "Payroll Review",
  },
  {
    element: <PayrollBreakdown />,
    path: appRoutes.payrollBreakdown,
    isSearchable: true,
    title: "Payroll Breakdown",
  },
  {
    element: <PayrollCycle />,
    path: appRoutes.payrollCycle,
    isSearchable: true,
    title: "Payroll Cycle",
  },
  {
    element: <PayrollScheme />,
    path: appRoutes.payrollScheme,
    isSearchable: true,
    title: "Payroll Scheme",
  },
  {
    element: <PayrollComparison />,
    path: appRoutes.payrollComparison,
    isSearchable: true,
    title: "Payroll Comparison",
  },
  {
    element: <CreatePayroll />,
    path: appRoutes.createPayroll,
    isSearchable: true,
    title: "Create Payroll",
  },
  {
    element: <PayrollReport />,
    path: appRoutes.payrollReport,
    isSearchable: true,
    title: "Payroll Report",
  },
  {
    element: <PayrollPayslip />,
    path: appRoutes.payslips,
    isSearchable: true,
    title: "Payslips",
  },
  {
    element: <EmployeePayslips />,
    path: appRoutes.employeePayslips,
    isSearchable: true,
    title: "Employee Payslips",
    isPrimaryFeature: true,
  },
  {
    element: <CreatePayslipTemplate />,
    path: appRoutes.createPayslipTemplate,
    isSearchable: true,
    title: "Payslips Template",
    isPrimaryFeature: true,
  },
];
