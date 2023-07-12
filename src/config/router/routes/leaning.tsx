import { LeaningHome } from "features/leaningAndDev/pages/LeaningHome";
import { TRouteData } from "../types";
import { appRoutes } from "../paths";
import { Training } from "features/leaningAndDev/pages/settings/Training";
import { FeedbackTemplate } from "features/leaningAndDev/pages/settings/FeedbackTemplate";
import { Gamification } from "features/leaningAndDev/pages/settings/Gamification";
import { Notification } from "features/leaningAndDev/pages/settings/Notification";
import { TrackProgress } from "features/leaningAndDev/pages/TrackProgress";

export const leaningRoutes: TRouteData[] = [
  {
    element: <LeaningHome />,
    path: appRoutes.leaningHome,
    isSearchable: true,
    title: "Leaning & development",
  },
  {
    element: <Training />,
    path: appRoutes.training,
    isSearchable: false,
  },
  {
    element: <FeedbackTemplate />,
    path: appRoutes.feedbackTemplate,
    isSearchable: false,
  },
  {
    element: <Gamification />,
    path: appRoutes.gamification,
    isSearchable: false,
  },
  {
    element: <Notification />,
    path: appRoutes.notification,
    isSearchable: false,
  },
  {
    element: <TrackProgress />,
    path: appRoutes.trackProgress,
    isSearchable: false,
  },
];
