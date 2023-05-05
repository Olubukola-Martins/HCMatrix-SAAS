import { Notification } from "features/notifications/pages/Notification";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const notificationRoutes: TRouteData[] = [
  {
    element: <Notification />,
    path: appRoutes.notifications,
    isSearchable: true,
    title: "My Notifications",
  },
];
