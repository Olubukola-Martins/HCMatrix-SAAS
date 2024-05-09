import { Input, Select } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { SimpleCard } from "components/cards/SimpleCard";

type TTestReport = {
  key: React.Key;
  test: string;
  course: string;
  totalTest: string;
  completed: string;
  pass: string;
  averageScore: string;
};

const data: TTestReport[] = [
  {
    key: 1,
    course: "Self development",
    test: "Assessment",
    totalTest: "200",
    pass: "13",
    averageScore: "10%",
    completed: "29",
  },
];

const columns: ColumnsType<TTestReport> = [
  {
    title: "Test",
    dataIndex: "test",
  },

  {
    title: "Course",
    dataIndex: "course",
  },
  {
    title: "Total Test",
    dataIndex: "totalTest",
  },
  {
    title: "Completed",
    dataIndex: "completed",
  },
  {
    title: "Pass",
    dataIndex: "pass",
  },
  {
    title: "Average Score",
    dataIndex: "averageScore",
  },
];

export const TestReport = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
        <SimpleCard title="Total Test" highlight="0" />
        <SimpleCard title="Attempts" highlight="0" />
        <SimpleCard title="Passed" highlight="0" />
        <SimpleCard title="Average Score" highlight="0" />
      </div>

      <div className="flex justify-between items-center mt-10 mb-7">
        <Input.Search
          placeholder="Search branch"
          style={{ width: "35%" }}
          allowClear
        />

        <Select
          placeholder="Select department"
          options={[{ value: 1, label: "Dev" }]}
          className="font-medium text-slate-400"
        />
      </div>

      <Table
        className="mt-3"
        columns={columns}
        dataSource={data}
        scroll={{ x: 600 }}
      />
    </div>
  );
};
