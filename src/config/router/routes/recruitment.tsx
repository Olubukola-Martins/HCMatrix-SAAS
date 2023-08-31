import AddJobOpening from "features/recruitment/pages/AddJobOpening";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import RecruitmentDashboard from "features/recruitment/pages/RecruitmentDashboard";
import RecruitmentReport from "features/recruitment/pages/RecruitmentReport";
import CandidateStatus from "features/recruitment/pages/CandidateStatus";
import CandidateSource from "features/recruitment/pages/CandidateSource";
import EmailTemplate from "features/recruitment/pages/EmailTemplate";
import OfferTemplate from "features/recruitment/pages/OfferTemplate";
import JobTemplate from "features/recruitment/pages/JobTemplate";
import OtherSettings from "features/recruitment/pages/OtherSettings";
import AddEmailTemplate from "features/recruitment/pages/AddEmailTemplate";
import AddOfferTemplate from "features/recruitment/pages/AddOfferTemplate";
import AddJobTemplate from "features/recruitment/pages/AddJobTemplate";
import ApplicantDecription from "features/recruitment/features/applications/ApplicationDetails";
import ApplicantInfo from "features/recruitment/features/applications/ApplicantInfo";
import ApplicationsList from "features/recruitment/components/ApplicationsList";
import ApplicationDetails from "features/recruitment/features/applications/ApplicationDetails";

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
];
