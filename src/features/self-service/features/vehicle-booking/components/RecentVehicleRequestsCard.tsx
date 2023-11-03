import React, { useState } from "react";
import { useFetchVehicleBookings } from "../hooks/useFetchVehicleBookings";
import { useApiAuth } from "hooks/useApiAuth";
import { RecentCard } from "components/cards/RecentCard";
import { ViewVehicleBooking } from "./ViewVehicleBooking";

// TO DO: Remove this export and if need be move to styles/reused
export const requestStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2";

export const LIMIT_OF_ITEMS_TO_DISPLAY = 4;

export const RecentVehicleRequestsCard: React.FC<{
  handleSeeAll?: () => void;
}> = ({ handleSeeAll }) => {
  const { token, companyId } = useApiAuth();

  const { data, isLoading } = useFetchVehicleBookings({
    token,
    companyId,
    pagination: {
      limit: LIMIT_OF_ITEMS_TO_DISPLAY,
      offset: 0,
    },
  });
  const [requestId, setRequestId] = useState<number>();
  const [action, setAction] = useState<"view">();
  return (
    <>
      {requestId && (
        <ViewVehicleBooking
          bookingId={requestId}
          open={action === "view"}
          handleClose={() => setAction(undefined)}
        />
      )}
      <RecentCard
        title="Recent Bookings"
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
              name: "Vehicle Name",
              value: `${item.vehicle.model} (${item.vehicle.brand})`,
            },
            {
              name: "Duration",
              value: `${item.duration} hrs`,
            },
          ],
          secondaryCol: {
            type: "options",
            options: [
              {
                name: "View",
                onClick: () => {
                  setAction("view");
                  setRequestId(item.id);
                },
              },
            ],
          },
        }))}
        handleViewMore={handleSeeAll}
      />
    </>
  );
};
