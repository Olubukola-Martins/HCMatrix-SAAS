import { Table } from "antd";

import React from "react";

import { ColumnsType } from "antd/lib/table";

type EmployeeTimesheetTableEntry = any;

export const EmployeeTimesheet: React.FC<{
  data?: EmployeeTimesheetTableEntry[];
  total?: number;
  type?: "monthly" | "daily";
}> = ({ data = [], total, type }) => {
  const columns: ColumnsType<EmployeeTimesheetTableEntry> = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item.name}</span>,
    },
    {
      title: "Emp UId",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item.name}</span>,
    },
    {
      title: `Hours Worked ${type}`,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val, item) => (
        <span className="capitalize text-caramel hover:underline">
          {item.hoursWorked}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        size="small"
        dataSource={data}
        // pagination={{ ...pagination, total: data?.total }}
        // onChange={onChange}
      />
    </div>
  );
};
