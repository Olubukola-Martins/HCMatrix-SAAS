import React from "react";
import { RecentCard } from "components/cards/RecentCard";
import { useGetTimeSheetRecord } from "../hooks/useGetTimeSheetRecord";
import { usePagination } from "hooks/usePagination";

export const LIMIT_OF_ITEMS_TO_DISPLAY = 3;

export const TimesheetCard: React.FC<{
  handleSeeAll?: () => void;
}> = ({ handleSeeAll }) => {
  const { pagination } = usePagination({ pageSize: 4 });
  const { data, isLoading } = useGetTimeSheetRecord({ pagination });

  return (
    <RecentCard
      title="Timesheet"
      total={3}
      loading={isLoading}
      data={data?.data.map((item: any) => ({
        title: `${item?.employee?.firstName} ${item?.employee?.lastName}`,

        features: [
          {
            name: "Clocked in Time - ",
            value: `${item.clockIn.time}`,
          },
          {
            name: "Date:",
            value: `${item.date}`,
          },
          // {
          //   name: "Location:",
          //   value: `${item.location}`,
          // },
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
