import { Table } from "antd";
import { usePagination } from "hooks/usePagination";
import { useGetEmployeeVehicleAssigneeHistory } from "../../hooks/assignee-history/useGetEmployeeVehicleAssigneeHistory";
import { EMPLOYEE_VEHICLE_ASSIGNEE_HISTORY_TABLE_COLUMNS } from "../columns/employee-vehicle-assignee-history";
import { TVehicleAssigneeHistory } from "../../types/vehicleAssigneeHistory";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { TableFocusTypeBtn } from "components/table";
import ExportEmployeeVehicleAssigneeHistory from "../export/ExportEmployeeVehicleAssigneeHistory";

export const AllEmployeeVehicleAssigneeHistory = () => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetEmployeeVehicleAssigneeHistory({
    pagination,
  });

  const columns = EMPLOYEE_VEHICLE_ASSIGNEE_HISTORY_TABLE_COLUMNS();
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TVehicleAssigneeHistory>>(columns);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <ExportEmployeeVehicleAssigneeHistory
            trigger={<i className="ri-download-2-line text-lg" />}
          />
          {TableFocusTypeBtn<TVehicleAssigneeHistory>({
            selectedColumns,
            setSelectedColumns,
            data: {
              columns,
            },
          })}
        </div>
        <Table
          columns={selectedColumns}
          size="small"
          dataSource={data?.data}
          loading={isFetching}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
