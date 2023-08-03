import AddJobOpening from "features/recruitment/pages/AddJobOpening";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import RecruitmentDashboard from "features/recruitment/pages/RecruitmentDashboard";
import RecruitmentReport from "features/recruitment/pages/RecruitmentReport";
import RecruitmentSettings from "features/recruitment/pages/RecruitmentSettings";

export const recruitmentRoutes: TRouteData[] = [
  {
    element: <RecruitmentDashboard />,
    path: appRoutes.recruitmentDashboard,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Dashboard",
  },
  {
    element: <RecruitmentReport />,
    path: appRoutes.recruitmentReport,
    isSearchable: true,
    isPrimaryFeature: true,

    title: "Report",
  },
  {
    element: <RecruitmentSettings />,
    path: appRoutes.recruitmentSettings,
    isSearchable: true,
    title: "Settings",
    isPrimaryFeature: true,
  },
  {
    element: <AddJobOpening />,
    path: appRoutes.recruitmentAddJobOpening,
    isSearchable: true,
    title: "Add Job Opening",
    isPrimaryFeature: true,
  },
];
