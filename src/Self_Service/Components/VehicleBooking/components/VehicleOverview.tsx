import { RecentVehicleRequestsCard } from "./RecentVehicleRequestsCard";
import { RecentlyAddedVehiclesCard } from "./RecentlyAddedVehiclesCard";
import { VehiclesByStatusCard } from "./VehiclesByStatusCard";
import { VehicleRemindersCard } from "./VehicleRemindersCard";
import { VehicleMonthlyInsightsCard } from "./VehicleMonthlyInsightsCard";
import { VehicleTypeCardList } from "./VehicleTypeCardList";

const VehicleOverview = () => {
  return (
    <div>
      <VehicleTypeCardList />

      {/* second layer */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 mt-5">
        <VehicleMonthlyInsightsCard />

        <RecentVehicleRequestsCard />
      </div>

      {/* Third layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28 mt-7">
        <VehiclesByStatusCard />

        <VehicleRemindersCard />

        <RecentlyAddedVehiclesCard />
      </div>
    </div>
  );
};

export default VehicleOverview;
