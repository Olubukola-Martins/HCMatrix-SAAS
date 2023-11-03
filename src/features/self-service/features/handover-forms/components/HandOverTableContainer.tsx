import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { HandOverTable } from "./HandOverTable";
import { SelectEmployee } from "features/core/employees/components/SelectEmployee";

const HandOverTableContainer = () => {
  const [status, setStatus] = useState<TApprovalStatus>();
  const [employeeId, setEmployeeId] = useState<number>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-4">
        <div className="">
          <SelectApprovalStatus
            value={status}
            onSelect={(status) => {
              setStatus(status);
            }}
            size="middle"
            onClear={() => {
              setStatus(undefined);
            }}
          />
        </div>
        <div className="">
          <SelectEmployee
            value={employeeId}
            handleSelect={(id) => {
              setEmployeeId(id);
            }}
            handleClear={() => {
              setEmployeeId(undefined);
            }}
          />
        </div>
      </div>
      <HandOverTable status={status} employeeId={employeeId} />
    </div>
  );
};

export default HandOverTableContainer;
