import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { appRoutes } from "config/router/paths";

type TSideBarRoute = {
  name: string;
  path: string;
  icon: React.ReactNode;
  matcherKeys?: string[];
  hidden: boolean;
};
type TData = {
  sidebarRoutes: TSideBarRoute[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
// TODO: Fill requiredSubsciptionState resources when fleshed out and updated by team
export const useGenerateDBSidebarLinks = (): TData => {
  const {
    userPermissions,
    licenseType,
    isOwner,
    companyActiveSubscription,
    isError,
    isLoading,
    isSuccess,
  } = useGetUserPermissions();
  const isUserLicensed = licenseType === "licensed";
  const sidebarRoutes: TSideBarRoute[] = isSuccess
    ? [
        {
          name: "Home",
          path: appRoutes.home,
          icon: <i className="ri-home-smile-line" />,
          hidden: false,
        },
        {
          name: "Self-service",
          path: appRoutes.selfServiceHome,
          icon: <i className="ri-organization-chart" />,
          hidden: !isUserLicensed,
          matcherKeys: ["self-service"],
        },
        {
          name: "Payroll",
          path: `${appRoutes.payrollHome}`,
          icon: <i className="ri-check-double-line" />,
          hidden: !canUserAccessComponent({
            userPermissions,
            requiredPermissions: ["view-payroll-dashboard"],
            activeSubscription: companyActiveSubscription,
            requiredSubscriptionState: {
              label: "payroll",
              resources: ["payroll-analytics", "payroll-disbursement"],
            },
          }),
          matcherKeys: ["payroll"],
        },
        {
          name: "Recruitment",
          path: appRoutes.recruitmentDashboard,
          icon: <i className="ri-line-chart-line" />,
          hidden: false,
          // hidden: !canUserAccessComponent({
          //   userPermissions,
          //   requiredPermissions: [],
          //   activeSubscription: companyActiveSubscription,
          //   requiredSubscriptionState: {
          //     label: "recruitment",
          //     resources: [],
          //   },
          // }),
          matcherKeys: ["recruitment"],
        },
        {
          name: "Performance",
          path: `${appRoutes.balanceScorecard}`,
          icon: <i className="ri-check-double-line" />,
          hidden: !canUserAccessComponent({
            userPermissions,
            requiredPermissions: [],
            activeSubscription: companyActiveSubscription,
            requiredSubscriptionState: {
              label: "performance",
              resources: [],
            },
          }),
          matcherKeys: ["performance"],
        },
        {
          name: "Time & Attendance",
          path: `${appRoutes.attendanceHome}`,
          icon: <i className="ri-check-double-line" />,
          hidden: !canUserAccessComponent({
            userPermissions,
            requiredPermissions: [],
            activeSubscription: companyActiveSubscription,
            requiredSubscriptionState: {
              label: "time-and-attendance",
              resources: [],
            },
          }),
          matcherKeys: ["attendance"],
        },
        {
          name: "Learning & Development",
          path: `${appRoutes.leaningHome}`,
          icon: <i className="ri-check-double-line" />,
          hidden: !canUserAccessComponent({
            userPermissions,
            requiredPermissions: [],
            activeSubscription: companyActiveSubscription,
            requiredSubscriptionState: {
              label: "learning-and-development",
              resources: [],
            },
          }),
          matcherKeys: [],
        },
        {
          name: "Subscriptions",
          path: `${appRoutes.billingSubscription}`,
          icon: <i className="ri-bill-line" />,
          hidden: isOwner === false,
          matcherKeys: ["subscription"],
        },
      ]
    : [];
  return {
    sidebarRoutes,
    isSuccess,
    isError,
    isLoading,
  };
};
