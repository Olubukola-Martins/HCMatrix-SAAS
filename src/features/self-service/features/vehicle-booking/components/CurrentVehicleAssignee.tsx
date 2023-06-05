import React from "react";
import { TVehicle } from "../hooks/useFetchVehicles";

import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_SINGLE_VEHICLE } from "../hooks/useFetchSingleVehicle";
import { useUpdateVehicleAssigneeReturnDate } from "../hooks/useUpdateVehicleAssigneeReturnDate";
import { AssigneeCard } from "components/cards/AssigneeCard";

export const CurrentVehicleAssignee: React.FC<{ vehicle: TVehicle }> = ({
  vehicle,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useUpdateVehicleAssigneeReturnDate();

  const handleUnassignVehicle = () => {
    if (vehicle.assigneeId) {
      const currentDate = new Date();
      mutate(
        {
          assigneeId: vehicle.assigneeId,
          vehicleId: vehicle.id,
          data: {
            dateReturned: currentDate.toDateString(),
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_VEHICLE],
              // exact: true,
            });
          },
        }
      );
    }
  };
  return (
    <AssigneeCard
      data={{
        empUid: `${vehicle.assignee?.empUid}`,
        department: `N?A`,
        name: `${vehicle.assignee?.firstName} ${vehicle.assignee?.lastName}`,
      }}
      isAssigned={!!vehicle.assigneeId}
      handleAssign={{ loading: isLoading, fn: handleUnassignVehicle }}
      handleUnAssign={{ loading: isLoading, fn: handleUnassignVehicle }}
    />
  );
};
