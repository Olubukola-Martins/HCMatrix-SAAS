import React from "react";
import { VEHICLE_TYPES } from "./VehicleTypeCardList";
import { Select } from "antd";
import { TVehicleType } from "../hooks/useCreateVehicle";

export const SelectVehicleType: React.FC<{
  onSelect?: (val: TVehicleType) => void;
  onClear?: () => void;
}> = ({ onSelect, onClear }) => {
  return (
    <Select
      allowClear
      onClear={onClear}
      onSelect={onSelect}
      placeholder="Vehicle Type"
      options={VEHICLE_TYPES.map((item) => ({
        label: item,
        value: item,
      }))}
    />
  );
};
