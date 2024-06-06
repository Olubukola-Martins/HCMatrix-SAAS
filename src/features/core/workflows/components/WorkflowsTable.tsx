import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TAllWorkflow } from "../types/allWorkflows";
import { WORKFLOW_TABLE_COLUMNS } from "./columns";
import { useState } from "react";
import { TableFocusTypeBtn } from "components/table";

interface IProps {
  data: TAllWorkflow[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TAllWorkflow>["onChange"];
}

export const WorkflowsTable = ({
  data,
  loading,
  pagination,
  onChange,
}: IProps) => {
  const columns: ColumnsType<TAllWorkflow> = WORKFLOW_TABLE_COLUMNS();
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TAllWorkflow>>(columns);
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {TableFocusTypeBtn<TAllWorkflow>({
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
