import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const selfServiceRoutes: TRouteData[] = [
  {
    element: <div />,
    path: appRoutes.selfServiceHome,
    isSearchable: true,
    title: "My Self Service",
  },
  {
    element: <div />,
    path: appRoutes.selfServiceRequisition,
    isSearchable: true,
    title: "Requisitions",
  },
  {
    element: <div />,
    path: appRoutes.selfServiceReimbursement,
    isSearchable: true,
    title: "Reimbursements",
  },
  {
    element: <div />,
    path: appRoutes.selfServiceMonetary,
    isSearchable: true,
    title: "Monetary Requests",
  },
  {
    element: <div />,
    path: appRoutes.selfServiceAssets,
    isSearchable: true,
    title: "Assets",
  },
  {
    element: <div />,
    path: appRoutes.assetTypeDetails().format,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.assetDetails,
    isSearchable: true,
    title: "Asset Details",
  },
  {
    element: <div />,
    path: appRoutes.loans,
    isSearchable: true,
    title: "Loans",
  },
  {
    element: <div />,
    path: appRoutes.loanRequests,
    isSearchable: true,
    title: "Loan Requests",
  },
  {
    element: <div />,
    path: appRoutes.loanPolicies,
    isSearchable: true,
    title: "Loan Policies",
  },
  {
    element: <div />,
    path: appRoutes.vehicleBooking,
    isSearchable: true,
    title: "Vehicle Booking",
  },
  {
    element: <div />,
    path: appRoutes.vehicleDetails,
    isSearchable: true,
    title: "Vehicle Details",
  },
  {
    element: <div />,
    path: appRoutes.surveyHome,
    isSearchable: true,
    title: "Surveys",
  },
  {
    element: <div />,
    path: appRoutes.newSurvey,
    isSearchable: true,
    title: "New Survey",
  },
  {
    element: <div />,
    path: appRoutes.singleSurveyForm().format,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.conferenceRoomBooking,
    isSearchable: true,
    title: "Conference Room Booking",
  },
  {
    element: <div />,
    path: appRoutes.leaveHome,
    isSearchable: true,
    title: "Leave",
  },
  {
    element: <div />,
    path: appRoutes.leaveSettings,
    isSearchable: true,
    title: "Leave Settings",
  },
  {
    element: <div />,
    path: appRoutes.healthAccessHome,
    isSearchable: true,
    title: "Health Access",
  },
  {
    element: <div />,
    path: appRoutes.healthAccessSettings,
    isSearchable: true,
    title: "Health Access Settings",
  },
  {
    element: <div />,
    path: appRoutes.onboarding,
    isSearchable: true,
    title: "Onboarding",
  },
  {
    element: <div />,
    path: appRoutes.startOnBoarding().format,
    isSearchable: false,
  },
  {
    element: <div />,
    path: appRoutes.handOver,
    isSearchable: true,
    title: "HandOver",
  },
  {
    element: <div />,
    path: appRoutes.newHandOverForm,
    isSearchable: true,
    title: "New Handover Form",
  },
  {
    element: <div />,
    path: appRoutes.handOverDetails().format,
    isSearchable: true,
    title: "Handover Details",
  },
  {
    element: <div />,
    path: appRoutes.hRLetters,
    isSearchable: true,
    title: "HR Letters",
  },
];
