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
import VehicleBookingSettings from "features/self-service/features/vehicle-booking/pages/VehicleBookingSettings";
import EmployeeHealthAccessPage from "features/self-service/features/health-access/pages/EmployeeHealthAccessPage";
import LoanRePaymentPlan from "features/self-service/features/loan/pages/LoanRePaymentPlan";
import LoanRePaymentSchedule from "features/self-service/features/loan/pages/LoanRePaymentSchedule";

// TO DO: This lazy loading might not be needed consider rethinking this, so just temporary
// const Requisition = lazy(
//   () => import("features/self-service/features/requisitions/pages/Requisition")
// );
export const selfServiceRoutes = (props: TAppPageDataFnProps): TRouteData[] => {
  const { userPermissions, licenseType, activeSubscription } = props;
  const isUserLicensed = licenseType === "licensed";
  return [
    {
      element: <SelfServiceHome />,
      path: appRoutes.selfServiceHome,
      isSearchable: true,
      title: "My Self Service",
      hidden: !isUserLicensed,
    },
    {
      element: <PayslipsTransactionsPage />,
      path: appRoutes.payslipTransactions,
      isSearchable: true,
      title: "My Payslip & Transactions",
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,
          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "payroll",
            resources: [],
          },
        }),
    },
    {
      element: <TasksPage />,
      path: appRoutes.selfServiceTasks,
      isSearchable: true,
      title: "Tasks",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
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
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
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
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },
    {
      element: <Transfers />,
      path: appRoutes.selfServiceTransfer,
      isSearchable: true,
      title: "Transfers",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
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
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },
    {
      element: <Reimbursements />,
      path: appRoutes.selfServiceReimbursement,
      isSearchable: true,
      title: "Reimbursements",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
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
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },
    {
      element: <MonetaryRequests />,
      path: appRoutes.selfServiceMonetary,
      isSearchable: true,
      title: "Monetary Requests",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
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
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },
    {
      element: <JobRequests />,
      path: appRoutes.selfServiceJob,
      isSearchable: true,
      title: "Job Requests",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
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
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },
    {
      element: <PositionChangeRequests />,
      path: appRoutes.selfServicePositionChange,
      isSearchable: true,
      title: "Position Change Requests",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
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
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },
    {
      element: <PromotionRequests />,
      path: appRoutes.selfServicePromotion,
      isSearchable: true,
      title: "Promotion Requests",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
    },
    {
      element: <TravelRequests />,
      path: appRoutes.selfServiceTravels,
      isSearchable: true,
      title: "Travel Requests",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
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
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },
    {
      element: <Assets />,
      path: appRoutes.selfServiceAssets,
      isSearchable: true,
      title: "Assets",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
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
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },

    {
      element: <AssetDetails />,
      path: appRoutes.assetDetails().format,
      isSearchable: false,
      title: "Asset Details",
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
    },
    {
      element: <LoanHome />,
      path: appRoutes.loans,
      isSearchable: true,
      title: "Loans",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "payroll",
            resources: [],
          },
        }),
    },

    {
      element: <LoanPolicies />,
      path: appRoutes.loanPolicies,
      isSearchable: true,
      title: "Loan Policies",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-loan-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: [],
        },
      }),
    },

    // start loan
    {
      element: <LoanRePaymentPlan />,
      path: appRoutes.loanPaymentPlan().format,
      isSearchable: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: [],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: [],
        },
      }),
    },
    {
      element: <LoanRePaymentSchedule />,
      path: appRoutes.loanPaymentSchedule().format,
      isSearchable: false,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: [],
        activeSubscription,
        requiredSubscriptionState: {
          label: "payroll",
          resources: [],
        },
      }),
    },
    // end loan
    {
      element: <VehicleBookingHome />,
      path: appRoutes.vehicleBooking,
      isSearchable: true,
      title: "Vehicle Booking",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
    },
    {
      element: <VehicleBookingSettings />,
      path: appRoutes.vehicleBookingSetting,
      isSearchable: true,
      title: "Vehicle Booking Setting",
      isPrimaryFeature: true,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-vehicle-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },
    {
      element: <VehicleDetails />,
      path: appRoutes.vehicleDetails().format,
      isSearchable: false,
      title: "Vehicle Details",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-vehicle-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
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
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
    },
    {
      element: <CRBHomeSettings />,
      path: appRoutes.conferenceRoomBookingSetting,
      isSearchable: true,
      title: "Conference Room Booking Setting",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-conference-room-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },
    {
      element: <LeaveHome />,
      path: appRoutes.leaveHome,
      isSearchable: true,
      title: "Leave",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
    },
    {
      element: <LeaveSettings />,
      path: appRoutes.leaveSettings,
      isSearchable: true,
      title: "Leave Settings",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-leave-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },
    {
      element: <EmployeeHealthAccessPage />,
      path: appRoutes.healthAccessDetails().format,
      isSearchable: false,
      title: "Health Access Details",
      isPrimaryFeature: false,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "employee-management",
            resources: [],
          },
        }),
    },
    {
      element: <HealthAccessHome />,
      path: appRoutes.healthAccessHome,
      isSearchable: true,
      title: "Health Access",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "hr-admin",
            resources: [],
          },
        }),
    },
    {
      element: <HealthAccessSettings />,
      path: appRoutes.healthAccessSettings,
      isSearchable: true,
      title: "Health Access Settings",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-employee-health-access"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "employee-management",
          resources: [],
        },
      }),
    },
    {
      element: <Onboarding />,
      path: appRoutes.onboarding,
      isSearchable: true,
      title: "Onboarding",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "employee-management",
            resources: [],
          },
        }),
    },
    {
      element: <StartOnboarding />,
      path: appRoutes.startOnBoarding().format,
      isSearchable: false,
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["manage-employee-onboarding"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "hr-admin",
          resources: [],
        },
      }),
    },
    {
      element: <HandOver />,
      path: appRoutes.handOver,
      isSearchable: true,
      title: "HandOver",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "employee-management",
            resources: [],
          },
        }),
    },
    {
      element: <HandOverNewForm />,
      path: appRoutes.newHandOverForm,
      isSearchable: true,
      title: "New Handover Form",
      isPrimaryFeature: true,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,

          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "employee-management",
            resources: [],
          },
        }),
    },
    {
      element: <HandOverDetails />,
      path: appRoutes.handOverDetails().format,
      isSearchable: true,
      title: "Handover Details",
      hidden: !canUserAccessComponent({
        userPermissions,

        requiredPermissions: ["view-all-exit-handover-forms"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "employee-management",
          resources: [],
        },
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
        activeSubscription,
        requiredSubscriptionState: {
          label: "employee-management",
          resources: [],
        },
      }),
    },
  ];
};
