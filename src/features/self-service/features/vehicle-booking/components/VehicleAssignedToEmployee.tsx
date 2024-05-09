import React, { useState } from "react";
import { SimpleCard } from "components/cards/SimpleCard";
import { TVehicleInUse } from "../types";
import { generateVehicleName } from "../utils/generateVehicleName";
import { ReturnVehicle } from "./ReturnVehicle";

interface IProps {
  data?: TVehicleInUse;
}

export const VehicleAssignedToEmployee: React.FC<IProps> = ({ data }) => {
  const title = data
    ? `Vehicle in Use:  ${generateVehicleName(data)}`
    : "No Vehicle is currently assigned to you!";

  const [open, setOpen] = useState(false);

  return (
    <>
      <ReturnVehicle
        open={open}
        handleClose={() => setOpen(false)}
        data={data}
      />
      <SimpleCard
        title={title}
        highlight={`${data?.plateNumber ?? ""}`}
        center
        action={
          data
            ? {
                label: "Return",
                variant: "style-with-class",
                handleClick: () => setOpen(true),
                additionalClassNames: [
                  "border",
                  "border-green-400",
                  " hover:border-slate-800 hover:text-slate-800",
                  "rounded",
                  "font-medium",
                  "bg-transparent",
                  "transition",
                  "ease-in-out",
                  "duration-500",
                  "text-sm text-green-400",
                  "tracking-wider",
                  "px-3 py-1",
                ],
              }
            : undefined
        }
      />
    </>
  );
};
