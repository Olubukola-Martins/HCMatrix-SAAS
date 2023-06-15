import React from "react";
import {
  TVehicleBookingStatus,
  VehicleBookingByStatusCard,
} from "./VehicleBookingByStatusCard";

import { VehicleAssignedToEmployee } from "./VehicleAssignedToEmployee";
import { BookingHistory } from "./BookingHistory";
import { useGetVehicleEmployeeBookingAnalytics } from "../hooks/useGetVehicleEmployeeBookingAnalytics";

const STATUSES: TVehicleBookingStatus[] = ["approved", "pending", "rejected"];
export const EmployeeVehicleBooking = () => {
  const { data } = useGetVehicleEmployeeBookingAnalytics();
  return (
    <div className="flex flex-col gap-12 mt-4">
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATUSES.map((item) => (
            <div key={item}>
              <VehicleBookingByStatusCard
                status={item}
                total={data ? data[item] : 0}
              />
            </div>
          ))}
          <VehicleAssignedToEmployee data={data?.vehicleInUse} />
        </div>
      )}
      <BookingHistory />
    </div>
  );
};
