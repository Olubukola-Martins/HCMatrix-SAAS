import React from "react";
import { SimpleCard } from "components/cards/SimpleCard";

interface IProps {
  employeeId: number;
}

export const VehicleAssignedToEmployee: React.FC<IProps> = ({ employeeId }) => {
  //  TO DO: endpoint needed to retrieve vehicle assigned to the employee
  return (
    <SimpleCard
      title={`Vehicle in Use: Dynamic`}
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
