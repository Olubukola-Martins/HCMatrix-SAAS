import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Table } from "antd";
import { TSingleConferenceRoom } from "../../types";
import { useFetchAllAvailableConferenceRooms } from "../../hooks/useFetchAllAvailableConferenceRooms";
import { TableFocusTypeBtn } from "components/table";
import { CRB_AVAILABLE_ROOMS_TABLE_COLUMNS } from "../columns/available-rooms";

export const AvailableConferenceRooms: React.FC = () => {
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchAllAvailableConferenceRooms({
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: ColumnsType<TSingleConferenceRoom> =
    CRB_AVAILABLE_ROOMS_TABLE_COLUMNS();
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TSingleConferenceRoom>>(columns);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {TableFocusTypeBtn<TSingleConferenceRoom>({
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
  );
};
