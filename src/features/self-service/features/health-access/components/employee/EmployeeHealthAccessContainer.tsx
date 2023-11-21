import { useState } from "react";
import { SelectDepartment } from "features/core/departments/components/SelectDepartment";
import { EmployeeHealthAccessTable } from "./EmployeeHealthAccessTable";
import { RegisterEmployeeHealthAccessBtn } from "./RegisterEmployeeHealthAccess";

const EmployeeHealthAccessContainer: React.FC<{ type?: "mine" }> = ({
  type,
}) => {
  const [departmentId, setDepartmentId] = useState<number>();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          {" "}
          <SelectDepartment
            handleSelect={setDepartmentId}
            handleClear={() => setDepartmentId(undefined)}
          />
        </div>
        <RegisterEmployeeHealthAccessBtn />
      </div>
      <EmployeeHealthAccessTable departmentId={departmentId} />
    </div>
  );
};

export default EmployeeHealthAccessContainer;
