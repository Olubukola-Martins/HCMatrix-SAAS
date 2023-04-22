import React, { ReactNode, useState } from "react";
import { AddSingleVehicle } from "./AddSingleVehicle";
import { AppButton } from "components/button/AppButton";

export const VehicleWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showM, setShowM] = useState(false);
  return (
    <>
      <AddSingleVehicle open={showM} handleClose={() => setShowM(false)} />
      <div className="flex flex-col gap-4">
        <div className="flex items-end gap-3 justify-end">
          {/* download */}
          <i className="ri-download-2-line text-xl"></i>
          <AppButton label="Add Vehicle" handleClick={() => setShowM(true)} />
        </div>
        <>{children}</>
      </div>
    </>
  );
};
