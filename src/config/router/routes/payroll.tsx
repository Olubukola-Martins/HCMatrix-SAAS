import PayrollHome from "features/payroll/pages/PayrollHome";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import PayrollReview from "features/payroll/pages/PayrollReview";
import PayrollComparison from "features/payroll/pages/PayrollComparison";
import PayrollReport from "features/payroll/pages/PayrollReport";
import { PayrollPayslip } from "features/payroll/pages/PayrollPayslip";
import EmployeePayslips from "features/payroll/pages/EmployeePayslips";
import CreatePayslipTemplate from "features/payroll/pages/CreatePayslipTemplate";
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
import CreatePayroll from "features/payroll/pages/CreatePayroll";
import SetupDailyWagesPayrollSchemePage from "features/payroll/pages/SetupDailyWagesPayrollSchemePage";
import SetupMonthlyWagesPayrollSchemePage from "features/payroll/pages/SetupMonthlyWagesPayrollSchemePage";
import ListOfPayrollsPage from "features/payroll/pages/ListOfPayrollsPage";
import TaxAuthPage from "features/payroll/pages/TaxAuthPage";
import PensionAdminsPage from "features/payroll/pages/PensionAdminsPage";
import EditPayslipTemplate from "features/payroll/pages/EditPayslipTemplate";
import SinglePayroll from "features/payroll/pages/SinglePayroll";
import ITFAuthPage from "features/payroll/pages/ITFAuthPage";
import NSITFAuthPage from "features/payroll/pages/NSITFAuthPage";
import CreatePayrollReportTemplate from "features/payroll/pages/CreatePayrollReportTemplate";
import EditPayrollReportTemplate from "features/payroll/pages/EditPayrollReportTemplate";
import ViewPayrollReportTemplate from "features/payroll/pages/ViewPayrollReportTemplate";
import ViewPayslipTemplate from "features/payroll/pages/ViewPayslipTemplate";
import SingleCostCentrePage from "features/payroll/pages/SingleCostCentrePage";
import PayslipsTransactionsPage from "features/payroll/pages/PayslipsTransactionsPage";
import PayrollSetting from "features/payroll/pages/PayrollSetting";

export const payrollRoutes: TRouteData[] = [
  {
    element: <SingleCostCentrePage />,
    path: appRoutes.singleCostCentre().format,
    isSearchable: false,

    isPrimaryFeature: false,
  },
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
    path: appRoutes.setupSingleProjectPayrollSchemeWithoutExistingScheme()
      .format,
    isSearchable: false,
    title: "Single Project Payroll Scheme",
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
    isSearchable: false,
    title: "Daily Wages Payroll Scheme",
    isPrimaryFeature: false,
  },
  {
    element: <SetupDailyWagesPayrollSchemePage />,
    path: appRoutes.setupWagesPayrollSchemeById({ frequency: "daily" }).format,
    isSearchable: false,
    title: "Daily Wages Payroll Scheme(done-setup)",
    isPrimaryFeature: false,
  },
  {
    element: <SetupMonthlyWagesPayrollSchemePage />,
    path: appRoutes.setupMonthlyWagesPayrollScheme,
    isSearchable: false,
    title: "Monthly Wages Payroll Scheme",
    isPrimaryFeature: false,
  },
  {
    element: <SetupMonthlyWagesPayrollSchemePage />,
    path: appRoutes.setupWagesPayrollSchemeById({ frequency: "monthly" })
      .format,
    isSearchable: false,
    title: "Monthly Wages Payroll Scheme(done-setup)",
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
    element: <PayrollSetting />,
    path: appRoutes.payrollSettings,
    isSearchable: true,
    title: "Payroll Settings",
    isPrimaryFeature: false,
  },

  {
    element: <PayGradesAndCategoriesPage />,
    path: appRoutes.payGradeAndCategorySettings,
    title: "Grade & Categories",
    isSearchable: true,
    isPrimaryFeature: true,
  },
  {
    element: <TaxAuthPage />,
    path: appRoutes.taxAuthorities,
    title: "Tax Authorities",
    isSearchable: true,
    isPrimaryFeature: true,
  },
  {
    element: <ITFAuthPage />,
    path: appRoutes.itfAuthorities,
    title: "ITF Authorities",
    isSearchable: true,
    isPrimaryFeature: true,
  },
  {
    element: <NSITFAuthPage />,
    path: appRoutes.nsitfAuthorities,
    title: "NSITF Authorities",
    isSearchable: true,
    isPrimaryFeature: true,
  },
  {
    element: <PensionAdminsPage />,
    path: appRoutes.pensionAdministrators,
    title: "Pension Administrators",
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
    element: <PayrollReview />,
    path: appRoutes.payrollReview,
    isSearchable: true,
    title: "Payroll Review",
  },

  {
    element: <PayrollComparison />,
    path: appRoutes.payrollComparison,
    isSearchable: true,
    title: "Payroll Comparison",
  },
  {
    element: <CreatePayroll scheme={"office"} />,

    path: appRoutes.createOfficePayroll,
    isSearchable: true,
    title: "Create Office Payroll",
  },
  {
    element: <CreatePayroll scheme={"direct-salary"} />,

    path: appRoutes.createDirectSalaryPayroll,
    isSearchable: true,
    title: "Create Direct Salary Payroll",
  },
  {
    element: <CreatePayroll scheme={"wages"} />,

    path: appRoutes.createWagesPayroll,
    isSearchable: true,
    title: "Create Wages Payroll",
  },
  {
    element: <CreatePayroll scheme={"project"} />,
    path: appRoutes.createProjectPayroll,
    isSearchable: true,
    title: "Create Project Payroll",
  },
  {
    element: <SinglePayroll />,
    path: appRoutes.singlePayroll().format,
    isSearchable: false,
  },
  {
    element: <PayrollReport />,
    path: appRoutes.payrollReport,
    isSearchable: true,
    title: "Payroll Report",
  },
  {
    element: <CreatePayrollReportTemplate />,
    path: appRoutes.createPayrollReportTemplate,
    isSearchable: true,
    title: "Create Payroll Report Template",
  },
  {
    element: <EditPayrollReportTemplate />,
    path: appRoutes.editPayrollReportTemplate().format,
    isSearchable: false,
    title: "Edit Payroll Report Template",
  },
  {
    element: <ViewPayrollReportTemplate />,
    path: appRoutes.viewPayrollReportTemplate().format,
    isSearchable: false,
    title: "Payroll Report Template",
  },
  {
    element: <PayrollPayslip />,
    path: appRoutes.payslips,
    isSearchable: true,
    title: "Payslips",
    isPrimaryFeature: true,
  },
  {
    element: <EmployeePayslips />,
    path: appRoutes.employeePayslips,
    isSearchable: true,
    title: "Employee Payslips",
  },
  {
    element: <PayslipsTransactionsPage />,
    path: appRoutes.payslipTransactions,
    isSearchable: true,
    title: "Payslip & Transactions",
  },
  {
    element: <CreatePayslipTemplate />,
    path: appRoutes.createPayslipTemplate,
    isSearchable: true,
    title: "Create Payslip Template",
  },
  {
    element: <EditPayslipTemplate />,
    path: appRoutes.editPayslipTemplate().format,
    isSearchable: false,
    title: "Edit Payslip Template",
  },
  {
    element: <ViewPayslipTemplate />,
    path: appRoutes.viewPayslipTemplate().format,
    isSearchable: false,
    title: "Payslip Template",
  },
];
