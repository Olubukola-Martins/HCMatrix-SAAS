import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import moment, { Moment } from "moment";
import { DatePicker } from "antd";
import AllLeaveRequestsTable from "./AllLeaveRequestsTable";
import { SelectEmployee } from "features/core/employees/components/SelectEmployee";

const AllLeaveRequests = () => {
  const [status, setStatus] = useState<TApprovalStatus>();
  const [duration, setDuration] = useState<[Moment | null, Moment | null]>([
    moment(),
    moment(),
  ]);
  const [employeeId, setEmployeeId] = useState<number>();

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
              placeholder={["Start Date", "End Date"]}
              onChange={(vals) => vals && setDuration(vals)}
              className="w-full"
            />
            <SelectEmployee
              value={employeeId}
              handleSelect={(val) => {
                setEmployeeId(val);
              }}
              handleClear={() => {
                setEmployeeId(undefined);
              }}
            />
          </div>
          <div className="flex items-center gap-4">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>
          </div>
        </div>
        <AllLeaveRequestsTable
          status={status}
          startDate={duration?.[0]?.toString()}
          endDate={duration?.[0]?.toString()}
        />
      </div>
    </div>
  );
};

export default AllLeaveRequests;
