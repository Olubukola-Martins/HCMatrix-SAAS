import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Table } from "antd";
import { TProjectListItem, TProjectStatus } from "../types";
import { useGetProjects } from "../hooks/useGetProjects";
import { PROJECT_TABLE_COLUMNS } from "./columns";
import { TableFocusTypeBtn } from "components/table";
interface IProps {
  status?: TProjectStatus;
}
export const ProjectsTable: React.FC<IProps> = ({ status }) => {
  const { pagination, onChange, resetPagination } = usePagination({
    pageSize: 4,
  });
  const { data, isFetching } = useGetProjects({
    status,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });
  useEffect(() => {
    resetPagination();
  }, [status, resetPagination]);

  const columns: ColumnsType<TProjectListItem> = PROJECT_TABLE_COLUMNS();
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TProjectListItem>>(columns);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {TableFocusTypeBtn<TProjectListItem>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      <Table
        size="small"
        dataSource={data?.data.map((item) => ({ key: item.id, ...item }))}
        loading={isFetching}
        columns={selectedColumns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
