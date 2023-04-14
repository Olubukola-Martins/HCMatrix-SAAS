import React from "react";
import { useFetchVehicleBookings } from "../hooks/useFetchVehicleBookings";
import { useApiAuth } from "Hooks/useApiAuth";
import { Empty } from "antd";

export const requestStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2";

export const LIMIT_OF_ITEMS_TO_DISPLAY = 4;

export const RecentVehicleRequestsCard = () => {
  const { token, companyId } = useApiAuth();

  const { data, isSuccess } = useFetchVehicleBookings({
    token,
    companyId,
    pagination: {
      limit: LIMIT_OF_ITEMS_TO_DISPLAY,
      offset: 0,
    },
  });
  return (
    <div className="bg-mainBg border mt-4 rounded-lg text-sm shadow">
      <div className="text-left px-3 py-3 border-b">
        <p className="font-medium">Recent Requests </p>
      </div>
      <div className="flex flex-col gap-3 px-3 py-2">
        {isSuccess && data?.data.length > 0 ? (
          data.data.map((item) => (
            <div className={requestStyle} key={item.id}>
              <div className="flex flex-col gap-1">
                <h5 className="group-hover:text-caramel font-medium">
                  {item.employee.firstName} {item.employee.lastName}
                </h5>
                <span className="text-xs">ID: {item.vehicleId}</span>
                <span className="text-xs">
                  Vehicle Name: {item.vehicle.model} ({item.vehicle.brand})
                </span>
                <span className="text-xs">Duration: {item.duration}hrs</span>
              </div>
              <i className="ri-more-fill text-lg"></i>
            </div>
          ))
        ) : (
          <Empty description="No Vehicle Requests" />
        )}
      </div>
      {isSuccess && data.total > LIMIT_OF_ITEMS_TO_DISPLAY ? (
        <h2 className="text-caramel text-right px-3 text-sm font-semibold cursor-pointer hover:text-accent pb-2 pt-1">
          See All
        </h2>
      ) : null}
    </div>
  );
};
