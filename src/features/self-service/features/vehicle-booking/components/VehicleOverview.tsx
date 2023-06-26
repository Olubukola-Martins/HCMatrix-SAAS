import { RecentVehicleRequestsCard } from "./RecentVehicleRequestsCard";
import { RecentlyAddedVehiclesCard } from "./RecentlyAddedVehiclesCard";
import { VehiclesByStatusCard } from "./VehiclesByStatusCard";
import { VehicleRemindersCard } from "./VehicleRemindersCard";
import { VehicleMonthlyInsightsCard } from "./VehicleMonthlyInsightsCard";
import { VehicleTypeCardList } from "./VehicleTypeCardList";
import { TVehicleTabKey } from "../pages/VehicleBookingHome";

interface IProps {
  handleTabKey: (val: TVehicleTabKey) => void;
}

const VehicleOverview: React.FC<IProps> = ({ handleTabKey }) => {
  return (
    <div>
      <VehicleTypeCardList />

      {/* second layer */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 mt-5">
        <VehicleMonthlyInsightsCard />

        <RecentVehicleRequestsCard
          handleSeeAll={() => handleTabKey("My Bookings")}
        />
      </div>

      {/* Third layer */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 mt-7">
        <div className="col-span-3 flex flex-col lg:flex-row gap-5 w-full">
          <div className="flex-1">
            <VehiclesByStatusCard />
          </div>
          <div className="flex-1">
            <VehicleRemindersCard />
          </div>
        </div>

        <RecentlyAddedVehiclesCard
          handleSeeAll={() => handleTabKey("Vehicle List")}
        />
      </div>
    </div>
  );
};

export default VehicleOverview;
