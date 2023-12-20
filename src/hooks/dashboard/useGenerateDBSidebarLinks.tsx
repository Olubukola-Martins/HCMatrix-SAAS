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
};

export const useGenerateDBSidebarLinks = (): TData => {
  const { userPermissions, licenseType } = useGetUserPermissions();
  const isUserLicensed = licenseType === "licensed";
  const sidebarRoutes: TSideBarRoute[] = [
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
      }),
      matcherKeys: ["payroll"],
    },
    {
      name: "Recruitment",
      path: "/recruitment",
      icon: <i className="ri-line-chart-line" />,
      hidden: false,
      matcherKeys: ["recruitment"],
    },
    {
      name: "Performance",
      path: `${appRoutes.balanceScorecard}`,
      icon: <i className="ri-check-double-line" />,
      hidden: false,
      matcherKeys: ["performance"],
    },
    {
      name: "Time & Attendance",
      path: `${appRoutes.attendanceHome}`,
      icon: <i className="ri-check-double-line" />,
      hidden: false,
      matcherKeys: ["attendance"],
    },
    {
      name: "Learning & Development",
      path: `${appRoutes.leaningHome}`,
      icon: <i className="ri-check-double-line" />,
      hidden: false,
      matcherKeys: [],
    },
    {
      name: "Subscriptions",
      path: "/subscriptions",
      icon: <i className="ri-bill-line" />,
      hidden: false,
      matcherKeys: ["subscription"],
    },
  ];
  return {
    sidebarRoutes,
  };
};
