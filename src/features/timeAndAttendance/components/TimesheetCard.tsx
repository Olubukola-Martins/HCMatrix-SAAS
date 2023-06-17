import React from "react";
// import { useApiAuth } from "hooks/useApiAuth";
import { RecentCard } from "components/cards/RecentCard";

// TO DO: Remove this export and if need be move to styles/reused
export const requestStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2";

export const LIMIT_OF_ITEMS_TO_DISPLAY = 3;

export const TimesheetCard: React.FC<{
  handleSeeAll?: () => void;
}> = ({ handleSeeAll }) => {
//   const { token, companyId } = useApiAuth();


  return (
    <RecentCard
      title="Timesheet"
      total={3}
    //   loading={isLoading}
      data={[].map((item: any) => ({
        title: `${item.employee.firstName} ${item.employee.lastName}`,
        
        features: [
          {
            name: "Clocked in Time - ",
            value: `${item.time}`,
          },
          {
            name: "Date:",
            value: `${item.date}`,
          },
          {
            name: "Location:",
            value: `${item.location}`,
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
