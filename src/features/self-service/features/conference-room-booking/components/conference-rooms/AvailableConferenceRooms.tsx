import React from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Table } from "antd";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TSingleConferenceRoom } from "../../types";
import { useFetchAllAvailableConferenceRooms } from "../../hooks/useFetchAllAvailableConferenceRooms";

export const AvailableConferenceRooms: React.FC = () => {
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchAllAvailableConferenceRooms({
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

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
  ];

  return (
    <div>
      <Table
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
