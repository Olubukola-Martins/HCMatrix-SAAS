import React from "react";
import { VehicleAssigneeHistoryList } from "./VehicleAssigneeHistoryList";
import { TVehicle } from "../hooks/useFetchVehicles";

const AssigneeHistory: React.FC<{ vehicle: TVehicle }> = ({ vehicle }) => {
  return (
    <>
      <div>
        <div className="flex items-center gap-3 justify-end">
          <div className="my-5 flex justify-end gap-3">
            <i className="ri-download-2-line text-lg"></i>
          </div>
        </div>
        <VehicleAssigneeHistoryList vehicle={vehicle} />
      </div>
    </>
  );
};

export default AssigneeHistory;
