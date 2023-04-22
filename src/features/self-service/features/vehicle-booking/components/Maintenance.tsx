import VehicleMaintenanceList from "./VehicleMaintenanceList";
import { useState } from "react";
import { AddMaintenance } from "./AddMaintenance";
import { TVehicle } from "../hooks/useFetchVehicles";
import { AppButton } from "components/button/AppButton";

const Maintenance: React.FC<{ vehicle: TVehicle }> = ({ vehicle }) => {
  const [showM, setShowM] = useState(false);
  return (
    <>
      <AddMaintenance
        open={showM}
        handleClose={() => setShowM(false)}
        vehicleId={vehicle.id}
      />
      <div>
        <div className="flex items-center gap-3 justify-end">
          <div className="my-5 flex justify-end gap-3">
            <i className="ri-download-2-line text-lg"></i>
          </div>
          <AppButton label="Add New Maintenance" variant="transparent" />
        </div>
        <VehicleMaintenanceList vehicle={vehicle} />
      </div>
    </>
  );
};

export default Maintenance;
