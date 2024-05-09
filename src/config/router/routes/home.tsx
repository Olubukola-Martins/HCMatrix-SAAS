import Home from "features/home/pages/Home";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import CompanyOrganogramPage from "features/core/company/pages/CompanyOrganogramPage";

export const homeRoutes: TRouteData[] = [
  {
    element: <Home />,
    path: appRoutes.home,
    isSearchable: true,
    title: "Home",
  },
  {
    element: <CompanyOrganogramPage />,
    path: appRoutes.companyOrganogram,
    isSearchable: true,
    title: "Company Organogram",
  },
];
