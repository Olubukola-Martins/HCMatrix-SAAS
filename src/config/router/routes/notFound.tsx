import NotFoundPage from "features/notFound/pages/NotFoundPage";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const notFoundRoutes: TRouteData[] = [
  {
    element: <NotFoundPage />,
    path: appRoutes.notFound,
    isSearchable: false,
  },
];
