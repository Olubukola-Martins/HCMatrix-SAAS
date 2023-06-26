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

export type TVehicleTabKey =
  | "Vehicle Overview"
  | "Vehicle List"
  | "Reminders"
  | "Settings"
  | "Approvals"
  | "My Bookings";

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
    {
      label: "Reminders",
      children: <Reminder />,
      key: "Reminders",
    },
    {
      label: "Settings",
      children: <VehicleSetting />,
      key: "Settings",
    },
    {
      label: "My Bookings",
      children: <EmployeeVehicleBooking />,
      key: "My Bookings",
    },
    {
      label: "Approvals",
      children: <VBApprovalRequestsContainer />,
      key: "Approvals",
    },
  ];
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container">
        <div className="flex flex-col gap-4">
          <PageIntro title="Vehicle Booking" link={appRoutes.selfServiceHome} />
          <Tabs
            activeKey={key}
            onChange={(val) => setKey(val as unknown as TVehicleTabKey)}
            items={tabItems.map((item) => ({
              ...item,

              children: (
                <VehicleWrapper
                  showAddVehicleAndDownlaod={
                    item.key === "My Bookings" || item.key === "Approvals"
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
