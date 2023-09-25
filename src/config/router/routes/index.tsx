import { TRouteDataCategory } from "../types";
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

export const appPagesData = [
  ...authRoutesDontRequireAuthentication,
  ...billingRoutes,
  ...homeRoutes,
  ...notFoundRoutes,
  ...notificationRoutes,
  ...payrollRoutes,
  ...selfServiceRoutes,
  ...settingRoutes,
  ...systemAdminRoutes,
  ...performanceRoutes,
  ...attendanceRoutes,
  ...leaningRoutes,
  ...recruitmentRoutes,
  // ...leaningRoutes.map((item) => {
  //   return {
  //     ...item,
  //     category:
  //       "doesnt-require-authentication" as "doesnt-require-authentication",
  //   };
  // }),
];
