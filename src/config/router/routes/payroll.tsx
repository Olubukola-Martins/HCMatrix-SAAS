import PayrollHome from "features/payroll/pages/PayrollHome";
import { appRoutes } from "../paths";
import { TAppPageDataFnProps, TRouteData } from "../types";
import PayrollReview from "features/payroll/pages/PayrollReview";
import PayrollComparison from "features/payroll/pages/PayrollComparison";
import PayrollReport from "features/payroll/pages/PayrollReport";
import { PayrollPayslip } from "features/payroll/pages/PayrollPayslip";
import EmployeePayslips from "features/payroll/pages/EmployeePayslips";
import CreatePayslipTemplate from "features/payroll/pages/CreatePayslipTemplate";
import PayrollCostCentresPage from "features/payroll/pages/PayrollCostCentresPage";
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
import PayrollSetting from "features/payroll/pages/PayrollSetting";
import { canUserAccessComponent } from "components/permission-restriction/PermissionRestrictor";
import PayrollWalletPage from "features/payroll/pages/PayrollWalletPage";

// TODO: Perm Restrict payroll pages [Done], then move to home dashboard, then handbook, then company organogram, then back to self service restrictions as per components, then payroll bug fixes n removal of leave comp, and then tax finale

// NOTE: The subscription pattern will !doesSubscriptionContains({companySubscriptionRespources, requiredResources: ["payroll"]}) && !canUserAccessComponent({userPermissions, requiredPermissions: ["manage-payroll"]})
export const payrollRoutes = (props: TAppPageDataFnProps): TRouteData[] => {
  const { userPermissions, activeSubscription } = props;
  return [
    {
      element: <SingleCostCentrePage />,
      path: appRoutes.singleCostCentre().format,
      isSearchable: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-cost-centres"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
      isPrimaryFeature: false,
    },
    {
      element: <PayrollWalletPage />,
      path: appRoutes.payrollWallet,
      isSearchable: true,
      title: "Wallet",
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-cost-centres"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <PayrollCostCentresPage />,
      path: appRoutes.payrollCostCentres,
      isSearchable: true,
      title: "Cost Centres",
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-cost-centres"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },

    {
      element: <ExchangeRatesPage />,
      path: appRoutes.payrollExchangeRates,
      isSearchable: true,
      title: "Exchange Rates",
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-exchange-rates"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },

    {
      element: <PayrollSchemesPage />,
      path: appRoutes.payrollSchemes,
      isSearchable: true,
      title: "Payroll Schemes",
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-schemes"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <SetupGradePayrollSchemePage />,
      path: appRoutes.setupGradePayrollScheme,
      isSearchable: true,
      title: "Step Pay Payroll Scheme",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-schemes"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <SetupDirectSalaryPayrollSchemePage />,
      path: appRoutes.setupDirectSalaryPayrollScheme,
      isSearchable: true,
      title: "Direct Salary Payroll Scheme",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-schemes"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <SetupProjectPayrollSchemePage />,
      path: appRoutes.setupProjectPayrollScheme,
      isSearchable: true,
      title: "Project Payroll Scheme",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-schemes"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <SetupSingleProjectPayrollSchemePage />,
      path: appRoutes.setupSingleProjectPayrollSchemeWithoutExistingScheme()
        .format,
      isSearchable: false,
      title: "Single Project Payroll Scheme",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-schemes"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <SetupSingleProjectPayrollSchemePage />,
      path: appRoutes.setupSingleProjectPayrollScheme().format,
      isSearchable: false,
      title: "Single Project Payroll Scheme",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-schemes"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <SetupWagesPayrollSchemePage />,
      path: appRoutes.setupWagesPayrollScheme,
      isSearchable: true,
      title: "Wages Payroll Scheme",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-schemes"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <SetupDailyWagesPayrollSchemePage />,
      path: appRoutes.setupDailyWagesPayrollScheme,
      isSearchable: false,
      title: "Daily Wages Payroll Scheme",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-schemes"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <SetupDailyWagesPayrollSchemePage />,
      path: appRoutes.setupWagesPayrollSchemeById({ frequency: "daily" })
        .format,
      isSearchable: false,
      title: "Daily Wages Payroll Scheme(done-setup)",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-schemes"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <SetupMonthlyWagesPayrollSchemePage />,
      path: appRoutes.setupMonthlyWagesPayrollScheme,
      isSearchable: false,
      title: "Monthly Wages Payroll Scheme",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-schemes"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <SetupMonthlyWagesPayrollSchemePage />,
      path: appRoutes.setupWagesPayrollSchemeById({ frequency: "monthly" })
        .format,
      isSearchable: false,
      title: "Monthly Wages Payroll Scheme(done-setup)",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-schemes"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <ListOfPayrollsPage />,
      path: appRoutes.listOfPayrolls,
      isSearchable: true,
      title: "Monthly Wages Payroll Scheme",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-payrolls"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <PayrollSetting />,
      path: appRoutes.payrollSettings,
      isSearchable: true,
      title: "Payroll Settings",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },

    {
      element: <PayGradesAndCategoriesPage />,
      path: appRoutes.payGradeAndCategorySettings,
      title: "Grade & Categories",
      isSearchable: true,
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-pay-grades-and-categories"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <TaxAuthPage />,
      path: appRoutes.taxAuthorities,
      title: "Tax Authorities",
      isSearchable: true,
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-tax-authorities"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <ITFAuthPage />,
      path: appRoutes.itfAuthorities,
      title: "ITF Authorities",
      isSearchable: true,
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-itf-authorities"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <NSITFAuthPage />,
      path: appRoutes.nsitfAuthorities,
      title: "NSITF Authorities",
      isSearchable: true,
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-nsitf-authorities"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <PensionAdminsPage />,
      path: appRoutes.pensionAdministrators,
      title: "Pension Administrators",
      isSearchable: true,
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-pension-authorities"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },

    {
      element: <PayrollHome />,
      path: appRoutes.payrollHome,
      isSearchable: true,
      title: "Payroll",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-payroll-dashboard"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },

    {
      element: <PayrollReview />,
      path: appRoutes.payrollReview,
      isSearchable: true,
      title: "Payroll Review",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-payroll-dashboard"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },

    {
      element: <PayrollComparison />,
      path: appRoutes.payrollComparison,
      isSearchable: true,
      title: "Payroll Comparison",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["compare-payrolls"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: (
        <CreatePayroll scheme={"office"} title="Create Step Pay Payroll" />
      ),

      path: appRoutes.createOfficePayroll,
      isSearchable: true,
      title: "Create Step Pay Payroll",
      hidden: !canUserAccessComponent({
        userPermissions,
        activeSubscription,
        requiredPermissions: ["create-payroll"],
        requiredSubscriptionState: {
          label: "payroll",
          resources: [
            "wages-payroll",
            "office-payroll",
            "direct-salary-payroll",
            "project-payroll",
          ],
        },
      }),
    },
    {
      element: <CreatePayroll scheme={"direct-salary"} />,

      path: appRoutes.createDirectSalaryPayroll,
      isSearchable: true,
      title: "Create Direct Salary Payroll",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["create-payroll"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <CreatePayroll scheme={"wages"} />,

      path: appRoutes.createWagesPayroll,
      isSearchable: true,
      title: "Create Wages Payroll",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["create-payroll"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <CreatePayroll scheme={"project"} />,
      path: appRoutes.createProjectPayroll,
      isSearchable: true,
      title: "Create Project Payroll",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["create-payroll"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <SinglePayroll />,
      path: appRoutes.singlePayroll().format,
      isSearchable: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-payrolls"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <PayrollReport />,
      path: appRoutes.payrollReport,
      isSearchable: true,
      title: "Payroll Report",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-payroll-reports"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <CreatePayrollReportTemplate />,
      path: appRoutes.createPayrollReportTemplate,
      isSearchable: true,
      title: "Create Payroll Report Template",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-report-templates"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <EditPayrollReportTemplate />,
      path: appRoutes.editPayrollReportTemplate().format,
      isSearchable: false,
      title: "Edit Payroll Report Template",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payroll-report-templates"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <ViewPayrollReportTemplate />,
      path: appRoutes.viewPayrollReportTemplate().format,
      isSearchable: false,
      title: "Payroll Report Template",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-payroll-report-templates"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <PayrollPayslip />,
      path: appRoutes.payslips,
      isSearchable: true,
      title: "Payslips",
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-payslips", "view-payslip-templates"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <EmployeePayslips />,
      path: appRoutes.employeePayslips,
      isSearchable: true,
      title: "Employee Payslips",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-payslips"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },

    {
      element: <CreatePayslipTemplate />,
      path: appRoutes.createPayslipTemplate,
      isSearchable: true,
      title: "Create Payslip Template",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payslip-templates"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <EditPayslipTemplate />,
      path: appRoutes.editPayslipTemplate().format,
      isSearchable: false,
      title: "Edit Payslip Template",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-payslip-templates"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
    {
      element: <ViewPayslipTemplate />,
      path: appRoutes.viewPayslipTemplate().format,
      isSearchable: false,
      title: "Payslip Template",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-payslip-templates"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: ["payroll-analytics", "payroll-disbursement"],
        },
      }),
    },
  ];
};
