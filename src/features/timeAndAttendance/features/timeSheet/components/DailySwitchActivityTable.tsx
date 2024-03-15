import Table, { ColumnsType } from "antd/lib/table";
import { switchActivityTableProps } from "../types";

const columns: ColumnsType<switchActivityTableProps> = [
  {
    title: "Project",
    dataIndex: "name",
    render: (_, val) => (
      <span className="capitalize">{val?.project?.name}</span>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Time",
    dataIndex: "time",
  },
  {
    title: "Note",
    dataIndex: "comment",
  },
];
export const DailySwitchActivityTable = () => {
  const data = [];
  return (
    <>
      <Table
        columns={columns}
        dataSource={[]}
        scroll={{ x: 500 }}
        pagination={{ pageSize: 5, total: data?.length }}
      />
    </>
  );
};
