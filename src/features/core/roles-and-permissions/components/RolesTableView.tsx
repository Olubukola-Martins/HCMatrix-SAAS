import React from "react";

import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TRole } from "../types";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";

interface IProps {
  data?: TRole[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TRole>["onChange"];
  deleteRole: (val: TRole) => void;
}

export const RolesTableView = ({
  data,
  loading,
  pagination,
  onChange,
  deleteRole,
}: IProps) => {
  const columns: ColumnsType<TRole> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => <span className="capitalize">{item.name}</span>,
    },

    {
      title: "User Count",
      dataIndex: "userCount",
      key: "userCount",
      render: (_, item) => <span className="capitalize">{item.userCount}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val, item) => (
        <span className="">
          {moment(item.createdAt).format(DEFAULT_DATE_FORMAT)}
        </span>
      ),
    },
    {
      title: "Last Modified",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (val, item) => (
        <span className="">
          {moment(item.updatedAt).format(DEFAULT_DATE_FORMAT)}
        </span>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, item) => {
        const hideDeleteBtn =
          item.label === "employee" ||
          item.label === "admin" ||
          item.userCount > 0;
        const hideEditBtn = item.label === "admin";
        return (
          <div className="flex items-center gap-3 text-lg">
            {hideEditBtn ? null : (
              <Link to={appRoutes.editRole(item.id).path}>
                <i className="ri-pencil-line cursor-pointer hover:text-caramel" />
              </Link>
            )}

            {hideDeleteBtn ? null : (
              <i
                className="ri-delete-bin-line cursor-pointer hover:text-caramel"
                onClick={() => deleteRole(item)}
              />
            )}
          </div>
        );
      },
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
