import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import EmployeeLeavesTable from "./EmployeeLeavesTable";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

const EmployeeLeaveRequests = () => {
  const [status, setStatus] = useState<TApprovalStatus>();
  const [duration, setDuration] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs(),
    dayjs(),
  ]);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <SelectApprovalStatus
              value={status}
              onSelect={(val) => {
                setStatus(val);
              }}
              onClear={() => {
                setStatus(undefined);
              }}
            />
            <DatePicker.RangePicker
              placeholder={["Select Start Date", "Select End Date"]}
              onChange={(vals) => vals && setDuration(vals)}
            />
          </div>
          <div className="flex items-center gap-4">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>
          </div>
        </div>
        <EmployeeLeavesTable status={status ? [status] : undefined} />
      </div>
    </div>
  );
};

export default EmployeeLeaveRequests;
