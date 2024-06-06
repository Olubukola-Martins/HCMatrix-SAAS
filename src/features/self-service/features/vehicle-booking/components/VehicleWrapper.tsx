import React, { ReactNode, useState } from "react";
import { AddSingleVehicle } from "./AddSingleVehicle";
import { AppButton } from "components/button/AppButton";
import { ImportVehicles } from "./bulk/ImportVehicles";
import ExportVehicles from "./export/ExportVehicles";

type TAction = "import" | "add";
export const VehicleWrapper: React.FC<{
  children: ReactNode;
  showAddVehicleAndDownlaod?: boolean;
}> = ({ children, showAddVehicleAndDownlaod = true }) => {
  const [action, setAction] = useState<TAction>();
  return (
    <>
      <AddSingleVehicle
        open={action === "add"}
        handleClose={() => setAction(undefined)}
      />
      <ImportVehicles
        open={action === "import"}
        handleClose={() => setAction(undefined)}
      />
      <div className="flex flex-col gap-4">
        {showAddVehicleAndDownlaod && (
          <div className="flex justify-between">
            {/* download */}
            <ExportVehicles />
            <div className="flex items-end gap-4 justify-end">
              <AppButton
                label="Add Vehicle"
                handleClick={() => setAction("add")}
              />
              <AppButton
                label="Import Vehicles"
                variant="transparent"
                handleClick={() => setAction("import")}
              />
            </div>
          </div>
        )}
        <>{children}</>
      </div>
    </>
  );
};
