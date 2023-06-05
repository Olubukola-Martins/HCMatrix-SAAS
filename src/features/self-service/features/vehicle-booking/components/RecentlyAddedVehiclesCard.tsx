import React from "react";
import { LIMIT_OF_ITEMS_TO_DISPLAY } from "./RecentVehicleRequestsCard";
import { useFetchVehicles } from "../hooks/useFetchVehicles";
import moment from "moment";
import { useApiAuth } from "hooks/useApiAuth";
import { RecentCard } from "components/cards/RecentCard";

export const RecentlyAddedVehiclesCard: React.FC<{
  handleSeeAll?: () => void;
}> = ({ handleSeeAll }) => {
  const { token, companyId } = useApiAuth();

  const { data, isLoading } = useFetchVehicles({
    token,
    companyId,
    pagination: {
      limit: LIMIT_OF_ITEMS_TO_DISPLAY,
      offset: 0,
    },
  });
  return (
    <RecentCard
      title="Recently Added Vehicles"
      total={data?.total}
      loading={isLoading}
      secondaryColTitle="Date"
      data={data?.data.map((item) => ({
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
