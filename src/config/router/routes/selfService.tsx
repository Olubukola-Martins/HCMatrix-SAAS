import SelfServiceHome from "features/self-service/pages/SelfServiceHome";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import Requisition from "features/self-service/features/requisitions/pages/Requisition";
import Reimbursements from "features/self-service/features/reimbursement/pages/Reimbursements";
import Monetary from "features/self-service/features/monetary-requests/pages/Monetary";
import Assets from "features/self-service/features/asset-requisition/pages/Assets";
import AssetTypeDetails from "features/self-service/features/asset-requisition/pages/AssetTypeDetails";
import AssetDetails from "features/self-service/features/asset-requisition/pages/AssetDetails";
import LoanHome from "features/self-service/features/loan/pages/LoanHome";
import LoanRequest from "features/self-service/features/loan/pages/LoanRequest";
import LoanPolicies from "features/self-service/features/loan/pages/LoanPolicies";
import VehicleBookingHome from "features/self-service/features/vehicle-booking/pages/VehicleBookingHome";
import VehicleDetails from "features/self-service/features/vehicle-booking/pages/VehicleDetails";
import SurveyHome from "features/self-service/features/survey-forms/pages/SurveyHome";
import NewSurveyForm from "features/self-service/features/survey-forms/pages/NewSurveyForm";
import SingleSurveyForm from "features/self-service/features/survey-forms/pages/SingleSurveyForm";
import { CRBHomePage } from "features/self-service/features/conference-room-booking/pages/CRBHomePage";
import LeaveHome from "features/self-service/features/leave/pages/LeaveHome";
import LeaveSettings from "features/self-service/features/leave/pages/LeaveSettings";
import HealthAccessHome from "features/self-service/features/health-access/pages/HealthAccessHome";
import HealthAccessSettings from "features/self-service/features/health-access/pages/HealthAccessSettings";
import Onboarding from "features/self-service/features/onboarding/pages/Onboarding";
import StartOnboarding from "features/self-service/features/onboarding/pages/StartOnboarding";
import HandOver from "features/self-service/features/handover-forms/pages/HandOver";
import HandOverDetails from "features/self-service/features/handover-forms/pages/HandOverDetails";
import { HandOverNewForm } from "features/self-service/features/handover-forms/pages/HandOverNewForm";
import HRLetters from "features/self-service/features/hr-letters-and-documents/pages/HRLetters";

export const selfServiceRoutes: TRouteData[] = [
  {
    element: <SelfServiceHome />,
    path: appRoutes.selfServiceHome,
    isSearchable: true,
    title: "My Self Service",
  },
  {
    element: <Requisition />,
    path: appRoutes.selfServiceRequisition,
    isSearchable: true,
    title: "Requisitions",
  },
  {
    element: <Reimbursements />,
    path: appRoutes.selfServiceReimbursement,
    isSearchable: true,
    title: "Reimbursements",
  },
  {
    element: <Monetary />,
    path: appRoutes.selfServiceMonetary,
    isSearchable: true,
    title: "Monetary Requests",
  },
  {
    element: <Assets />,
    path: appRoutes.selfServiceAssets,
    isSearchable: true,
    title: "Assets",
  },
  {
    element: <AssetTypeDetails />,
    path: appRoutes.assetTypeDetails().format,
    isSearchable: false,
  },
  {
    element: <AssetDetails />,
    path: appRoutes.assetDetails,
    isSearchable: true,
    title: "Asset Details",
  },
  {
    element: <LoanHome />,
    path: appRoutes.loans,
    isSearchable: true,
    title: "Loans",
  },
  {
    element: <LoanRequest />,
    path: appRoutes.loanRequests,
    isSearchable: true,
    title: "Loan Requests",
  },
  {
    element: <LoanPolicies />,
    path: appRoutes.loanPolicies,
    isSearchable: true,
    title: "Loan Policies",
  },
  {
    element: <VehicleBookingHome />,
    path: appRoutes.vehicleBooking,
    isSearchable: true,
    title: "Vehicle Booking",
  },
  {
    element: <VehicleDetails />,
    path: appRoutes.vehicleDetails().format,
    isSearchable: false,
    title: "Vehicle Details",
  },
  {
    element: <SurveyHome />,
    path: appRoutes.surveyHome,
    isSearchable: true,
    title: "Surveys",
  },
  {
    element: <NewSurveyForm />,
    path: appRoutes.newSurvey,
    isSearchable: true,
    title: "New Survey",
  },
  {
    element: <SingleSurveyForm />,
    path: appRoutes.singleSurveyForm().format,
    isSearchable: false,
  },
  {
    element: <CRBHomePage />,
    path: appRoutes.conferenceRoomBooking,
    isSearchable: true,
    title: "Conference Room Booking",
  },
  {
    element: <LeaveHome />,
    path: appRoutes.leaveHome,
    isSearchable: true,
    title: "Leave",
  },
  {
    element: <LeaveSettings />,
    path: appRoutes.leaveSettings,
    isSearchable: true,
    title: "Leave Settings",
  },
  {
    element: <HealthAccessHome />,
    path: appRoutes.healthAccessHome,
    isSearchable: true,
    title: "Health Access",
  },
  {
    element: <HealthAccessSettings />,
    path: appRoutes.healthAccessSettings,
    isSearchable: true,
    title: "Health Access Settings",
  },
  {
    element: <Onboarding />,
    path: appRoutes.onboarding,
    isSearchable: true,
    title: "Onboarding",
  },
  {
    element: <StartOnboarding />,
    path: appRoutes.startOnBoarding().format,
    isSearchable: false,
  },
  {
    element: <HandOver />,
    path: appRoutes.handOver,
    isSearchable: true,
    title: "HandOver",
  },
  {
    element: <HandOverNewForm />,
    path: appRoutes.newHandOverForm,
    isSearchable: true,
    title: "New Handover Form",
  },
  {
    element: <HandOverDetails />,
    path: appRoutes.handOverDetails().format,
    isSearchable: true,
    title: "Handover Details",
  },
  {
    element: <HRLetters />,
    path: appRoutes.hRLetters,
    isSearchable: true,
    title: "HR Letters",
  },
];
