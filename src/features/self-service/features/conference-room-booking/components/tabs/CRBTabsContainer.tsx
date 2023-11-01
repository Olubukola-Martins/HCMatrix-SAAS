import { Tabs } from "antd";
import { EmployeeCRBBookings } from "../bookings/EmployeeCRBBookings";
import { CRBApprovalRequestsContainer } from "../CRBApprovalRequestsContainer";
import CRBHistoryContainer from "../CRBHistoryContainer";
import { AvailableConferenceRooms } from "../conference-rooms/AvailableConferenceRooms";
import { AllConferenceRooms } from "../conference-rooms/AllConferenceRooms";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

const CRBTabsContainer = () => {
  const { userPermissions } = useGetUserPermissions();
  const tabItems = [
    {
      key: "My Bookings",
      label: "My Bookings",
      children: <EmployeeCRBBookings />,
    },
    {
      key: "My Approvals",
      label: "My Approvals",
      children: <CRBApprovalRequestsContainer />,
    },
    {
      key: "Available Rooms",
      label: "Available Rooms",
      children: <AvailableConferenceRooms />,
    },
    {
      key: "All Bookings",
      label: "All Bookings",
      children: <CRBHistoryContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-conference-room-bookings"],
      }),
    },
    {
      key: "All Conference Rooms",
      label: "All Conference Rooms",
      children: <AllConferenceRooms />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-conference-room"],
      }),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Tabs items={tabItems} />
    </div>
  );
};

export default CRBTabsContainer;
