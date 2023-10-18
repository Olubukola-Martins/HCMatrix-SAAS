import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { EmployeePromotionRequestsTable } from "./EmployeePromotionRequestsTable";

export const EmployeePromotionRequests = () => {
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
      <EmployeePromotionRequestsTable status={status} />
    </div>
  );
};
