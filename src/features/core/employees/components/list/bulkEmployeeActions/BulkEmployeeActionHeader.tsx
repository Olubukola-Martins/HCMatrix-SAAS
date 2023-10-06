import { AppButtonList } from "components/button/AppButtonList";
import { TEmployee } from "features/core/employees/types";
import React, { useState } from "react";
import { BulkChangeStatus } from "./BulkChangeStatus";
import { BulkAssignLineManager } from "./BulkAssignLineManager";
import { BulkAssignDesignation } from "./BulkAssignDesignation";
import { BulkAssignToGroup } from "./BulkAssignToGroup";
import { BulkAssignRole } from "./BulkAssignRole";
import { BulkDeleteEmployees } from "./BulkDeleteEmployees";
import { BulkAssignBranch } from "./BulkAssignBranch";

type TAction =
  | "change status"
  | "assign line manager"
  | "assign designation"
  | "assign branch"
  | "add to group"
  | "assign role"
  | "delete";
const EMPLOYEE_BULK_ACTIONS: TAction[] = [
  "change status",
  "assign line manager",
  "assign branch",
  "assign designation",
  "add to group",
  "assign role",
  "delete",
];
const BulkEmployeeActionHeader: React.FC<{ data: TEmployee[] }> = ({
  data,
}) => {
  const [action, setAction] = useState<TAction>();

  if (data.length === 0) {
    return null;
  }
  return (
    <>
      <BulkChangeStatus
        handleClose={() => setAction(undefined)}
        open={action === "change status"}
        employeeIds={data.map((item) => item.id)}
      />
      <BulkAssignLineManager
        handleClose={() => setAction(undefined)}
        open={action === "assign line manager"}
        employeeIds={data.map((item) => item.id)}
      />
      <BulkAssignBranch
        handleClose={() => setAction(undefined)}
        open={action === "assign branch"}
        employeeIds={data.map((item) => item.id)}
      />
      <BulkAssignDesignation
        handleClose={() => setAction(undefined)}
        open={action === "assign designation"}
        employeeIds={data.map((item) => item.id)}
      />
      <BulkAssignToGroup
        handleClose={() => setAction(undefined)}
        open={action === "add to group"}
        employeeIds={data.map((item) => item.id)}
      />
      <BulkAssignRole
        handleClose={() => setAction(undefined)}
        open={action === "assign role"}
        employeeIds={data.map((item) => item.id)}
      />
      <BulkDeleteEmployees
        handleClose={() => setAction(undefined)}
        open={action === "delete"}
        employeeIds={data.map((item) => item.id)}
      />
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
