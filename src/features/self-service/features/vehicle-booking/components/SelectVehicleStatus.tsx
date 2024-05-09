import React from "react";
import { TVehicleStatus } from "../hooks/useCreateVehicle";
import { Select } from "antd";

export const VEHICLE_STATUSES: TVehicleStatus[] = [
  "assigned",
  "in-repair",
  "condemned",
  "unassigned",
];

export const SelectVehicleStatus: React.FC<{
  onSelect?: (val: TVehicleStatus) => void;
  onClear?: () => void;
}> = ({ onSelect, onClear }) => {
  return (
    <Select
      allowClear
      onClear={onClear}
      onSelect={onSelect}
      placeholder="Status"
      options={VEHICLE_STATUSES.map((item) => ({
        label: item,
        value: item,
      }))}
    />
  );
};
