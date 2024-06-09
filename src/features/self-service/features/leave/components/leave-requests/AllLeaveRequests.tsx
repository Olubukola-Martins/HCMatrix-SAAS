import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { DatePicker, Input } from "antd";
import AllLeaveRequestsTable from "./AllLeaveRequestsTable";
import { SelectEmployee } from "features/core/employees/components/SelectEmployee";
import dayjs, { Dayjs } from "dayjs";

const AllLeaveRequests = () => {
  const [status, setStatus] = useState<TApprovalStatus>();
  const [duration, setDuration] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs(),
    dayjs(),
  ]);
  const [employeeId, setEmployeeId] = useState<number>();
  const [search, setSearch] = useState<string>();

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
            <Input.Search
              placeholder="Search"
              className="w-full"
              onSearch={(val) => setSearch(val)}
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
          status={status ? [status] : undefined}
          employeeId={employeeId}
          search={search}
        />
      </div>
    </div>
  );
};

export default AllLeaveRequests;
