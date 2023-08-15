import { Input, Select } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { SimpleCard } from "components/cards/SimpleCard";

type TUserReport = {
  key: React.Key;
  name: string;
  department: string;
  userType: string;
  lastLogin: string;
  assignedCourse: string;
  completedCourse: string;
  points: string;
  badges: string;
  certificates: string;
};

const data: TUserReport[] = [
  {
    key: 1,
    department: "Dev team",
    name: "Godswill Omenuko",
    userType: "Employee",
    assignedCourse: "13",
    badges: "100 badges",
    certificates: "10",
    completedCourse: "10",
    lastLogin: "2hrs",
    points: "12",
  },
];

const columns: ColumnsType<TUserReport> = [
  {
    title: "Name",
    dataIndex: "name",
  },

  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "User Type",
    dataIndex: "title",
  },
  {
    title: "Last Login",
    dataIndex: "lastLogin",
  },
  {
    title: "Assigned Course",
    dataIndex: "assignedCourse",
  },
  {
    title: "Completed Course",
    dataIndex: "completedCourse",
  },
  {
    title: "Points",
    dataIndex: "points",
  },
  {
    title: "Badges",
    dataIndex: "badges",
  },
  {
    title: "Certificates",
    dataIndex: "certificates",
  },
];

export const UserReport = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
        <SimpleCard title="Total Learners" highlight="0" />
        <SimpleCard title="Course Assignment" highlight="0" />
        <SimpleCard title="Completed Courses" highlight="0" />
        <SimpleCard title="Course in progress" highlight="0" />
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
