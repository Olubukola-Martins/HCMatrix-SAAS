import Button from "GeneralComps/Button";
import React, { ReactNode, useState } from "react";
import { AddSingleVehicle } from "./AddSingleVehicle";

export const VehicleWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showM, setShowM] = useState(false);
  return (
    <>
      <AddSingleVehicle open={showM} handleClose={() => setShowM(false)} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Button label="Add Vehicle" handleClick={() => setShowM(true)} />
        </div>
        <>{children}</>
      </div>
    </>
  );
};
