import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const performanceRoutes: TRouteData[] = [
  {
    element: <div />,
    path: appRoutes.billingStatement,
    isSearchable: false,
  },
];
