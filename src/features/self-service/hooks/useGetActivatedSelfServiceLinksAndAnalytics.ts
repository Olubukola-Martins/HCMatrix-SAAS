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
} => {
  const { data, isLoading, isError } = useGetSelfServiceDBAnalytics();
  const { userPermissions } = useGetUserPermissions();

  return {
    data: data
      ? {
          primaryData: [
            {
              hidden: false,
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
                ) === false,
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
                ) === false,

              item: {
                icon: leave,
                link: appRoutes.leaveHome,
                title: "Leave",
                desc: "You can apply and manage leave requests",
              },
            },

            {
              hidden: true, //Pending when its fleshed out
              item: {
                icon: health,
                link: appRoutes.healthAccessHome,
                title: "Health Access",
              },
            },
            {
              hidden: false, //Subscription
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
                ) === false,
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
                ) === false,
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
                  (item) => item.type === "asset" && item.isActive
                ) === false,
              item: {
                icon: attendance,
                link: appRoutes.selfServiceAssets,
                title: "Asset",
                desc: "You can now manage assets within your organization",
              },
            },
            {
              hidden:
                data?.settings.some(
                  (item) => item.type === "conference-room" && item.isActive
                ) === false,
              item: {
                icon: leave,
                link: appRoutes.conferenceRoomBooking,
                title: "Conference Room",
                desc: "You can now manage conference rooms within your organization",
              },
            },
            {
              hidden: false,
              item: {
                icon: payslip,
                link: appRoutes.selfServiceTasks,
                title: "Tasks",
                desc: "You can now assign and manage tasks within your organization",
              },
            },
            {
              hidden: false,
              item: {
                icon: payslip,
                link: appRoutes.documents,
                title: "Documents",
                desc: "You can now manage documents within your organization",
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
                  ) === false,
              },
              {
                link: appRoutes.selfServiceAssets,
                title: "Asset",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "asset" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServiceJob,
                title: "Job",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "job" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServicePositionChange,
                title: "Position Change",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "position-change" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServicePromotion,
                title: "Promotion",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "promotion" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServiceReimbursement,
                title: "Reimbursement",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "reimbursement" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServiceTransfer,
                title: "Transfer",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "transfer" && item.isActive
                  ) === false,
              },
              {
                link: appRoutes.selfServiceMonetary,
                title: "Monetary",
                hidden:
                  data?.settings.some(
                    (item) => item.type === "money" && item.isActive
                  ) === false,
              },
            ],
          },
          settingsData: {
            icon: requisition,
            settings: [
              {
                link: appRoutes.resignationPolicySettings,
                title: "Requisition",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-requsition-settings"],
                  userPermissions,
                }),
              },
              {
                link: appRoutes.resignationPolicySettings,
                title: "Resignation",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-resignation"],
                  userPermissions,
                }),
              },
              {
                link: appRoutes.selfServiceAssetSetting,
                title: "Asset",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-assets"],
                  userPermissions,
                }),
              },
              {
                link: appRoutes.vehicleBookingSetting,
                title: "Vehicle Booking",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-vehicle-settings"],
                  userPermissions,
                }),
              },
              {
                link: appRoutes.conferenceRoomBookingSetting,
                title: "Conference Room",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-conference-room-settings"],
                  userPermissions,
                }),
              },
              {
                link: appRoutes.leaveSettings,
                title: "Leave",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-leave-settings"],
                  userPermissions,
                }),
              },
              {
                link: appRoutes.loanPolicies,
                title: "Loan",
                hidden: !canUserAccessComponent({
                  requiredPermissions: ["manage-loan-settings"],
                  userPermissions,
                }),
              },
            ],
          },
          selfServiceDBAnalytics: data,
        }
      : undefined,
    isLoading,
    isError,
  };
};
