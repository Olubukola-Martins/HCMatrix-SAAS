import React from "react";
import { SimpleCard } from "components/cards/SimpleCard";
import { TVehicleInUse } from "../types";

interface IProps {
  data?: TVehicleInUse;
}

export const VehicleAssignedToEmployee: React.FC<IProps> = ({ data }) => {
  const title = data
    ? `Vehicle in Use: ${data?.color ? data.color : ""} ${data.model} ${
        data.brand
      }  ${data.type} `
    : "No Vehicle is currently assigned to you!";
  return (
    <SimpleCard
      title={title}
      highlight={`${data?.plateNumber}`}
      center
      action={{
        label: "Return",
        variant: "style-with-class",
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
      }}
    />
  );
};
