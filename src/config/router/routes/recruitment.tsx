import RecruitmentSettingsPage from "features/recruitment/features/settings/pages/RecruitmentSettingsPage";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import RecruitmentDBPage from "features/recruitment/features/dashboard/pages/RecruitmentDBPage";
import RecruitmentHiredCandidatePage from "features/recruitment/features/hiredCandidate/pages/RecruitmentHiredCandidatePage";
import RecruitmentReportPage from "features/recruitment/features/report/pages/RecruitmentReportPage";
import { RecruitmentChannels } from "features/recruitment/features/settings/pages/RecruitmentChannels";
import { RecruitmentCandidateStatus } from "features/recruitment/features/settings/pages/RecruitmentCandidateStatus";
import { RecruitmentEmailTemplate } from "features/recruitment/features/settings/pages/RecruitmentEmailTemplate";
import { RecruitmentJobTemplate } from "features/recruitment/features/settings/pages/RecruitmentJobTemplate";
import { RecruitmentOfferTemplate } from "features/recruitment/features/settings/pages/RecruitmentOfferTemplate";
import { RecruitementOtherSettings } from "features/recruitment/features/settings/pages/RecruitmentOtherSettings";

export const recruitmentRoutes: TRouteData[] = [
  {
    element: <RecruitmentDBPage />,
    path: appRoutes.recruitmentDashboard,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Recruitment Dashboard",
  },
  {
    element: <RecruitmentSettingsPage />,
    path: appRoutes.recruitmentSettings,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Recruitment Settings",
  },
  {
    element: <RecruitmentHiredCandidatePage />,
    path: appRoutes.recruitmentHiredCandidate,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Recruitment Hired Candidate",
  },
  {
    element: <RecruitmentReportPage />,
    path: appRoutes.recruitmentHiredCandidate,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Recruitment Report",
  },

  // SETTINGS
  {
    element: <RecruitmentChannels />,
    path: appRoutes.recruitmentRecruitmentChannels,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Recruitment Channels",
  },
  {
    element: <RecruitmentCandidateStatus />,
    path: appRoutes.recruitmentConfigureCandidateStatus,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Configure Candidate Status",
  },
  {
    element: <RecruitmentEmailTemplate/>,
    path: appRoutes.recruitmentEmailTemplates,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Email Template",
  },
  {
    element: <RecruitmentJobTemplate/>,
    path: appRoutes.recruitmentJobTemplates,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Job Template",
  },
  {
    element: <RecruitmentOfferTemplate/>,
    path: appRoutes.recruitmentOfferTemplates,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Offer Template",
  },
  {
    element: <RecruitementOtherSettings/>,
    path: appRoutes.recruitmentOtherSettings,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Other Settings",
  },
];
