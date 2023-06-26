import React from "react";
import { TVehicleType } from "../hooks/useCreateVehicle";
import { VehicleTypeCard } from "./VehicleTypeCard";
import { Skeleton } from "antd";
import { useGetVehicleOverviewAnalytics } from "../hooks/useGetVehicleOverviewAnalytics";

export const VEHICLE_TYPES: TVehicleType[] = [
  "bus",
  "car",
  "motorcycle",
  "truck",
];

export const VehicleTypeCardList = () => {
  const { data, isLoading } = useGetVehicleOverviewAnalytics();

  return (
    <Skeleton active loading={isLoading} paragraph={{ rows: 4 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data &&
          VEHICLE_TYPES.map((item) => (
            <VehicleTypeCard key={item} type={item} total={data[item]} />
          ))}
      </div>
    </Skeleton>
  );
};
