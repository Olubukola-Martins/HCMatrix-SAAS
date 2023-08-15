import Table, { ColumnsType } from "antd/lib/table";

type TUdemy = {
  key: React.Key;
  name: string;
  role: string;
  email: string;
  joinedDate: string;
  coursesEnrolled: number;
  AssignedCourses: number;
  completedCourses: number;
  lastDateVisit: string;
};

const columns: ColumnsType<TUdemy> = [
  {
    title: "Full name",
    dataIndex: "name",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Joined date",
    dataIndex: "joinedDate",
  },
  {
    title: "Assigned courses",
    dataIndex: "AssignedCourses",
  },
  {
    title: "Course Enrolled",
    dataIndex: "coursesEnrolled",
  },
  {
    title: "Completed courses",
    dataIndex: "completedCourses",
  },
  {
    title: "Last date visit",
    dataIndex: "lastDateVisit",
  },
];

const data: TUdemy[] = [
  {
    key: "1",
    name: "Omenuko Godswill",
    role: "Employee",
    email: "example@example.com",
    joinedDate: "2020-01-01",
    coursesEnrolled: 2,
    AssignedCourses: 2,
    completedCourses: 2,
    lastDateVisit: "2020-01-01",
  },
];

export const UdemyTable = () => {
  return (
    <Table
      className="mt-3"
      columns={columns}
      dataSource={data}
      scroll={{ x: 600 }}
    />
  );
};
