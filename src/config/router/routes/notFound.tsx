import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const notFoundRoutes: TRouteData[] = [
  {
    element: <div />,
    path: appRoutes.notFound,
    isSearchable: false,
  },
];
