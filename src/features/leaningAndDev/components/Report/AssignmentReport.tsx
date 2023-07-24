import { Input, Select } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { SimpleCard } from "components/cards/SimpleCard";

type TTestReport = {
  key: React.Key;
  assignment: string;
  course: string;
  users: string;
  submission: string;
  passed: string;
  averageGrade: string;
};

const data: TTestReport[] = [
  {
    key: 1,
    course: "Self development",
    assignment: "Assessment",
    users: "200",
    passed: "13",
    averageGrade: "10%",
    submission: "29",
  },
];

const columns: ColumnsType<TTestReport> = [
  {
    title: "Assignment",
    dataIndex: "assignment",
  },

  {
    title: "Course",
    dataIndex: "course",
  },
  {
    title: "Total Users",
    dataIndex: "users",
  },
  {
    title: "Submission",
    dataIndex: "submission",
  },
  {
    title: "Passed",
    dataIndex: "passed",
  },
  {
    title: "Average Grade",
    dataIndex: "averageGrade",
  },
];

export const AssignmentReport = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
        <SimpleCard title="Assignments" highlight="0" />
        <SimpleCard title="Submission" highlight="0" />
        <SimpleCard title="Password" highlight="0" />
        <SimpleCard title="Average grade" highlight="0" />
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
