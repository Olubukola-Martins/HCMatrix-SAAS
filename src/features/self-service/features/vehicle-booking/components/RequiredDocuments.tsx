import { useState } from "react";
import { TVehicle } from "../hooks/useFetchVehicles";
import { VehicleDocumentList } from "./VehicleDocumentList";
import { AddVehicleDocument } from "./AddVehicleDocument";
import { AppButton } from "components/button/AppButton";

export const RequiredDocuments: React.FC<{ vehicle: TVehicle }> = ({
  vehicle,
}) => {
  const [showM, setShowM] = useState(false);
  return (
    <>
      <AddVehicleDocument
        open={showM}
        handleClose={() => setShowM(false)}
        vehicleId={vehicle.id}
      />
      <div>
        <div className="flex items-center gap-3 justify-end">
          <div className="my-5 flex justify-end gap-3">
            <i className="ri-download-2-line text-lg"></i>
          </div>
          <AppButton label="Add New Repair" variant="transparent" />
        </div>
        <VehicleDocumentList vehicle={vehicle} />
      </div>
    </>
  );
};
