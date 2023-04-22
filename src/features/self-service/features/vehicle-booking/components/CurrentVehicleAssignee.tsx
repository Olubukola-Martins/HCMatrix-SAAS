import React from "react";
import { TVehicle } from "../hooks/useFetchVehicles";
import { Empty } from "antd";
import { AppButton } from "components/button/AppButton";

export const CurrentVehicleAssignee: React.FC<{ vehicle: TVehicle }> = ({
  vehicle,
}) => {
  return (
    <div className="bg-mainBg border rounded-lg text-sm shadow py-4 px-3">
      <h4 className="font-medium text-lg">Current Assignee</h4>
      {vehicle.assignee ? (
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

            <button className="button">Unassign</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Empty
            className="mt-10"
            description="Nobody is currently assigned to this vehicle!"
          />
          <div className="flex justify-center">
            <AppButton label="Assign Vehicle" />
          </div>
        </div>
      )}
    </div>
  );
};
