import { TAppPageDataFnProps, TRouteData } from "../types";
import { attendanceRoutes } from "./attendance";
import { authRoutesDontRequireAuthentication } from "./auth";
import { billingRoutes } from "./billing";
import { homeRoutes } from "./home";
import { leaningRoutes } from "./learning";
import { notFoundRoutes } from "./notFound";
import { notificationRoutes } from "./notifications";
import { payrollRoutes } from "./payroll";
import { performanceRoutes } from "./performance";
import { recruitmentRoutes } from "./recruitment";
import { selfServiceRoutes } from "./selfService";
import { settingRoutes } from "./settings";
import { systemAdminRoutes } from "./systemAdmins";

export const appPagesData = (props: TAppPageDataFnProps): TRouteData[] => {
  const { userPermissions, licenseType, isOwner, activeSubscription } = props;
  return [
    ...authRoutesDontRequireAuthentication,
    ...billingRoutes({ userPermissions, licenseType, isOwner: !!isOwner }),
    ...homeRoutes,
    ...notFoundRoutes,
    ...notificationRoutes,
    ...payrollRoutes({ userPermissions, licenseType, activeSubscription }),
    ...selfServiceRoutes({ userPermissions, licenseType, activeSubscription }),
    ...settingRoutes({ userPermissions, activeSubscription }),
    ...systemAdminRoutes,
    ...performanceRoutes,
    ...attendanceRoutes,
    ...leaningRoutes,
    ...recruitmentRoutes,
  ].filter((item) => item?.hidden === false || item.hidden === undefined);
};
