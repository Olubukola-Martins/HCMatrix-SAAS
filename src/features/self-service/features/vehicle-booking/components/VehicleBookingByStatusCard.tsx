import React from "react";
import { useApiAuth } from "hooks/useApiAuth";
import { SimpleCard } from "components/cards/SimpleCard";
import { useFetchVehicleBookings } from "../hooks/useFetchVehicleBookings";

export type TVehicleBookingStatus = "pending" | "approved" | "rejected";

interface IProps {
  status: TVehicleBookingStatus;
  employeeId: number;
}

export const VehicleBookingByStatusCard: React.FC<IProps> = ({ status }) => {
  const { token, companyId } = useApiAuth();

  const { data } = useFetchVehicleBookings({
    token,
    companyId,
    searchParams: {
      name: status,
    },
    // TO DO: Filter Params needed for employee id and the status of booking
  });
  return <SimpleCard title={status} highlight={`${data?.total}`} />;
};
