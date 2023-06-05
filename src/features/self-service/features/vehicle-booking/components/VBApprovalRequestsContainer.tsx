import React, { useState } from "react";
import VBApprovalRequestsTable from "./VBApprovalRequestsTable";
import { Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { AddVehicleBooking } from "./AddVehicleBooking";
import { useApiAuth } from "hooks/useApiAuth";

export const VBApprovalRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const { currentUserEmployeeId } = useApiAuth();

  return (
    <>
      <AddVehicleBooking
        open={showM}
        handleClose={() => setShowM(false)}
        employeeId={currentUserEmployeeId}
      />
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
