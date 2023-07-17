import { LeaningHome } from "features/leaningAndDev/pages/LeaningHome";
import { TRouteData } from "../types";
import { appRoutes } from "../paths";
import { TrainingSettings } from "features/leaningAndDev/pages/settings/TrainingSettings";
import { FeedbackTemplate } from "features/leaningAndDev/pages/settings/FeedbackTemplate";
import { GamificationSettings } from "features/leaningAndDev/pages/settings/GamificationSettings";
import { Notification } from "features/leaningAndDev/pages/settings/Notification";
import { TrackProgress } from "features/leaningAndDev/pages/TrackProgress";
import { TrackProgressDetails } from "features/leaningAndDev/pages/TrackProgressDetails";
import { Training } from "features/leaningAndDev/pages/Training";
import { TrainingDetails } from "features/leaningAndDev/pages/TrainingDetails";

export const leaningRoutes: TRouteData[] = [
  {
    element: <LeaningHome />,
    path: appRoutes.leaningHome,
    isSearchable: true,
    title: "Leaning & development",
  },
  {
    element: <TrainingSettings />,
    path: appRoutes.trainingSettings,
    isSearchable: false,
  },
  {
    element: <FeedbackTemplate />,
    path: appRoutes.feedbackTemplate,
    isSearchable: false,
  },
  {
    element: <GamificationSettings />,
    path: appRoutes.gamificationSettings,
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
  {
    element: <TrackProgressDetails />,
    path: appRoutes.trackProgressDetails().format,
    isSearchable: false,
  },
  {
    element: <Training />,
    path: appRoutes.training,
    isSearchable: false,
  },
  {
    element: <TrainingDetails />,
    path: appRoutes.trainingDetails().format,
    isSearchable: false,
  },
];
