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
export const DailySwitchActivityTable: React.FC<{
  data: switchActivityTableProps[];
  isLoading?: boolean;
}> = ({ data, isLoading }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 500 }}
        loading={isLoading}
        pagination={{ pageSize: 5, total: data?.length }}
      />
    </>
  );
};
