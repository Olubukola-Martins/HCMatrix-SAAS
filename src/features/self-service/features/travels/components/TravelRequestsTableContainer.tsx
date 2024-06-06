import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { TravelRequestsTable } from "./TravelRequestsTable";
import { SelectEmployee } from "features/core/employees/components/SelectEmployee";

export const TravelRequestsTableContainer = () => {
  const [status, setStatus] = useState<TApprovalStatus>();
  const [employeeId, setEmployeeId] = useState<number>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="">
            <SelectApprovalStatus
              value={status}
              onSelect={(id) => {
                setStatus(id);
              }}
              onClear={() => {
                setStatus(undefined);
              }}
            />
          </div>
          <div>
            <SelectEmployee
              handleSelect={(val) => setEmployeeId(val)}
              handleClear={() => setEmployeeId(undefined)}
            />
          </div>
        </div>
      </div>
      <TravelRequestsTable status={status} employeeId={employeeId} />
    </div>
  );
};
