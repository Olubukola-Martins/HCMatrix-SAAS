import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { TransferRequestsTable } from "./TransferRequestsTable";

export const TransferRequestsTableContainer = () => {
  const [status, setStatus] = useState<TApprovalStatus>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex justify-between">
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
      </div>
      <TransferRequestsTable status={status} />
    </div>
  );
};
