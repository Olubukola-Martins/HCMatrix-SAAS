import React from "react";
import {
  TVehicleBookingStatus,
  VehicleBookingByStatusCard,
} from "./VehicleBookingByStatusCard";
import { useApiAuth } from "hooks/useApiAuth";
import { VehicleAssignedToEmployee } from "./VehicleAssignedToEmployee";
import { BookingHistory } from "./BookingHistory";

const STATUSES: TVehicleBookingStatus[] = ["approved", "pending", "rejected"];
export const EmployeeVehicleBooking = () => {
  const { currentUserEmployeeId } = useApiAuth();
  return (
    <div className="flex flex-col gap-12 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATUSES.map((item) => (
          <VehicleBookingByStatusCard
            key={item}
            status={item}
            employeeId={currentUserEmployeeId}
          />
        ))}
        <VehicleAssignedToEmployee employeeId={currentUserEmployeeId} />
      </div>
      <BookingHistory />
    </div>
  );
};
