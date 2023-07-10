import { Dropdown, Menu, Modal, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { THoliday } from "../types";
import moment from "moment";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useDeleteHoliday } from "../hooks/useDeleteHoliday";
import {
  QUERY_KEY_FOR_HOLIDAYS,
  useGetHolidays,
} from "../hooks/useGetHolidays";
import { EditHoliday } from "./EditHoliday";

export const HolidaysTable: React.FC = () => {
  const queryClient = useQueryClient();

  const [showM, setShowM] = useState(false);
  const [holiday, setHoliday] = useState<THoliday>();
  const handleEdit = (data: THoliday) => {
    setShowM(true);
    setHoliday(data);
  };
  const { mutate, isLoading } = useDeleteHoliday();
  const onDelete = (folderId: number) => {
    mutate(
      {
        id: folderId,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_HOLIDAYS],
            // exact: true,
          });
        },
      }
    );
  };
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: `Are you sure you want to delete holiday ?`,
      icon: <ExclamationCircleFilled />,
      content: `This will delete this holiday!`,
      width: 600,
      okButtonProps: { loading: isLoading },
      onOk() {
        onDelete(id);
      },
    });
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
                { label: "Edit", key: "Edit", onClick: () => handleEdit(item) },
                {
                  label: "Delete",
                  key: "Delete",
                  onClick: () => handleDelete(item.id),
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
          open={showM}
          holiday={holiday}
          handleClose={() => setShowM(false)}
        />
      )}
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
