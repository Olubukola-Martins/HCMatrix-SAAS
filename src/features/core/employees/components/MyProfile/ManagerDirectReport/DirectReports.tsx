import { Input, Table } from "antd";
import React from "react";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { TEmployee, TDirectReport } from "features/core/employees/types";

interface IProps {
  employee?: TEmployee;
}

const columns: ColumnsType<TDirectReport> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (_, item) => (
      <span className="capitalize">
        {item.employee.firstName} {item.employee.lastName}
      </span>
    ),
    // width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    render: (_, item) => <span className="">{item.employee.email} </span>,

    // width: 150,
  },
  {
    title: "From",
    dataIndex: "from",
    render: (val) => (
      <span className="capitalize">
        {val && moment(val).format("DD/MM/YY")}
      </span>
    ),
  },
  {
    title: "To",
    dataIndex: "to",
    render: (val) => (
      <span className="capitalize">
        {val && moment(val).format("DD/MM/YY")}
      </span>
    ),
  },
  {
    title: "Currently reports to you",
    dataIndex: "currentManager",
    render: (val) => <span className="capitalize">{val ? "Yes" : "No"}</span>,

    // width: 150,
  },
];

export const DirectReports: React.FC<IProps> = ({ employee }) => {
  if (employee) {
    return (
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Direct Reports</h2>
        </div>
        <div className="my-3 flex justify-end">
          <Input.Search
            placeholder="input search text"
            style={{ width: 200 }}
            className="rounded"
          />
        </div>

        <Table
          columns={columns}
          dataSource={employee.directReports}
          size="small"
          pagination={{ pageSize: 4, total: employee?.directReports?.length }}
          scroll={{ y: 240 }}
        />
      </div>
    );
  }
  return null;
};
