import React, { useState } from "react";
import { useGetAllTimeOffRequest } from "../hooks/useGetAllTimeOffRequest";
import { TableWithFocusType } from "components/table";
import { ColumnsType } from "antd/es/table";
import { ITimeOffProps } from "../types";
import { usePagination } from "hooks/usePagination";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

export const AllTimeOffRequest = () => {
  const [status, setStatus] = useState<string>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetAllTimeOffRequest();

  const columns: ColumnsType<ITimeOffProps> = [
    {
        title: "Name",
        key: "employee",
        render: (_, item) => (
          <span className="capitalize">{getEmployeeFullName(item.employee)}</span>
        ),
      },
    {
      title: "Time off Policy",
      key: "timeOffPolicy",
      render: (_, val) => <span>{val.policy?.title}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Duration in hours",
      key: "duration",
      render: (_, val) => <span>{val.policy?.duration}</span>,
    },

    {
      title: "Start Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Reasons",
      dataIndex: "comment",
      key: "comment",
    },
  ];

  return (
    <div>
      <TableWithFocusType
        className="mt-3"
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
