import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { EmployeeProfileEditRequestsTable } from "./EmployeeProfileEditRequestsTable";

export const EmployeeProfileEditRequests = () => {
  const [status, setStatus] = useState<TApprovalStatus>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex justify-between">
          <SelectApprovalStatus
            value={status}
            onSelect={(val) => {
              setStatus(val);
            }}
            onClear={() => {
              setStatus(undefined);
            }}
          />
        </div>
      </div>
      <EmployeeProfileEditRequestsTable status={status} />
    </div>
  );
};
