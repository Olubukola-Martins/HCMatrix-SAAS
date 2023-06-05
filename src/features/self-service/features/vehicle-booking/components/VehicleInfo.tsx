import React from "react";
import { TVehicle } from "../hooks/useFetchVehicles";

import { EntityInfoCard } from "components/cards/EntityInfoCard";
import moment from "moment";

export const VehicleInfo: React.FC<{ vehicle: TVehicle }> = ({ vehicle }) => {
  return (
    <EntityInfoCard
      data={[
        {
          name: "Vehicle Type",
          value: vehicle.type,
        },
        {
          name: "Brand",
          value: vehicle.brand,
        },
        {
          name: "Model",
          value: vehicle.model,
        },
        {
          name: "Color",
          value: vehicle.color,
        },
        {
          name: "Plate Number",
          value: vehicle.plateNumber,
        },
        {
          name: "Purchase Cost",
          value: vehicle.cost,
        },
        {
          name: "Purchase Date",
          value: vehicle.purchaseDate
            ? moment(vehicle.purchaseDate).format("YYYY/MM/DD")
            : "",
        },

        {
          name: "Status",
          value: vehicle.status,
        },
        {
          name: "Description",
          value: vehicle.description,
          collapse: true,
        },
      ]}
    />
  );
};
