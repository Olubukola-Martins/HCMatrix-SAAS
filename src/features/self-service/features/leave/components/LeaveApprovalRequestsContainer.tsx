import { Select } from "antd";

import { useState } from "react";

import { TApprovalStatus } from "types/statuses";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";
import LeavesApprovalRequestsTable from "./LeavesApprovalRequestsTable";

const LeaveApprovalRequestsContainer = () => {
  const [status, setStatus] = useState<TApprovalStatus>();
  return (
    <div>
      <p className="text-lg mb-4">Leave Approval Requests</p>
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
          <div className="flex items-center gap-4">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>
          </div>
        </div>
        <LeavesApprovalRequestsTable status={status} />
      </div>
    </div>
  );
};

export default LeaveApprovalRequestsContainer;
