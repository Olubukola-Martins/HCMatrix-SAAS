import React from "react";
import { TVehicleDocument } from "../hooks/useFetchVehicles";

export const VehicleDocumentCard: React.FC<{ data: TVehicleDocument }> = ({
  data,
}) => {
  return (
    <div className="bg-card shadow py-3 px-2 rounded text-center flex flex-col gap-16">
      <p className="text-sm">Required Document</p>
      <h4>{data.type}</h4>
      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral cursor-pointer">Delete</span>
        <span className="text-caramel cursor-pointer">Download</span>
      </div>
    </div>
  );
};
