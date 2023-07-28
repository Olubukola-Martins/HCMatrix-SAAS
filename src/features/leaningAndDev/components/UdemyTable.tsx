import { ColumnsType } from "antd/lib/table";

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

export const UdemyTable = () => {
  return <div>UdemyTable</div>;
};
