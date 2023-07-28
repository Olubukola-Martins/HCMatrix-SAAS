import { LearningHome } from "features/leaningAndDev/pages/LearningHome";
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
import { Gamification } from "features/leaningAndDev/pages/Gamification";
import { Budgets } from "features/leaningAndDev/pages/Budgets";
import { PaidTraining } from "features/leaningAndDev/pages/PaidTraining";
import { AddTraining } from "features/leaningAndDev/pages/AddTraining";
import { LAndDReport } from "features/leaningAndDev/pages/LAndDReport";
import { Udemy } from "features/leaningAndDev/pages/Udemy";

export const leaningRoutes: TRouteData[] = [
  {
    element: <LearningHome />,
    path: appRoutes.learningHome,
    isSearchable: true,
    title: "Learning & development",
    // category: "doesnt-require-authentication"
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
  {
    element: <Gamification />,
    path: appRoutes.gamification,
    isSearchable: true,
    title: "Gamification",
  },
  {
    element: <Budgets />,
    path: appRoutes.budgets,
    isSearchable: true,
    title: "Training budgets",
  },
  {
    element: <PaidTraining />,
    path: appRoutes.paidTraining,
    isSearchable: false,
  },
  {
    element: <AddTraining />,
    path: appRoutes.addTraining,
    isSearchable: false,
  },

  {
    element: <LAndDReport />,
    path: appRoutes.lAndDReport,
    isSearchable: true,
    title: "Learning & Development Report",
  },
  {
    element: <Udemy />,
    path: appRoutes.udemy,
    isSearchable: true,
    title: "Udemy Report",
  },
];
