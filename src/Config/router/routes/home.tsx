import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const homeRoutes: TRouteData[] = [
  {
    element: <div />,
    path: appRoutes.home,
    isSearchable: false,
    title: "Home",
  },
  {
    element: <div />,
    path: appRoutes.companyOrganogram,
    isSearchable: false,
    title: "Company Organogram",
  },
];
