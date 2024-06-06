import React, { useState } from "react";
import VBApprovalRequestsTable from "./VBApprovalRequestsTable";
import { AddVehicleBooking } from "./AddVehicleBooking";

export const VBApprovalRequestsContainer = () => {
  const [showM, setShowM] = useState(false);

  return (
    <>
      <AddVehicleBooking open={showM} handleClose={() => setShowM(false)} />
      <div className="flex flex-col gap-6">
        <VBApprovalRequestsTable />
      </div>
    </>
  );
};
