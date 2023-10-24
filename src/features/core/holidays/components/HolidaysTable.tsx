import { Dropdown, Menu, Modal, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { THoliday } from "../types";
import moment from "moment";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useDeleteHoliday } from "../hooks/useDeleteHoliday";
import {
  QUERY_KEY_FOR_HOLIDAYS,
  useGetHolidays,
} from "../hooks/useGetHolidays";
import { EditHoliday } from "./EditHoliday";
import { DeleteHoliday } from "./DeleteHoliday";

export const HolidaysTable: React.FC = () => {
  const queryClient = useQueryClient();

  const [showM, setShowM] = useState<"edit" | "delete">();
  const [holiday, setHoliday] = useState<THoliday>();
  const handleAction = (data: THoliday, action: "edit" | "delete") => {
    setShowM(action);
    setHoliday(data);
  };

  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetHolidays({
    pagination,
  });

  const columns: ColumnsType<THoliday> = [
    {
      title: "Holiday Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item.title}</span>,
    },
    {
      title: "Date",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span className="capitalize">
          {moment(item.date).format("DD, MMMM")}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val, item) => (
        <span className="capitalize text-caramel hover:underline">
          {moment(item.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Last Modified",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (val, item) => (
        <span className="capitalize text-caramel hover:underline">
          {moment(item.updatedAt).format("YYYY-MM-DD")}
        </span>
      ),
    },

    {
      title: "Actions",
      dataIndex: "act",
      key: "act",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: "Edit",
                  key: "Edit",
                  onClick: () => handleAction(item, "edit"),
                },
                {
                  label: "Delete",
                  key: "Delete",
                  onClick: () => handleAction(item, "delete"),
                },
              ]}
            />
          }
          children={<MoreOutlined />}
          trigger={["click"]}
        />
      ),
    },
  ];

  return (
    <div>
      {holiday && (
        <EditHoliday
          open={showM === "edit"}
          holiday={holiday}
          handleClose={() => setShowM(undefined)}
        />
      )}
      <DeleteHoliday
        open={showM === "delete"}
        holiday={holiday}
        handleClose={() => setShowM(undefined)}
      />
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
