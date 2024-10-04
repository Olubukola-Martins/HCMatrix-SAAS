import {
  ISelfBoxProps,
  TRequisitionBoxProps,
  TSelfServiceSettingBoxProps,
} from "../components/SelfBox";
import { useGetSelfServiceDBAnalytics } from "./useGetSelfServiceDashboardAnalytics";
import loan from "../assets/images/loan.svg";
import leave from "../assets/images/leave.svg";
import health from "../assets/images/health.svg";
import payslip from "../assets/images/payslip.svg";
import attendance from "../assets/images/attendance.svg";
import vehicle from "../assets/images/vehicle.svg";
import requisition from "../assets/images/requisition.svg";
import Onboarding from "../assets/images/Onboarding.svg";
import { appRoutes } from "config/router/paths";
import { TSelfServiceDBAnalytics } from "../types";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
type TData = {
  primaryData: ({ item: ISelfBoxProps } & { hidden: boolean })[];
  requisitionData: TRequisitionBoxProps;
  settingsData: TSelfServiceSettingBoxProps;
  selfServiceDBAnalytics: TSelfServiceDBAnalytics;
};
export const useGetActivatedSelfServiceLinksAndAnalytics = (): {
  data?: TData;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
} => {
  const { data, isLoading, isError, error } = useGetSelfServiceDBAnalytics();
  const { userPermissions, companyActiveSubscription: activeSubscription } =
    useGetUserPermissions();

  return {
    data: data
      ? {
          primaryData: [
            {
              hidden: !canUserAccessComponent({
                requiredPermissions: [],
                userPermissions,
                activeSubscription,
                requiredSubscriptionState: {
                  label: "employee-management",
                  resources: [],
                },
              }),
              item: {
                icon: Onboarding,
                link: appRoutes.onboarding,
                title: "Onboarding",
                desc: "You can now access and manage onboarding",
              },
            },
            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "loan" && item.isActive
                ) === false &&
                !canUserAccessComponent({
                  requiredPermissions: [],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "payroll",
                    resources: [],
                  },
                }),
              item: {
                icon: loan,
                link: appRoutes.loans,
                title: "Loan",
                desc: "You can apply and manage loan requests",
              },
            },

            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "leave" && item.isActive
                ) === false &&
                !canUserAccessComponent({
                  requiredPermissions: [],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "core-hr",
                    resources: [],
                  },
                }),

              item: {
                icon: leave,
                link: appRoutes.leaveHome,
                title: "Leave",
                desc: "You can apply and manage leave requests",
              },
            },

            {
              hidden: !canUserAccessComponent({
                requiredPermissions: [],
                userPermissions,
                activeSubscription,
                requiredSubscriptionState: {
                  label: "employee-management",
                  resources: [],
                },
              }),
              item: {
                icon: health,
                link: appRoutes.healthAccessHome,
                title: "Health Access",
                desc: "You can now access and manage hmo plans and hospitals!",
              },
            },
            {
              hidden: !canUserAccessComponent({
                userPermissions,
                requiredPermissions: [],
                activeSubscription,
                requiredSubscriptionState: {
                  label: "payroll",
                  resources: [],
                },
              }),
              item: {
                icon: payslip,
                link: appRoutes.payslipTransactions,
                title: "Payslip",
                desc: "You can view payslips and transactions",
              },
            },
            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "exit-handover-form" && item.isActive
                ) === false &&
                !canUserAccessComponent({
                  requiredPermissions: [],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "employee-management",
                    resources: [],
                  },
                }),
              item: {
                icon: attendance,
                link: appRoutes.newHandOverForm,
                title: "Hand Over",
                desc: "You can now access and manage employee resignations",
              },
            },
            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "vehicle" && item.isActive
                ) === false &&
                !canUserAccessComponent({
                  requiredPermissions: [],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "core-hr",
                    resources: [],
                  },
                }),
              item: {
                icon: vehicle,
                link: appRoutes.vehicleBooking,
                title: "Vehicle booking",
                desc: "You can now manage vehicles and their bookings",
              },
            },

            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "conference-room" && item.isActive
                ) === false &&
                !canUserAccessComponent({
                  requiredPermissions: [],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "core-hr",
                    resources: [],
                  },
                }),
              item: {
                icon: leave,
                link: appRoutes.conferenceRoomBooking,
                title: "Conference Room",
                desc: "You can now manage conference rooms within your organization",
              },
            },
            {
              hidden: !canUserAccessComponent({
                requiredPermissions: [],
                userPermissions,
                activeSubscription,
                requiredSubscriptionState: {
                  label: "core-hr",
                  resources: [],
                },
              }),
              item: {
                icon: payslip,
                link: appRoutes.selfServiceTasks,
                title: "Tasks",
                desc: "You can now assign and manage tasks within your organization",
              },
            },
            {
              hidden: !canUserAccessComponent({
                userPermissions,
                requiredPermissions: ["manage-documents"],
                activeSubscription,
                requiredSubscriptionState: {
                  label: "employee-management",
                  resources: [],
                },
              }),
              item: {
                icon: payslip,
                link: appRoutes.documents,
                title: "Documents",
                desc: "You can now manage documents within your organization",
              },
            },
            {
              hidden: !canUserAccessComponent({
                requiredPermissions: [],
                userPermissions,
                activeSubscription,
                requiredSubscriptionState: {
                  label: "employee-management",
                  resources: [],
                },
              }),
              item: {
                icon: health, //TODO: Update the icon to what is on figma
                link: appRoutes.profileEditHome,
                title: "Profile Edit Request",
                desc: "You can now request to edit your profile!",
              },
            },
          ],
          requisitionData: {
            icon: requisition,
            requisitions: [
              {
                link: appRoutes.selfServiceTravels,
                title: "Travel",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "travel" && item.isActive
                  ) === false &&
                  !canUserAccessComponent({
                    requiredPermissions: [],
                    userPermissions,
                    activeSubscription,
                    requiredSubscriptionState: {
                      label: "core-hr",
                      resources: [],
                    },
                  }),
              },
              {
                link: appRoutes.selfServiceAssets,
                title: "Asset",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "asset" && item.isActive
                  ) === false &&
                  !canUserAccessComponent({
                    requiredPermissions: [],
                    userPermissions,
                    activeSubscription,
                    requiredSubscriptionState: {
                      label: "core-hr",
                      resources: [],
                    },
                  }),
              },
              {
                link: appRoutes.selfServiceJob,
                title: "Job",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "job" && item.isActive
                  ) === false &&
                  !canUserAccessComponent({
                    requiredPermissions: [],
                    userPermissions,
                    activeSubscription,
                    requiredSubscriptionState: {
                      label: "core-hr",
                      resources: [],
                    },
                  }),
              },
              {
                link: appRoutes.selfServicePositionChange,
                title: "Position Change",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "position-change" && item.isActive
                  ) === false &&
                  !canUserAccessComponent({
                    requiredPermissions: [],
                    userPermissions,
                    activeSubscription,
                    requiredSubscriptionState: {
                      label: "core-hr",
                      resources: [],
                    },
                  }),
              },
              {
                link: appRoutes.selfServicePromotion,
                title: "Promotion",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "promotion" && item.isActive
                  ) === false &&
                  !canUserAccessComponent({
                    requiredPermissions: [],
                    userPermissions,
                    activeSubscription,
                    requiredSubscriptionState: {
                      label: "core-hr",
                      resources: [],
                    },
                  }),
              },
              {
                link: appRoutes.selfServiceReimbursement,
                title: "Reimbursement",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "reimbursement" && item.isActive
                  ) === false &&
                  !canUserAccessComponent({
                    requiredPermissions: [],
                    userPermissions,
                    activeSubscription,
                    requiredSubscriptionState: {
                      label: "core-hr",
                      resources: [],
                    },
                  }),
              },
              {
                link: appRoutes.selfServiceTransfer,
                title: "Transfer",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "transfer" && item.isActive
                  ) === false &&
                  !canUserAccessComponent({
                    requiredPermissions: [],
                    userPermissions,
                    activeSubscription,
                    requiredSubscriptionState: {
                      label: "core-hr",
                      resources: [],
                    },
                  }),
              },
              {
                link: appRoutes.selfServiceMonetary,
                title: "Monetary",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "money" && item.isActive
                  ) === false &&
                  !canUserAccessComponent({
                    requiredPermissions: [],
                    userPermissions,
                    activeSubscription,
                    requiredSubscriptionState: {
                      label: "core-hr",
                      resources: [],
                    },
                  }),
              },
            ],
          },
          settingsData: {
            icon: requisition,
            settings: [
              {
                link: appRoutes.selfServiceRequisition,
                title: "Requisition",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-requsition-settings"],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "core-hr",
                    resources: [],
                  },
                }),
              },
              {
                link: appRoutes.resignationPolicySettings,
                title: "Resignation",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-resignation"],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "core-hr",
                    resources: [],
                  },
                }),
              },
              {
                link: appRoutes.selfServiceAssetSetting,
                title: "Asset",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-assets"],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "core-hr",
                    resources: [],
                  },
                }),
              },
              {
                link: appRoutes.vehicleBookingSetting,
                title: "Vehicle Booking",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-vehicle-settings"],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "core-hr",
                    resources: [],
                  },
                }),
              },
              {
                link: appRoutes.conferenceRoomBookingSetting,
                title: "Conference Room",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-conference-room-settings"],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "core-hr",
                    resources: [],
                  },
                }),
              },
              {
                link: appRoutes.leaveSettings,
                title: "Leave",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-leave-settings"],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "core-hr",
                    resources: [],
                  },
                }),
              },
              {
                link: appRoutes.loanPolicies,
                title: "Loan",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-loan-settings"],
                  userPermissions,
                  activeSubscription,
                  requiredSubscriptionState: {
                    label: "core-hr",
                    resources: [],
                  },
                }),
              },
            ],
          },
          selfServiceDBAnalytics: data,
        }
      : undefined,
    isLoading,
    isError,
    error,
  };
};
