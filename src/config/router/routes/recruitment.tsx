import AddJobOpening from "features/recruitment/features/jobOpenings/pages/AddJobOpening";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import RecruitmentDashboard from "features/recruitment/pages/RecruitmentDashboard";
import RecruitmentReport from "features/recruitment/features/report/pages/RecruitmentReport";
import CandidateStatus from "features/recruitment/settings/pages/CandidateStatus";
import OtherSettings from "features/recruitment/settings/pages/OtherSettings";
import AddEmailTemplate from "features/recruitment/settings/pages/AddEmailTemplate";
import ApplicantInfo from "features/recruitment/features/applications/pages/ApplicantInfo";
import ApplicationsList from "features/recruitment/features/applications/components/ApplicationsList";
import ApplicationDetails from "features/recruitment/features/applications/components/ApplicationDetails";
import ApplicantEmailPage from "features/recruitment/features/applications/components/ApplicantEmailPage";
import AddJobTemplate from "features/recruitment/settings/pages/AddJobTemplate";
import AddOfferTemplate from "features/recruitment/settings/pages/AddOfferTemplate";
import CandidateSource from "features/recruitment/settings/pages/CandidateSource";
import EmailTemplate from "features/recruitment/settings/pages/EmailTemplate";
import JobTemplate from "features/recruitment/settings/pages/JobTemplate";
import OfferTemplate from "features/recruitment/settings/pages/OfferTemplate";
import EmailTemplateDetails from "features/recruitment/settings/pages/EmailTemplateDetails";
import OfferTemplateDetails from "features/recruitment/settings/pages/OfferTemplateDetails";
import JobTemplateDetails from "features/recruitment/settings/pages/JobTemplateDetails";

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
    element: <CandidateStatus />,
    path: appRoutes.candidateStatus,
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
  {
    element: <CandidateStatus />,
    path: appRoutes.candidateStatus,
    isSearchable: false,
    isPrimaryFeature: false,
    title: "Candidate Status",
  },
  {
    element: <CandidateSource />,
    path: appRoutes.candidateSources,
    isSearchable: false,
    isPrimaryFeature: false,
    title: "Candidate Source",
  },
  {
    element: <EmailTemplate />,
    path: appRoutes.recruitmentEmailTemplate,
    isSearchable: false,
    isPrimaryFeature: false,
    title: "Email Template",
  },
  {
    element: <OfferTemplate />,
    path: appRoutes.recruitmentOfferTemplate,
    isSearchable: false,
    isPrimaryFeature: false,
    title: "Offer Template",
  },

  {
    element: <JobTemplate />,
    path: appRoutes.recruitmentJobTemplate,
    isSearchable: false,
    isPrimaryFeature: false,
    title: "Job Template",
  },
  {
    element: <OtherSettings />,
    path: appRoutes.recruitmentOtherSettings,
    isSearchable: false,
    isPrimaryFeature: false,
    title: "Other Settings",
  },
  {
    element: <AddEmailTemplate />,
    path: appRoutes.addEmailTemplate,
    isSearchable: false,
  },
  {
    element: <AddOfferTemplate />,
    path: appRoutes.addOfferTemplate,
    isSearchable: false,
  },
  {
    element: <EmailTemplateDetails />,
    path: appRoutes.emailTemplateDetails().format,
    isSearchable: false,
  },
  {
    element: <OfferTemplateDetails />,
    path: appRoutes.offerTemplateDetails().format,
    isSearchable: false,
  },
  {
    element: <JobTemplateDetails />,
    path: appRoutes.jobTemplateDetails().format,
    isSearchable: false,
  },

  {
    element: <AddJobTemplate />,
    path: appRoutes.addJobTemplate,
    isSearchable: false,
  },
  {
    element: <ApplicationDetails />,
    path: appRoutes.applicationDetails().format,
    isSearchable: false,
  },
  {
    element: <ApplicantInfo />,
    path: appRoutes.applicantDetails().format,
    isSearchable: false,
  },
  {
    element: <ApplicationsList />,
    path: appRoutes.applicationsList,
    isSearchable: false,
  },
  {
    element: <ApplicantEmailPage />,
    path: appRoutes.applicantEmailPage,
    isSearchable: false,
  },
];
