import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React from "react";
import { TOnboardingTask } from "../types";

interface IProps {
  data: TOnboardingTask[];
}

const columns: ColumnsType<TOnboardingTask> = [
  {
    title: "Task",
    dataIndex: "name",
    render: (_, item) => <span className="capitalize">{item.name}</span>,
    // width: 150,
  },

  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Task Supervisor",
    dataIndex: "supervisor",
    render: (_, item) => (
      <span className="capitalize">
        {item.supervisor.firstName} {item.supervisor.lastName}
      </span>
    ),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    render: (val) => <span className="capitalize">{val}</span>,
  },
  {
    title: "Start Date",
    dataIndex: "start",
    render: (_, item) => (
      <span className="capitalize">
        {moment(item.startDate).format("YYYY/MM/DD hh:mm")}
      </span>
    ),
  },
  {
    title: "End Date",
    dataIndex: "end",
    render: (_, item) => (
      <span className="capitalize">
        {moment(item.endDate).format("YYYY/MM/DD hh:mm")}
      </span>
    ),
  },
];
const Tasks: React.FC<IProps> = ({ data }) => {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <h4 className="text-lg font-semibold">Tasks</h4>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        pagination={{ pageSize: 4, total: data.length }}
        scroll={{ y: 240 }}
      />
    </div>
  );
};

export default Tasks;
