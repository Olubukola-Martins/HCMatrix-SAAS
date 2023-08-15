import { Input, Select } from "antd";
import Table, { ColumnsType } from "antd/lib/table";

type TCertificate = {
  certification: string;
  type: string;
  date: string;
};

const columns: ColumnsType<TCertificate> = [
  {
    title: "Angular Framework",
    dataIndex: "certification",
  },
  {
    title: "Training Type",
    dataIndex: "type",
  },
  {
    title: "Date of Collection",
    dataIndex: "date",
  },
  {
    title: "Action",
    render: () => (
      <span className="text-caramel underline text-sm">View certificate</span>
    ),
  },
];

const data: TCertificate[] = [
  {
    certification: "Angular Framework",
    date: "19th of June 2021",
    type: "Offline",
  },
];

export const Certificate = () => {
  return (
    <>
      <div className="flex justify-between items-center mt-10 mb-7">
        <Input.Search
          placeholder="Search branch"
          style={{ width: "35%" }}
          allowClear
        />
        <div>
          <Select
            placeholder="All Progress"
            options={[
              { value: 1, label: "All Progress" },
              { value: 2, label: "Pending" },
              { value: 3, label: "In Progress" },
              { value: 4, label: "Concluded" },
            ]}
            className="font-medium text-slate-400"
          />
        </div>
      </div>

      <Table
        className="mt-3"
        columns={columns}
        dataSource={data}
        scroll={{ x: 600 }}
      />
    </>
  );
};
