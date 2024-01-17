import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { appRoutes } from "config/router/paths";
import React from "react";
import { TNavRoute } from "types/navigation-routes";
type TData = {
  navRoutes: TNavRoute[];
};
const useGeneratePayrollNavRoutes = (): TData => {
  const { userPermissions } = useGetUserPermissions();

  return {
    navRoutes: [
      {
        title: "Dashboard",
        path: appRoutes.payrollHome,
        hidden: !canUserAccessComponent({
          userPermissions,
          requiredPermissions: ["view-payroll-dashboard"],
        }),
      },
      {
        title: "Cost Centres",
        path: appRoutes.payrollCostCentres,
        hidden: !canUserAccessComponent({
          userPermissions,
          requiredPermissions: ["manage-cost-centres"],
        }),
      },
      {
        title: "Exchange Rates",
        path: appRoutes.payrollExchangeRates,
        hidden: !canUserAccessComponent({
          userPermissions,
          requiredPermissions: ["manage-exchange-rates"],
        }),
      },
      {
        title: "Payroll Schemes",
        path: appRoutes.payrollSchemes,
        hidden: !canUserAccessComponent({
          userPermissions,
          requiredPermissions: ["manage-payroll-schemes"],
        }),
      },
      {
        title: "Grade & Categories",
        path: appRoutes.payGradeAndCategorySettings,
        hidden: !canUserAccessComponent({
          userPermissions,
          requiredPermissions: ["manage-pay-grades-and-categories"],
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
        }),
        children: [
          {
            path: appRoutes.taxAuthorities,
            title: "Tax",
            hidden: !canUserAccessComponent({
              userPermissions,
              requiredPermissions: ["manage-tax-authorities"],
            }),
          },
          {
            path: appRoutes.pensionAdministrators,
            title: "Pension",
            hidden: !canUserAccessComponent({
              userPermissions,
              requiredPermissions: ["manage-pension-authorities"],
            }),
          },
          {
            path: appRoutes.itfAuthorities,
            title: "ITF",
            hidden: !canUserAccessComponent({
              userPermissions,
              requiredPermissions: ["manage-itf-authorities"],
            }),
          },
          {
            path: appRoutes.nsitfAuthorities,
            title: "NSITF",
            hidden: !canUserAccessComponent({
              userPermissions,
              requiredPermissions: ["manage-nsitf-authorities"],
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
        }),
      },
      {
        title: "Settings",
        path: appRoutes.payrollSettings,
        hidden: !canUserAccessComponent({
          userPermissions,
          requiredPermissions: ["manage-payroll-settings"],
        }),
      },
    ],
  };
};

export default useGeneratePayrollNavRoutes;
