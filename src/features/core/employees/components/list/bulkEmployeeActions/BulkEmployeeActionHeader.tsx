import { AppButtonList } from "components/button/AppButtonList";
import { TEmployee } from "features/core/employees/types";
import React, { useState } from "react";
import { BulkChangeStatus } from "./BulkChangeStatus";
import { BulkAssignLineManager } from "./BulkAssignLineManager";
import { BulkAssignDesignation } from "./BulkAssignDesignation";
import { BulkAssignToGroup } from "./BulkAssignToGroup";
import { BulkAssignRole } from "./BulkAssignRole";
import { BulkAssignBranch } from "./BulkAssignBranch";

type TAction =
  | "change status"
  | "assign line manager"
  | "assign designation"
  | "assign branch"
  | "add to group"
  | "assign role";
// | "delete";
const EMPLOYEE_BULK_ACTIONS: TAction[] = [
  "change status",
  "assign line manager",
  "assign branch",
  "assign designation",
  "add to group",
  "assign role",
  // "delete",
];
const BulkEmployeeActionHeader: React.FC<{
  data: TEmployee[];
  clearSelectedEmployees: () => void;
}> = ({ data, clearSelectedEmployees }) => {
  const [action, setAction] = useState<TAction>();

  if (data.length === 0) {
    return null;
  }
  const handleClose = () => {
    setAction(undefined);
    clearSelectedEmployees();
  };
  return (
    <>
      <BulkChangeStatus
        handleClose={handleClose}
        open={action === "change status"}
        employeeIds={data.map((item) => item.id)}
      />
      <BulkAssignLineManager
        handleClose={handleClose}
        open={action === "assign line manager"}
        employeeIds={data.map((item) => item.id)}
      />
      <BulkAssignBranch
        handleClose={handleClose}
        open={action === "assign branch"}
        employeeIds={data.map((item) => item.id)}
      />
      <BulkAssignDesignation
        handleClose={handleClose}
        open={action === "assign designation"}
        employeeIds={data.map((item) => item.id)}
      />
      <BulkAssignToGroup
        handleClose={handleClose}
        open={action === "add to group"}
        employeeIds={data.map((item) => item.id)}
      />
      <BulkAssignRole
        handleClose={handleClose}
        open={action === "assign role"}
        employeeIds={data.map((item) => item.id)}
      />
      {/* <BulkDeleteEmployees
        handleClose={handleClose}
        open={action === "delete"}
        employeeIds={data.map((item) => item.id)}
      /> */}
      <div className="flex justify-end">
        <AppButtonList
          data={EMPLOYEE_BULK_ACTIONS.map((item) => ({
            label: item,
            handleClick: () => setAction(item),
            variant: "transparent",
          }))}
        />
      </div>
    </>
  );
};

export default BulkEmployeeActionHeader;
