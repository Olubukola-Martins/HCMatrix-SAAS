import Reminder from "../components/Reminder";
import VehicleList from "../components/VehicleList";
import VehicleOverview from "../components/VehicleOverview";
import { Tabs } from "antd";
import { VehicleWrapper } from "../components/VehicleWrapper";
import { EmployeeVehicleBooking } from "../components/EmployeeVehicleBooking";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { VBApprovalRequestsContainer } from "../components/VBApprovalRequestsContainer";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { useState } from "react";
import { AllVehicleBookingHistory } from "../components/booking/AllVehicleBookingHistory";
import { AllEmployeeVehicleAssigneeHistory } from "../components/assignee-history/AllEmployeeVehicleAssigneeHistory";
import PageSubHeader from "components/layout/PageSubHeader";
import { useNavigate } from "react-router-dom";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

export type TVehicleTabKey =
  | "Vehicle Overview"
  | "Vehicle List"
  | "Reminders"
  | "Settings"
  | "My Approvals"
  | "My Bookings"
  | "Assignee History"
  | "All Bookings";

const VehicleBookingHome = () => {
  const [key, setKey] = useState<TVehicleTabKey>("Vehicle Overview");
  const handleTabKey = (val: TVehicleTabKey) => {
    setKey(val);
  };
  const { userPermissions } = useGetUserPermissions();
  const tabItems: {
    label: TVehicleTabKey;
    key: TVehicleTabKey;
    children: React.ReactNode;
    hidden: boolean;
  }[] = [
    {
      label: "Vehicle Overview",
      children: <VehicleOverview handleTabKey={handleTabKey} />,
      key: "Vehicle Overview",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-vehicle-overview"],
      }),
    },
    {
      label: "Vehicle List",
      children: <VehicleList />,
      key: "Vehicle List",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-vehicles"],
      }),
    },
    // TODO: Removed until properly fleshed out
    // {
    //   label: "Reminders",
    //   children: <Reminder />,
    //   key: "Reminders",
    // },

    {
      label: "My Bookings",
      children: <EmployeeVehicleBooking />,
      key: "My Bookings",
      hidden: false,
    },
    {
      label: "All Bookings",
      children: <AllVehicleBookingHistory />,
      key: "All Bookings",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-vehicle-bookings"],
      }),
    },
    {
      // TODO: Add Search for this below
      label: "Assignee History",
      children: <AllEmployeeVehicleAssigneeHistory />,
      key: "Assignee History",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-vehicle-bookings"],
      }),
    },
    {
      label: "My Approvals",
      children: <VBApprovalRequestsContainer />,
      key: "My Approvals",
      hidden: false,
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container">
        <div className="flex flex-col gap-4">
          <PageIntro title="Vehicle Booking" link={appRoutes.selfServiceHome} />
          <PageSubHeader
            description={`You can now manage vehicles and bookings`}
            actions={[
              {
                name: "Setting",
                handleClick: () => navigate(appRoutes.vehicleBookingSetting),
                btnVariant: "transparent",
                hidden: !canUserAccessComponent({
                  userPermissions,
                  requiredPermissions: ["manage-vehicle-settings"],
                }),
              },
            ]}
          />
          <Tabs
            activeKey={key}
            onChange={(val) => setKey(val as unknown as TVehicleTabKey)}
            items={tabItems.map((item) => ({
              ...item,

              children: (
                <VehicleWrapper
                  showAddVehicleAndDownlaod={
                    item.key === "My Bookings" ||
                    item.key === "My Approvals" ||
                    item.key === "All Bookings" ||
                    item.key === "Assignee History"
                      ? false
                      : true
                  }
                >
                  {item.children}
                </VehicleWrapper>
              ),
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default VehicleBookingHome;
