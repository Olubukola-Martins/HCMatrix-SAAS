import { TAppPageDataFnProps, TRouteData } from "../types";
import { attendanceRoutes } from "./attendance";
import { authRoutesDontRequireAuthentication } from "./auth";
import { billingRoutes } from "./billing";
import { homeRoutes } from "./home";
import { leaningRoutes } from "./leaning";
import { notFoundRoutes } from "./notFound";
import { notificationRoutes } from "./notifications";
import { payrollRoutes } from "./payroll";
import { performanceRoutes } from "./performance";
import { selfServiceRoutes } from "./selfService";
import { settingRoutes } from "./settings";
import { systemAdminRoutes } from "./systemAdmins";

export const appPagesData = (props: TAppPageDataFnProps): TRouteData[] => {
  const { userPermissions } = props;
  return [
    ...authRoutesDontRequireAuthentication,
    ...billingRoutes,
    ...homeRoutes,
    ...notFoundRoutes,
    ...notificationRoutes,
    ...payrollRoutes,
    ...selfServiceRoutes,
    ...settingRoutes({ userPermissions }),
    ...systemAdminRoutes,
    ...performanceRoutes,
    ...attendanceRoutes,
    ...leaningRoutes,
  ].filter((item) => item?.hidden === false || item.hidden === undefined);
};
