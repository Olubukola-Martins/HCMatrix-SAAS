import { useState } from "react";
import { SelectEmployee } from "features/core/employees/components/SelectEmployee";
import AllLeaveRecallsTable from "./AllLeaveRecallsTable";

const AllLeaveRecalls = () => {
  const [employeeId, setEmployeeId] = useState<number>();

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
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
        <AllLeaveRecallsTable employeeId={employeeId} />
      </div>
    </div>
  );
};

export default AllLeaveRecalls;
