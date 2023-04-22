import React from "react";

export const VehiclesByStatusCard = () => {
  return (
    <div>
      <div className="border rounded-md px-4 py-2 shadow">
        <p>Vehicle by Status</p>
        <div className="flex justify-center my-6">
          <img
            src="https://res.cloudinary.com/ddvaelej7/image/upload/v1664283938/roundgraph_b5k7n8.svg"
            alt="graph"
            className="h-28"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-caramel" />
            <span className="text-sm">0 Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ background: "#FFA600" }}
            />
            <span className="text-sm">0 Available</span>
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ background: "#FFDBD3" }}
            />
            <span className="text-sm">0 Under Repair</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-card" />
            <span className="text-sm">0 Condemned</span>
          </div>
        </div>
      </div>
    </div>
  );
};
