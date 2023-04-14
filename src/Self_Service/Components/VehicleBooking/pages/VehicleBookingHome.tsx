import DashboardLayout from "Layout/DashboardLayout";
import Reminder from "../components/Reminder";
import VehicleList from "../components/VehicleList";
import VehicleOverview from "../components/VehicleOverview";
import { PageIntro } from "Layout/Components/PageIntro";
import { appRoutes } from "AppRoutes";
import { Tabs } from "antd";
import { VehicleWrapper } from "../components/VehicleWrapper";

const VehicleBookingHome = () => {
  const tabItems = [
    {
      label: "Vehicle Overview",
      children: <VehicleOverview />,
      key: "1",
    },
    {
      label: "Vehicle List",
      children: <VehicleList />,
      key: "2",
    },
    {
      label: "Reminders",
      children: <Reminder />,
      key: "3",
    },
  ];
  return (
    <DashboardLayout>
      <div className="Container">
        <div className="flex flex-col gap-4">
          <PageIntro title="Vehicle Booking" link={appRoutes.selfServiceHome} />
          <Tabs
            items={tabItems.map((item) => ({
              ...item,
              children: <VehicleWrapper>{item.children}</VehicleWrapper>,
            }))}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VehicleBookingHome;
