import Home from "features/home/pages/Home";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const homeRoutes: TRouteData[] = [
  {
    element: <Home />,
    path: appRoutes.home,
    isSearchable: true,
    title: "Home",
  },
  {
    element: <div />,
    path: appRoutes.companyOrganogram,
    isSearchable: false,
    title: "Company Organogram",
  },
];
