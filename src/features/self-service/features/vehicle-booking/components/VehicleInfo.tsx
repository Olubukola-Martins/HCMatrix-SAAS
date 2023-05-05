import React from "react";
import { TVehicle } from "../hooks/useFetchVehicles";
import moment from "moment";

const listStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2 px-3";

export const VehicleInfo: React.FC<{ vehicle: TVehicle }> = ({ vehicle }) => {
  return (
    <div className="bg-mainBg border rounded-lg text-sm shadow py-4 flex flex-col gap-3">
      <div className={listStyle}>
        <h5 className="group-hover:text-caramel font-medium">Vehicle Type </h5>
        <span className="text-sm">{vehicle.type}</span>
      </div>
      <div className={listStyle}>
        <h5 className="group-hover:text-caramel font-medium">Brand</h5>
        <span className="text-sm">{vehicle.brand}</span>
      </div>

      <div className={listStyle}>
        <h5 className="group-hover:text-caramel font-medium">Model</h5>
        <span className="text-sm">{vehicle.model}</span>
      </div>
      <div className={listStyle}>
        <h5 className="group-hover:text-caramel font-medium">Color</h5>
        <span className="text-sm">{vehicle.color}</span>
      </div>
      <div className={listStyle}>
        <h5 className="group-hover:text-caramel font-medium">Plate Number</h5>
        <span className="text-sm">{vehicle.plateNumber}</span>
      </div>
      <div className={listStyle}>
        <h5 className="group-hover:text-caramel font-medium">Purchase Cost</h5>
        <span className="text-sm">{vehicle.cost}</span>
      </div>
      <div className={listStyle}>
        <h5 className="group-hover:text-caramel font-medium">Purchase Date</h5>
        <span className="text-sm">
          {vehicle.purchaseDate
            ? moment(vehicle.purchaseDate).format("YYYY-MM-DD")
            : ""}
        </span>
      </div>
      <div className={listStyle}>
        <h5 className="group-hover:text-caramel font-medium">Status</h5>
        <span className="text-sm">{vehicle.status}</span>
      </div>
      <div className="px-3">
        <h5 className="font-medium pb-2">Description</h5>
        <p>{vehicle.description}</p>
      </div>
    </div>
  );
};
