import { Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { useGetFolders } from "../hooks/useGetFolders";
import { TFolderListItem } from "../types";
import moment from "moment";

export const FoldersTable: React.FC = () => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetFolders({
    pagination,
  });

  const columns: ColumnsType<TFolderListItem> = [
    {
      title: "Folder Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item.name}</span>,
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
                { label: "Edit", key: "Edit", onClick: () => {} },
                { label: "Delete", key: "Delete", onClick: () => {} },
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
