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

const VehicleBookingHome = () => {
  const tabItems = [
    {
      label: "Vehicle Overview",
      children: <VehicleOverview />,
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
