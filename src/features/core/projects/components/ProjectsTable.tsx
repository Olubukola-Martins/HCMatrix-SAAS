import React from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import {  Table } from "antd";
import moment from "moment";
import { TProjectListItem, TProjectStatus } from "../types";
import { useGetProjects } from "../hooks/useGetProjects";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
interface IProps {
  status?: TProjectStatus;
}
export const ProjectsTable: React.FC<IProps> = ({ status }) => {
  const { pagination, onChange } = usePagination({
    pageSize: 4,
  });
  const { data, isFetching } = useGetProjects({
    status,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: ColumnsType<TProjectListItem> = [
    {
      title: "Name",
      dataIndex: "desc",
      key: "desc",
      render: (_, item) => (
        <Link to={appRoutes.singleProject(item.id).path}>
          <span className="capitalize text-caramel hover:underline">
            {item.name}
          </span>
        </Link>
      ),
    },

    {
      title: "Participant Count",
      dataIndex: "emptype",
      key: "emptype",
      render: (_, item) => <span>{item.employeeCount} </span>,
    },
    {
      title: "Project Status",
      dataIndex: "emptype",
      key: "emptype",
      render: (_, item) => <span>{item.status} </span>,
    },
    {
      title: "Start Date",
      dataIndex: "startD",
      key: "startD",
      render: (_, item) => (
        <span>{moment(item.startDate).format("YYYY-MM-DD")} </span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endD",
      key: "endD",
      render: (_, item) => (
        <span>{moment(item.endDate).format("YYYY-MM-DD")} </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={columns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
