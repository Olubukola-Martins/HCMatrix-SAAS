import React from "react";
import { RecentCard } from "components/cards/RecentCard";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

// TO DO: Remove this export and if need be move to styles/reused
export const requestStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2";

export const LIMIT_OF_ITEMS_TO_DISPLAY = 3;

export const RecentLoanRequestsCard: React.FC<{
  handleSeeAll?: () => void;
}> = ({ handleSeeAll }) => {
  const { data, isLoading } = useFetchApprovalRequests({
    type: "loan",
    pagination: {
      limit: LIMIT_OF_ITEMS_TO_DISPLAY,
      offset: 0,
    },
  });
  return (
    <RecentCard
      title="Recent Approval Requests"
      total={data?.total}
      loading={isLoading}
      data={data?.data.map((item) => ({
        title: `${getEmployeeFullName(item.loan?.employee)}`,
        features: [
          {
            name: "ID",
            value: `${item.id}`,
          },
          {
            name: "Loan Type",
            value: `${item.loan?.type.name}`,
          },
          {
            name: "Amount",
            value: `${item.loan?.amount}`,
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
