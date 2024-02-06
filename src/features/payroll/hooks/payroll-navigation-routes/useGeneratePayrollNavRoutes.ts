import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { appRoutes } from "config/router/paths";
import { TNavRoute } from "types/navigation-routes";
type TData = {
  navRoutes: TNavRoute[];
};
const useGeneratePayrollNavRoutes = (): TData => {
  const { userPermissions, companyActiveSubscription: activeSubscription } =
    useGetUserPermissions();

  return {
    navRoutes: [
      {
        title: "Dashboard",
        path: appRoutes.payrollHome,
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
        title: "Cost Centres",
        path: appRoutes.payrollCostCentres,
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
        title: "Exchange Rates",
        path: appRoutes.payrollExchangeRates,
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
        title: "Payroll Schemes",
        path: appRoutes.payrollSchemes,
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
        title: "Grade & Categories",
        path: appRoutes.payGradeAndCategorySettings,
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
        title: "Organizations",
        hidden: !canUserAccessComponent({
          userPermissions,
          requiredPermissions: [
            "manage-itf-authorities",
            "manage-nsitf-authorities",
            "manage-pension-authorities",
            "manage-tax-authorities",
          ],
          activeSubscription,
          requiredSubscriptionState: {
            label: "payroll",
            resources: ["payroll-analytics", "payroll-disbursement"],
          },
        }),
        children: [
          {
            path: appRoutes.taxAuthorities,
            title: "Tax",
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
            path: appRoutes.pensionAdministrators,
            title: "Pension",
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
            path: appRoutes.itfAuthorities,
            title: "ITF",
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
            path: appRoutes.nsitfAuthorities,
            title: "NSITF",
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
        ],
      },
      {
        title: "Reports",
        path: appRoutes.payrollReport,
        hidden: !canUserAccessComponent({
          userPermissions,
          requiredPermissions: [
            "manage-payroll-reports",
            "manage-payroll-report-templates",
            "view-payroll-reports",
            "view-payroll-report-templates",
          ],
          activeSubscription,
          requiredSubscriptionState: {
            label: "payroll",
            resources: ["payroll-analytics", "payroll-disbursement"],
          },
        }),
      },
      {
        title: "Payslips",
        path: appRoutes.payslips,
        hidden: !canUserAccessComponent({
          userPermissions,
          requiredPermissions: [
            "view-payslip-templates",
            "view-all-payslips",
            "manage-payslip-templates",
          ],
          activeSubscription,
          requiredSubscriptionState: {
            label: "payroll",
            resources: ["payroll-analytics", "payroll-disbursement"],
          },
        }),
      },
      {
        title: "Settings",
        path: appRoutes.payrollSettings,
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
    ],
  };
};

export default useGeneratePayrollNavRoutes;
