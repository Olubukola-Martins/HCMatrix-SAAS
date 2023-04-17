import React from "react";

import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TRole } from "../types";

interface IProps {
  data: TRole[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TRole>["onChange"];
}

export const RolesTableView = ({
  data,
  loading,
  pagination,
  onChange,
}: IProps) => {
  const columns: ColumnsType<TRole> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "User Count",
      dataIndex: "userCount",
      key: "userCount",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="flex items-center gap-3 text-lg">
          <i className="ri-pencil-line cursor-pointer hover:text-caramel"></i>
          <i className="ri-delete-bin-line cursor-pointer hover:text-caramel"></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        size="small"
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};
