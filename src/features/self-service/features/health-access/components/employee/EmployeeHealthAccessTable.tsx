import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Table } from "antd";

import { TEmployeeHealthAccess } from "../../types/employee";
import { useGetEmployeeHealthAccesses } from "../../hooks/employee/useGetEmployeeHealthAccesses";
import { RemoveEmployeeHealthAccess } from "./RemoveEmployeeHealthAccess";
import { EditEmployeeHMOPlan } from "./EditEmployeeHMOPlan";
import { EMPLOYEE_HEALTH_ACCESS_TABLE_COLUMNS } from "../columns/employee-health-access";
import { TableFocusTypeBtn } from "components/table";

export type TEmployeeHealthAccessAction =
  | "edit-employee-hmo-plan"
  | "view"
  | "delete";
export const EmployeeHealthAccessTable: React.FC<{
  search?: string;
  departmentId?: number;
}> = ({ search, departmentId }) => {
  const [employee, setEmployee] = useState<TEmployeeHealthAccess>();
  const [action, setAction] = useState<TEmployeeHealthAccessAction>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetEmployeeHealthAccesses({
    pagination,
    searchParams: { name: search },
    departmentId,
  });
  const handleAction = (
    action: TEmployeeHealthAccessAction,
    data: TEmployeeHealthAccess
  ) => {
    setAction(action);
    setEmployee(data);
  };

  const columns: ColumnsType<TEmployeeHealthAccess> =
    EMPLOYEE_HEALTH_ACCESS_TABLE_COLUMNS(handleAction);
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TEmployeeHealthAccess>>(columns);
  return (
    <div className="space-y-6">
      <EditEmployeeHMOPlan
        handleClose={() => setAction(undefined)}
        healthAccess={employee}
        open={action === "edit-employee-hmo-plan"}
      />
      <RemoveEmployeeHealthAccess
        handleClose={() => setAction(undefined)}
        healthAccess={employee}
        open={action === "delete"}
      />
      <div className="flex justify-end">
        {TableFocusTypeBtn<TEmployeeHealthAccess>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={selectedColumns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
