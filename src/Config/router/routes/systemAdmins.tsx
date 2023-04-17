import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const systemAdminRoutes: TRouteData[] = [
  {
    element: <div />,
    path: appRoutes.systemAdminLogin,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.systemAdmins,
    isSearchable: false,
  },
];
