import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const billingRoutes: TRouteData[] = [
  {
    element: <div />,
    path: appRoutes.billingStatement,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.billings,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.purchaseUserLicense,
    isSearchable: false,
  },
];
