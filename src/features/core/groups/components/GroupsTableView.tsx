import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { Table } from "antd";
import { TGroup } from "../types";
import { GROUPS_TABLE_COLUMNS } from "./columns";
import { TableFocusTypeBtn } from "components/table";
import { useState } from "react";

interface IProps {
  groups?: TGroup[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TGroup>["onChange"];
  editGroup: (val: TGroup) => void;
  deleteGroup: (val: TGroup) => void;
}
const GroupsGridView = ({
  groups,
  loading,
  pagination,
  onChange,
  editGroup,
  deleteGroup,
}: IProps) => {
  const columns: ColumnsType<TGroup> = GROUPS_TABLE_COLUMNS(
    editGroup,
    deleteGroup
  );
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TGroup>>(columns);
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {TableFocusTypeBtn<TGroup>({
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
        dataSource={groups?.map((item) => ({ key: item.id, ...item }))}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};

export default GroupsGridView;
