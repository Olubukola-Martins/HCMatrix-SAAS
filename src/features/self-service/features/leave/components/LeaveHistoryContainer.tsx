import { Select, Space, Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TApprovalStatus } from "types/statuses";
import LeavesTable from "./LeavesTable";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";
import { useApiAuth } from "hooks/useApiAuth";
import { useState } from "react";

const LeaveHistoryContainer = () => {
  const { currentUserEmployeeId } = useApiAuth();
  const [status, setStatus] = useState<TApprovalStatus>();

  return (
    <div>
      <p className="text-lg mb-4">My Leave History</p>
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
        <LeavesTable employeeId={currentUserEmployeeId} status={status} />
      </div>
    </div>
  );
};

export default LeaveHistoryContainer;
