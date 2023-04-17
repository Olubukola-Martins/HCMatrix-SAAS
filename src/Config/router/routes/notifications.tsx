import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const notificationRoutes: TRouteData[] = [
  {
    element: <div />,
    path: appRoutes.notifications,
    isSearchable: true,
    title: "My Notifications",
  },
];
