import Reminder from "../components/Reminder";
import VehicleList from "../components/VehicleList";
import VehicleOverview from "../components/VehicleOverview";
import { Tabs } from "antd";
import { VehicleWrapper } from "../components/VehicleWrapper";
import { EmployeeVehicleBooking } from "../components/EmployeeVehicleBooking";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { VehicleSetting } from "../components/VehicleSetting";
import { VBApprovalRequestsContainer } from "../components/VBApprovalRequestsContainer";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { useState } from "react";
import { AllVehicleBookingHistory } from "../components/booking/AllVehicleBookingHistory";
import { AllEmployeeVehicleAssigneeHistory } from "../components/assignee-history/AllEmployeeVehicleAssigneeHistory";
import PageSubHeader from "components/layout/PageSubHeader";
import { useNavigate } from "react-router-dom";

export type TVehicleTabKey =
  | "Vehicle Overview"
  | "Vehicle List"
  | "Reminders"
  | "Settings"
  | "Approvals"
  | "My Bookings"
  | "Assignee History"
  | "All Bookings";

const VehicleBookingHome = () => {
  const [key, setKey] = useState<TVehicleTabKey>("Vehicle Overview");
  const handleTabKey = (val: TVehicleTabKey) => {
    setKey(val);
  };
  const tabItems: {
    label: TVehicleTabKey;
    key: TVehicleTabKey;
    children: React.ReactNode;
  }[] = [
    {
      label: "Vehicle Overview",
      children: <VehicleOverview handleTabKey={handleTabKey} />,
      key: "Vehicle Overview",
    },
    {
      label: "Vehicle List",
      children: <VehicleList />,
      key: "Vehicle List",
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
    },
    {
      label: "All Bookings",
      children: <AllVehicleBookingHistory />,
      key: "All Bookings",
    },
    {
      // TODO: Add Search for this below
      label: "Assignee History",
      children: <AllEmployeeVehicleAssigneeHistory />,
      key: "Assignee History",
    },
    {
      label: "Approvals",
      children: <VBApprovalRequestsContainer />,
      key: "Approvals",
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
                    item.key === "Approvals" ||
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
