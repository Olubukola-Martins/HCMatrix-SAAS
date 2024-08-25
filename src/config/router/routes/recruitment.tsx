import RecruitmentSettingsPage from "features/recruitment/features/settings/pages/RecruitmentSettingsPage";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import RecruitmentDBPage from "features/recruitment/features/dashboard/pages/RecruitmentDBPage";
import RecruitmentHiredCandidatePage from "features/recruitment/features/hiredCandidate/pages/RecruitmentHiredCandidatePage";
import RecruitmentReportPage from "features/recruitment/features/report/pages/RecruitmentReportPage";
import RecruitmentCandidateStatusPage from "features/recruitment/features/settings/features/configureCandidateStatus/pages/RecruitmentCandidateStatusPage";
import RecruitmentChannelsPage from "features/recruitment/features/settings/features/recruitmentChannels/pages/RecruitmentChannelsPage";
import RecruitmentEmailTemplatePage from "features/recruitment/features/settings/features/emailTemplate/pages/RecruitmentEmailTemplatePage";
import RecruitmentOfferTemplatePage from "features/recruitment/features/settings/features/offerTemplate/pages/RecruitmentOfferTemplatePage";
import OfferTemplateDetailsPage from "features/recruitment/features/settings/features/offerTemplate/pages/OfferTemplateDetailsPage";
import { RecruitmentJobTemplate } from "features/recruitment/features/settings/features/jobTemplate/pages/RecruitmentJobTemplate";
import JobTemplateDetailsPage from "features/recruitment/features/settings/features/jobTemplate/pages/JobTemplateDetailsPage";
import { RecruitementOtherSettings } from "features/recruitment/features/settings/features/otherSettings/pages/RecruitmentOtherSettings";
import { EmailTemplateDetails } from "features/recruitment/features/settings/pages/EmailTemplateDetails";
import { JobOpeningsPage } from "features/recruitment/features/dashboard/features/jobOpenings/pages/JobOpeningsPage";
import AddJobOpening from "features/recruitment/features/dashboard/features/jobOpenings/pages/AddJobOpening";
import PanelistPage from "features/recruitment/features/panelist/pages/PanelistPage";
import FullJobDescription from "features/recruitment/features/panelist/pages/FullJobDescription";
import AllCandidatesPage from "features/recruitment/features/panelist/pages/AllCandidatesPage";

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
  {
    element: <JobOpeningsPage />,
    path: appRoutes.recruitmentJobOpenings,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Recruitment Job Openings",
  },
  {
    element: <AddJobOpening />,
    path: appRoutes.recruitmentAddJobOpenings,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Recruitment Add Job Openings",
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
  {
    element: <JobTemplateDetailsPage />,
    path: appRoutes.recruitmentJobTemplateDetails().format,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Job Template",
  },
  // Recruitment Panelist
  {
    element: <PanelistPage />,
    path: appRoutes.recruitmentPanelist,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Recruitment Panelist",
  },
  {
    element: <AllCandidatesPage />,
    path: appRoutes.recruitmentPanelistAllCandidates,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "All Candidates",
  },
  {
    element: <FullJobDescription />,
    path: appRoutes.recruitmentPanelistFullJobDescription().format,
    isSearchable: true,
    isPrimaryFeature: true,
    title: "Full Job Description",
  },
];
