import React from "react";

import moment from "moment";
import { RecentCard } from "components/cards/RecentCard";
import { useGetVehicleOverviewAnalytics } from "../hooks/useGetVehicleOverviewAnalytics";

export const RecentlyAddedVehiclesCard: React.FC<{
  handleSeeAll?: () => void;
}> = ({ handleSeeAll }) => {
  const { data, isLoading } = useGetVehicleOverviewAnalytics();

  return (
    <RecentCard
      title="Recently Added Vehicles"
      loading={isLoading}
      total={data?.recentlyAddedVehicles.length} //might not be needed cos this might not be total count when using analytics endpoint
      secondaryColTitle="Date"
      data={data?.recentlyAddedVehicles.map((item) => ({
        title: `${item.brand} ${item.model}`,
        secondaryCol: {
          type: "text",
          text: moment(item.createdAt).format("YYYY/MM/DD"),
        },
      }))}
      handleViewMore={handleSeeAll}
    />
  );
};
