import React from "react";

export const VehicleRemindersCard = () => {
  return (
    <div>
      <div className="border rounded-md px-4 py-2 shadow">
        <p>Reminders</p>
        <div className="flex justify-center my-6">
          <img
            src="https://res.cloudinary.com/ddvaelej7/image/upload/v1664348855/roundGraph1_kz4hem.svg"
            alt="graph"
            className="h-28"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-caramel" />
            <span className="text-sm">0 Assigned</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ background: "#FFA600" }}
            />
            <span className="text-sm">0 Unassigned</span>
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
