import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Table } from "antd";
import moment from "moment";

import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { useFetchAllConferenceRooms } from "../../hooks/useFetchAllConferenceRooms";
import { TSingleConferenceRoom } from "../../types";
import { EditConferenceRoom } from "./EditConferenceRoom";
import { DeleteConferenceRoom } from "./DeleteConferenceRoom";

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

  const columns: ColumnsType<TSingleConferenceRoom> = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      render: (_, item) => <span>{item.name}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => moment(val).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (val) => moment(val).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, item) => (
        <div className="flex items-center gap-3 text-lg">
          <i
            className="ri-pencil-line cursor-pointer hover:text-caramel"
            onClick={() => {
              setAction("edit");
              setRoom(item);
            }}
          ></i>

          <i
            className="ri-delete-bin-line cursor-pointer hover:text-caramel"
            onClick={() => {
              setAction("delete");
              setRoom(item);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <>
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
      <Table
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </>
  );
};
