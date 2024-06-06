import React from "react";
import { TTrainingSessionBookingStatus } from "features/billing/types/addOns/trainingSession";
import { TRAINING_BOOKING_STATUSES } from "features/billing/constants";
import { Select } from "antd";

export const SelectTrainingBookingStatus: React.FC<{
  onSelect?: (val: TTrainingSessionBookingStatus) => void;
  onClear?: () => void;
}> = ({ onSelect, onClear }) => {
  return (
    <Select
      allowClear
      onClear={onClear}
      onSelect={onSelect}
      placeholder="Status"
      options={TRAINING_BOOKING_STATUSES.map((item) => ({
        label: item,
        value: item,
      }))}
    />
  );
};
