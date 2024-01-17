import { Select } from "antd";

import { useState } from "react";

import { TApprovalStatus } from "types/statuses";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";
import LeaveRelieveApprovalsTable from "./LeaveRelieveApprovalsTable";

const LeaveRelieveApprovalsContainer = () => {
  const [status, setStatus] = useState<TApprovalStatus>();
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Select
            allowClear
            onClear={() => setStatus(undefined)}
            value={status}
            size="middle"
            className="w-32"
            placeholder="Filter"
            onSelect={(val: TApprovalStatus) => setStatus(val)}
            options={APPROVAL_STATUS_OPTIONS}
          />
        </div>
        <LeaveRelieveApprovalsTable status={status ? [status] : undefined} />
      </div>
    </div>
  );
};

export default LeaveRelieveApprovalsContainer;
