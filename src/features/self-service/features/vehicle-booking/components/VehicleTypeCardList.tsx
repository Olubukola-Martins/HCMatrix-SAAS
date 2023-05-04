import React from "react";
import { TVehicleType } from "../hooks/useCreateVehicle";
import { VehicleTypeCard } from "./VehicleTypeCard";

export const VEHICLE_TYPES: TVehicleType[] = [
  "bus",
  "car",
  "motorcycle",
  "truck",
];

export const VehicleTypeCardList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {VEHICLE_TYPES.map((item) => (
        <VehicleTypeCard key={item} type={item} />
      ))}
    </div>
  );
};
