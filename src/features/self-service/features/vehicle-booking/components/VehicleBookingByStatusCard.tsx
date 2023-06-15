import React from "react";
import { SimpleCard } from "components/cards/SimpleCard";

export type TVehicleBookingStatus = "pending" | "approved" | "rejected";

interface IProps {
  status: TVehicleBookingStatus;
  total: number;
}

export const VehicleBookingByStatusCard: React.FC<IProps> = ({
  status,
  total,
}) => {
  return <SimpleCard title={status} highlight={`${total}`} />;
};
