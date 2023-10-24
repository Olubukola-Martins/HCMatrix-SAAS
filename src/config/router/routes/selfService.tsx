import { appRoutes } from "../paths";
import { TAppPageDataFnProps, TRouteData } from "../types";
// import React, { lazy } from "react";
import SelfServiceHome from "features/self-service/pages/SelfServiceHome";
import Reimbursements from "features/self-service/features/reimbursement/pages/Reimbursements";
import Assets from "features/self-service/features/assets/pages/Assets";
import AssetDetails from "features/self-service/features/assets/pages/AssetDetails";
import LoanHome from "features/self-service/features/loan/pages/LoanHome";
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
import { CRBHomeSettings } from "features/self-service/features/conference-room-booking/pages/CRBHomeSettings";
import ReimbursementSettingPage from "features/self-service/features/reimbursement/pages/ReimbursementSettingPage";
import TransfersSettingPage from "features/self-service/features/transfers/pages/TransferSettingsPage";
import Transfers from "features/self-service/features/transfers/pages/Transfers";
import MonetaryRequests from "features/self-service/features/monetary-requests/pages/MonetaryRequests";
import MonetaryRequestsSettingPage from "features/self-service/features/monetary-requests/pages/MonetaryRequestsSettingPage";
import JobRequestsSettingPage from "features/self-service/features/jobs/pages/JobRequestsSettingPage";
import JobRequests from "features/self-service/features/jobs/pages/JobRequests";
import PositionChangeRequests from "features/self-service/features/position-change/pages/PositionChangeRequests";
import PositionChangeRequestsSettingPage from "features/self-service/features/position-change/pages/PositionChangeRequestsSettingPage";
import PromotionRequests from "features/self-service/features/promotions/pages/PromotionRequests";
import PromotionRequestsSettingPage from "features/self-service/features/promotions/pages/PromotionRequestsSettingPage";
import AssetRequestSettingsPage from "features/self-service/features/assets/pages/AssetRequestSettingsPage";
import TravelRequests from "features/self-service/features/travels/pages/TravelRequests";
import TravelRequestsSettingPage from "features/self-service/features/travels/pages/TravelRequestsSettingPage";
import DocumentsPage from "features/self-service/features/documents/pages/DocumentsPage";
import TasksPage from "features/self-service/features/tasks/pages/TasksPage";
import PayslipsTransactionsPage from "features/self-service/features/payslips/PayslipsTransactionsPage";
import Requisition from "features/self-service/features/requisitions/pages/Requisition";
import { canUserAccessComponent } from "components/permission-restriction/PermissionRestrictor";

// TO DO: This lazy loading might not be needed consider rethinking this, so just temporary
// const Requisition = lazy(
//   () => import("features/self-service/features/requisitions/pages/Requisition")
// );
export const selfServiceRoutes = (props: TAppPageDataFnProps): TRouteData[] => {
  const { userPermissions, hasSelfService } = props;
  return [
    {
      element: <SelfServiceHome />,
      path: appRoutes.selfServiceHome,
      isSearchable: true,
      title: "My Self Service",
      hidden: !hasSelfService,
    },
    {
      element: <PayslipsTransactionsPage />,
      path: appRoutes.payslipTransactions,
      isSearchable: true,
      title: "My Payslip & Transactions",
      hidden: !hasSelfService,
    },
    {
      element: <TasksPage />,
      path: appRoutes.selfServiceTasks,
      isSearchable: true,
      title: "Tasks",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <Requisition />,
      path: appRoutes.selfServiceRequisition,
      isSearchable: true,
      title: "Requisitions",
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-requsition-settings"],
      }),
    },
    {
      element: <TransfersSettingPage />,
      path: appRoutes.selfServiceTransferSetting,
      isSearchable: true,
      title: "Transfer Setting",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-requsition-settings"],
      }),
    },
    {
      element: <Transfers />,
      path: appRoutes.selfServiceTransfer,
      isSearchable: true,
      title: "Transfers",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <ReimbursementSettingPage />,
      path: appRoutes.selfServiceReimbursementSetting,
      isSearchable: true,
      title: "Reimbursement Setting",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-requsition-settings"],
      }),
    },
    {
      element: <Reimbursements />,
      path: appRoutes.selfServiceReimbursement,
      isSearchable: true,
      title: "Reimbursements",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <MonetaryRequestsSettingPage />,
      path: appRoutes.selfServiceMonetarySetting,
      isSearchable: true,
      title: "Monetary Request Setting",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-requsition-settings"],
      }),
    },
    {
      element: <MonetaryRequests />,
      path: appRoutes.selfServiceMonetary,
      isSearchable: true,
      title: "Monetary Requests",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <JobRequestsSettingPage />,
      path: appRoutes.selfServiceJobSetting,
      isSearchable: true,
      title: "Job Request Setting",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-requsition-settings"],
      }),
    },
    {
      element: <JobRequests />,
      path: appRoutes.selfServiceJob,
      isSearchable: true,
      title: "Job Requests",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <PositionChangeRequestsSettingPage />,
      path: appRoutes.selfServicePositionChangeSetting,
      isSearchable: true,
      title: "Position Change Request Setting",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-requsition-settings"],
      }),
    },
    {
      element: <PositionChangeRequests />,
      path: appRoutes.selfServicePositionChange,
      isSearchable: true,
      title: "Position Change Requests",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <PromotionRequestsSettingPage />,
      path: appRoutes.selfServicePromotionSetting,
      isSearchable: true,
      title: "Promotion Request Setting",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-requsition-settings"],
      }),
    },
    {
      element: <PromotionRequests />,
      path: appRoutes.selfServicePromotion,
      isSearchable: true,
      title: "Promotion Requests",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <TravelRequests />,
      path: appRoutes.selfServiceTravels,
      isSearchable: true,
      title: "Travel Requests",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <TravelRequestsSettingPage />,
      path: appRoutes.selfServiceTravelSetting,
      isSearchable: true,
      title: "Travel Request Settings",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-requsition-settings"],
      }),
    },
    {
      element: <Assets />,
      path: appRoutes.selfServiceAssets,
      isSearchable: true,
      title: "Assets",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <AssetRequestSettingsPage />,
      path: appRoutes.selfServiceAssetSetting,
      isSearchable: true,
      title: "Asset Settings",
      isPrimaryFeature: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-requsition-settings"],
      }),
    },

    {
      element: <AssetDetails />,
      path: appRoutes.assetDetails().format,
      isSearchable: false,
      title: "Asset Details",
      hidden: !hasSelfService,
    },
    {
      element: <LoanHome />,
      path: appRoutes.loans,
      isSearchable: true,
      title: "Loans",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },

    {
      element: <LoanPolicies />,
      path: appRoutes.loanPolicies,
      isSearchable: true,
      title: "Loan Policies",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-loan-settings"],
      }),
    },
    {
      element: <VehicleBookingHome />,
      path: appRoutes.vehicleBooking,
      isSearchable: true,
      title: "Vehicle Booking",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <VehicleDetails />,
      path: appRoutes.vehicleDetails().format,
      isSearchable: false,
      title: "Vehicle Details",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-vehicle-settings"],
      }),
    },
    {
      element: <SurveyHome />,
      path: appRoutes.surveyHome,
      isSearchable: true,
      title: "Surveys",
      isPrimaryFeature: true,
      hidden: true, //Pending when this feature is giving a go ahead
    },
    {
      element: <NewSurveyForm />,
      path: appRoutes.newSurvey,
      isSearchable: true,
      title: "New Survey",
      hidden: true, //Pending when this feature is giving a go ahead
    },
    {
      element: <SingleSurveyForm />,
      path: appRoutes.singleSurveyForm().format,
      isSearchable: false,
      hidden: true, //Pending when this feature is giving a go ahead
    },
    {
      element: <CRBHomePage />,
      path: appRoutes.conferenceRoomBooking,
      isSearchable: true,
      title: "Conference Room Booking",
      isPrimaryFeature: true,
    },
    {
      element: <CRBHomeSettings />,
      path: appRoutes.conferenceRoomBookingSetting,
      isSearchable: true,
      title: "Conference Room Booking Setting",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-conference-room-settings"],
      }),
    },
    {
      element: <LeaveHome />,
      path: appRoutes.leaveHome,
      isSearchable: true,
      title: "Leave",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <LeaveSettings />,
      path: appRoutes.leaveSettings,
      isSearchable: true,
      title: "Leave Settings",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-leave-settings"],
      }),
    },
    {
      element: <HealthAccessHome />,
      path: appRoutes.healthAccessHome,
      isSearchable: true,
      title: "Health Access",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <HealthAccessSettings />,
      path: appRoutes.healthAccessSettings,
      isSearchable: true,
      title: "Health Access Settings",
      // hidden: !canUserAccessComponent({
      //   userPermissions,

      //   requiredPermissions: ["health-access-settings"],
      // }), //Pending: When feature is fleshed out
    },
    {
      element: <Onboarding />,
      path: appRoutes.onboarding,
      isSearchable: true,
      title: "Onboarding",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <StartOnboarding />,
      path: appRoutes.startOnBoarding().format,
      isSearchable: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-employee-onboarding"],
      }),
    },
    {
      element: <HandOver />,
      path: appRoutes.handOver,
      isSearchable: true,
      title: "HandOver",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <HandOverNewForm />,
      path: appRoutes.newHandOverForm,
      isSearchable: true,
      title: "New Handover Form",
      isPrimaryFeature: true,
      hidden: !hasSelfService,
    },
    {
      element: <HandOverDetails />,
      path: appRoutes.handOverDetails().format,
      isSearchable: true,
      title: "Handover Details",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["view-all-exit-handover-forms"],
      }),
    },
    {
      element: <HRLetters />,
      path: appRoutes.hRLetters,
      isSearchable: true,
      title: "HR Letters",
      hidden: true, //Pending when this feature is giving a go ahead or needed
    },
    {
      element: <DocumentsPage />,
      path: appRoutes.documents,
      isSearchable: true,
      title: "Files",
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-documents"],
      }),
    },
  ];
};
