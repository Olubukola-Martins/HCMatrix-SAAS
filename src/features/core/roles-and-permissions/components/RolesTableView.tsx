import { useState } from "react";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TRole } from "../types";
import { ROLES_TABLE_COLUMNS } from "./columns";
import { TableFocusTypeBtn } from "components/table";

interface IProps {
  data?: TRole[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TRole>["onChange"];
  deleteRole: (val: TRole) => void;
}

export const RolesTableView = ({
  data,
  loading,
  pagination,
  onChange,
  deleteRole,
}: IProps) => {
  const columns: ColumnsType<TRole> = ROLES_TABLE_COLUMNS(deleteRole);
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TRole>>(columns);
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {TableFocusTypeBtn<TRole>({
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
