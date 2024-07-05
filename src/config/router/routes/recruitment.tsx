import RecruitmentSettingsPage from "features/recruitment/features/settings/pages/RecruitmentSettingsPage";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import RecruitmentDBPage from "features/recruitment/features/dashboard/pages/RecruitmentDBPage";
import RecruitmentHiredCandidatePage from "features/recruitment/features/hiredCandidate/pages/RecruitmentHiredCandidatePage";
import RecruitmentReportPage from "features/recruitment/features/report/pages/RecruitmentReportPage";
import { RecruitmentJobTemplate } from "features/recruitment/features/settings/pages/RecruitmentJobTemplate";
import { RecruitementOtherSettings } from "features/recruitment/features/settings/pages/RecruitmentOtherSettings";
import { EmailTemplateDetails } from "features/recruitment/features/settings/pages/EmailTemplateDetails";
import RecruitmentCandidateStatusPage from "features/recruitment/features/settings/pages/RecruitmentCandidateStatusPage";
import RecruitmentChannelsPage from "features/recruitment/features/settings/pages/RecruitmentChannelsPage";
import RecruitmentEmailTemplatePage from "features/recruitment/features/settings/pages/RecruitmentEmailTemplatePage";
import OfferTemplateDetailsPage from "features/recruitment/features/settings/pages/OfferTemplateDetailsPage";
import RecruitmentOfferTemplatePage from "features/recruitment/features/settings/pages/RecruitmentOfferTemplatePage";

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
    element: <RecruitmentChannelsPage />,
    path: appRoutes.recruitmentRecruitmentChannels,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Recruitment Channels",
  },
  {
    element: <RecruitmentCandidateStatusPage />,
    path: appRoutes.recruitmentConfigureCandidateStatus,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Configure Candidate Status",
  },
  {
    element: <RecruitmentEmailTemplatePage />,
    path: appRoutes.recruitmentEmailTemplates,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Email Template",
  },
  {
    element: <RecruitmentJobTemplate />,
    path: appRoutes.recruitmentJobTemplates,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Job Template",
  },
  {
    element: <RecruitmentOfferTemplatePage />,
    path: appRoutes.recruitmentOfferTemplates,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Offer Template",
  },
  {
    element: <RecruitementOtherSettings />,
    path: appRoutes.recruitmentOtherSettings,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Other Settings",
  },
  {
    element: <EmailTemplateDetails />,
    path: appRoutes.recruitmentEmailTemplateDetails().format,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Email Template Details",
  },
  {
    element: <OfferTemplateDetailsPage />,
    path: appRoutes.recruitmentOfferTemplateDetails().format,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Offer Template Details",
  },
];
