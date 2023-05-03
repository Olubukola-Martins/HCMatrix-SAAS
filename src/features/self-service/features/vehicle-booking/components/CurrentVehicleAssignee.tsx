import React from "react";
import { TVehicle } from "../hooks/useFetchVehicles";
import { Empty } from "antd";
import { AppButton } from "components/button/AppButton";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_SINGLE_VEHICLE } from "../hooks/useFetchSingleVehicle";
import { useUpdateVehicleAssigneeReturnDate } from "../hooks/useUpdateVehicleAssigneeReturnDate";

export const CurrentVehicleAssignee: React.FC<{ vehicle: TVehicle }> = ({
  vehicle,
}) => {
  const queryClient = useQueryClient();

  console.log("single veh", vehicle);

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
    <div className="bg-mainBg border rounded-lg text-sm shadow py-4 px-3">
      <h4 className="font-medium text-lg">Current Assignee</h4>
      {vehicle.assigneeId ? (
        <div className="flex gap-4 pt-7">
          <img
            src="https://res.cloudinary.com/ddvaelej7/image/upload/v1639659955/HCmatrix/User-Icon_wdkmsf.png"
            alt="user"
            className="h-12"
          />
          <div className="flex flex-col gap-4">
            <p>Name: Ruth Godwin</p>
            <p>Job Role: Marketing Manager</p>
            <p>ID: 000000</p>
            <p>Department: Sale & Marketing </p>
            <p>Location : Lagos Island</p>
            <p>Estimated Journey Time: 0hrs</p>

            <AppButton
              label="Unassign Vehicle"
              isLoading={isLoading}
              handleClick={() => handleUnassignVehicle()}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Empty
            className="mt-10"
            description="Nobody is currently assigned to this vehicle!"
          />
          {/* not in design */}
          {/* <div className="flex justify-center">
            <AppButton label="Assign Vehicle" />
          </div> */}
        </div>
      )}
    </div>
  );
};
