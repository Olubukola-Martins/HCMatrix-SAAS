import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Table } from "antd";
import { useFetchAllConferenceRooms } from "../../hooks/useFetchAllConferenceRooms";
import { TSingleConferenceRoom } from "../../types";
import { EditConferenceRoom } from "./EditConferenceRoom";
import { DeleteConferenceRoom } from "./DeleteConferenceRoom";
import { CRB_AVAILABLE_ROOMS_TABLE_COLUMNS } from "../columns/available-rooms";
import { TableFocusTypeBtn } from "components/table";

export const AllConferenceRooms: React.FC = () => {
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchAllConferenceRooms({
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });
  const [action, setAction] = useState<"edit" | "delete">();
  const [room, setRoom] = useState<TSingleConferenceRoom>();
  const onClose = () => {
    setAction(undefined);
    setRoom(undefined);
  };

  const columns: ColumnsType<TSingleConferenceRoom> =
    CRB_AVAILABLE_ROOMS_TABLE_COLUMNS();
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TSingleConferenceRoom>>(columns);
  return (
    <div className="space-y-6">
      <EditConferenceRoom
        handleClose={onClose}
        open={action === "edit"}
        room={room}
      />
      <DeleteConferenceRoom
        handleClose={onClose}
        open={action === "delete"}
        room={room}
      />
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
