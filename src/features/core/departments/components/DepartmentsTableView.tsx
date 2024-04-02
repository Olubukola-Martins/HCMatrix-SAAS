import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TDepartment } from "../types";
import { DEPARTMENT_TABLE_COLUMNS } from "./columns";
import { useState } from "react";
import { TableFocusTypeBtn } from "components/table";

interface IProps {
  data?: TDepartment[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TDepartment>["onChange"];
  editDepartment: (val: TDepartment) => void;
  viewDepartment: (val: TDepartment) => void;
  deleteDepartment: (val: TDepartment) => void;
}

export const DepartmentsTableView = ({
  data,
  loading,
  pagination,
  onChange,
  editDepartment,
  deleteDepartment,
  viewDepartment,
}: IProps) => {
  const columns: ColumnsType<TDepartment> = DEPARTMENT_TABLE_COLUMNS(
    editDepartment,
    viewDepartment,
    deleteDepartment
  );
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TDepartment>>(columns);
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {TableFocusTypeBtn<TDepartment>({
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
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};
