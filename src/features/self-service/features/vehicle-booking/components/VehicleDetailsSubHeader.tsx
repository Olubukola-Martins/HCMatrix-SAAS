import React, { useState } from "react";
import { TVehicle } from "../hooks/useFetchVehicles";
import { EditSingleVehicle } from "./EditSingleVehicle";
import PageSubHeader from "components/layout/PageSubHeader";
import { DeleteVehicle } from "./vehicle/DeleteVehicle";

type TAction = "edit" | "delete";
export const VehicleDetailsSubHeader: React.FC<{ vehicle: TVehicle }> = ({
  vehicle,
}) => {
  const [action, setAction] = useState<TAction>();

  return (
    <div>
      <EditSingleVehicle
        vehicle={vehicle}
        handleClose={() => setAction(undefined)}
        open={action === "edit"}
      />
      <DeleteVehicle
        vehicle={vehicle}
        handleClose={() => setAction(undefined)}
        open={action === "delete"}
      />

      <PageSubHeader
        description={{ content: vehicle.brand, className: "text-lg" }}
        hideBackground
        actions={[
          {
            name: "Edit",
            handleClick: () => {
              setAction("edit");
            },
          },
          {
            name: "Delete",
            handleClick: () => {
              setAction("delete");
            },

            btnVariant: "transparent",
          },
        ]}
      />
    </div>
  );
};
