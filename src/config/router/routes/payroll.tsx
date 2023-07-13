import PayrollHome from "features/payroll/pages/PayrollHome";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import PayrollHomeForApprover from "features/payroll/pages/PayrollHomeForApprover";
import PayrollReview from "features/payroll/pages/PayrollReview";
import PayrollBreakdown from "features/payroll/pages/PayrollBreakdown";
import PayrollCycle from "features/payroll/pages/PayrollCycle";
import PayrollScheme from "features/payroll/pages/PayrollScheme";
import PayrollComparison from "features/payroll/pages/PayrollComparison";
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
import PayGradesAndCategoriesPage from "features/payroll/pages/PayGradesAndCategoriesPage";
import SetupDirectSalaryPayrollSchemePage from "features/payroll/pages/SetupDirectSalaryPayrollSchemePage";
import SetupWagesPayrollSchemePage from "features/payroll/pages/SetupWagesPayrollSchemePage";
import SetupProjectPayrollSchemePage from "features/payroll/pages/SetupProjectPayrollSchemePage";
import SetupSingleProjectPayrollSchemePage from "features/payroll/pages/SetupSingleProjectPayrollSchemePage";
import CreateOfficePayroll from "features/payroll/pages/CreateOfficePayroll";
import CreateDirectSalaryPayroll from "features/payroll/pages/CreateDirectSalaryPayroll";
import CreateWagePayroll from "features/payroll/pages/CreateWagePayroll";
import CreateProjectPayroll from "features/payroll/pages/CreateProjectPayroll";
import SetupDailyWagesPayrollSchemePage from "features/payroll/pages/SetupDailyWagesPayrollSchemePage";
import SetupMonthlyWagesPayrollSchemePage from "features/payroll/pages/SetupMonthlyWagesPayrollSchemePage";
import ListOfPayrollsPage from "features/payroll/pages/ListOfPayrollsPage";

export const payrollRoutes: TRouteData[] = [
  {
    element: <PayrollCostCentresPage />,
    path: appRoutes.payrollCostCentres,
    isSearchable: true,
    title: "Cost Centres",
    isPrimaryFeature: true,
  },
  {
    // This is made false cos this feature will not be used in mvp, so the tax will simply be set in the corresponding payroll schemes
    element: <PayrollTaxPoliciesPage />,
    path: appRoutes.payrollTaxPolicies,
    isSearchable: false,
    title: "Tax Policies",
    isPrimaryFeature: false,
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
    element: <SetupDirectSalaryPayrollSchemePage />,
    path: appRoutes.setupDirectSalaryPayrollScheme,
    isSearchable: true,
    title: "Direct Salary Payroll Scheme",
    isPrimaryFeature: false,
  },
  {
    element: <SetupProjectPayrollSchemePage />,
    path: appRoutes.setupProjectPayrollScheme,
    isSearchable: true,
    title: "Project Payroll Scheme",
    isPrimaryFeature: false,
  },
  {
    element: <SetupSingleProjectPayrollSchemePage />,
    path: appRoutes.setupSingleProjectPayrollScheme().format,
    isSearchable: false,
    title: "Single Project Payroll Scheme",
    isPrimaryFeature: false,
  },
  {
    element: <SetupWagesPayrollSchemePage />,
    path: appRoutes.setupWagesPayrollScheme,
    isSearchable: true,
    title: "Wages Payroll Scheme",
    isPrimaryFeature: false,
  },
  {
    element: <SetupDailyWagesPayrollSchemePage />,
    path: appRoutes.setupDailyWagesPayrollScheme,
    isSearchable: true,
    title: "Daily Wages Payroll Scheme",
    isPrimaryFeature: false,
  },
  {
    element: <SetupMonthlyWagesPayrollSchemePage />,
    path: appRoutes.setupMonthlyWagesPayrollScheme,
    isSearchable: true,
    title: "Monthly Wages Payroll Scheme",
    isPrimaryFeature: false,
  },
  {
    element: <ListOfPayrollsPage />,
    path: appRoutes.listOfPayrolls,
    isSearchable: true,
    title: "Monthly Wages Payroll Scheme",
    isPrimaryFeature: false,
  },
  {
    element: <PayrollSettings />,
    path: appRoutes.payrollSettings,
    isSearchable: true,
    title: "Payroll Settings",
    isPrimaryFeature: false,
  },
  // {
  //   element: <PayGrades />,
  //   path: appRoutes.payGradeSettings,
  //   title: "Payroll Grade Setting",
  //   isSearchable: true,
  //   isPrimaryFeature: true,
  // },
  {
    element: <PayGradesAndCategoriesPage />,
    path: appRoutes.payGradeAndCategorySettings,
    title: "Grade & Categories",
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
    element: <CreateOfficePayroll />,
    path: appRoutes.createOfficePayroll,
    isSearchable: true,
    title: "Create Office Payroll",
  },
  {
    element: <CreateDirectSalaryPayroll />,
    path: appRoutes.createDirectSalaryPayroll,
    isSearchable: true,
    title: "Create Direct Salary Payroll",
  },
  {
    element: <CreateWagePayroll />,
    path: appRoutes.createWagesPayroll,
    isSearchable: true,
    title: "Create Wages Payroll",
  },
  {
    element: <CreateProjectPayroll />,
    path: appRoutes.createProjectPayroll,
    isSearchable: true,
    title: "Create Project Payroll",
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
