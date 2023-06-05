import React from "react";
import { useApiAuth } from "hooks/useApiAuth";
import { RecentCard } from "components/cards/RecentCard";
import { useGetAssetRequisitions } from "../../requisitions/hooks/asset/useGetAssetRequisitions";

// TO DO: Remove this export and if need be move to styles/reused
export const requestStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2";

export const LIMIT_OF_ITEMS_TO_DISPLAY = 3;

export const RecentAssetRequestsCard: React.FC<{
  handleSeeAll?: () => void;
}> = ({ handleSeeAll }) => {
  const { token, companyId } = useApiAuth();

  const { data, isLoading } = useGetAssetRequisitions({
    token,
    companyId,
    pagination: {
      limit: LIMIT_OF_ITEMS_TO_DISPLAY,
      offset: 0,
    },
  });
  return (
    <RecentCard
      title="Recent Requests"
      total={data?.total}
      loading={isLoading}
      data={data?.data.map((item) => ({
        title: `${item.employee.firstName} ${item.employee.lastName}`,
        features: [
          {
            name: "ID",
            value: `${item.id}`,
          },
          {
            name: "Asset Name",
            value: `${item.asset.name}`,
          },
        ],
        secondaryCol: {
          type: "options",
          options: [],
        },
      }))}
      handleViewMore={handleSeeAll}
    />
  );
};
