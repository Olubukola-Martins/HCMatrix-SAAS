import React, { useState } from "react";
import VBApprovalRequestsTable from "./VBApprovalRequestsTable";
import { AppButton } from "components/button/AppButton";
import { AddVehicleBooking } from "./AddVehicleBooking";

export const VBApprovalRequestsContainer = () => {
  const [showM, setShowM] = useState(false);

  return (
    <>
      <AddVehicleBooking open={showM} handleClose={() => setShowM(false)} />
      <div className="flex flex-col gap-6">
        <div className="my-5 flex justify-end gap-3">
          <i className="ri-download-2-line text-lg"></i>
          <AppButton label="Book Vehicle" handleClick={() => setShowM(true)} />
        </div>
        <VBApprovalRequestsTable />
      </div>
    </>
  );
};
