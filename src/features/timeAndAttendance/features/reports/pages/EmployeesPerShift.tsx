import { ReportNav } from "features/timeAndAttendance/components/report/ReportNav";
import Table, { ColumnsType } from "antd/lib/table";

type TReportDetails = {
  key: React.Key;
  employee: string;
  trackedTime: string;
  supervisor: string;
  date: string;
  shiftType: string;
};

const data: TReportDetails[] = [
  {
    key: 1,
    employee: "Godswill Omenuko",
    date: "month, 15th may 2023",
    supervisor: "Dev Team",
    shiftType: "night",
    trackedTime: "--",
  },
  {
    key: 2,
    employee: "Godswill Omenuko",
    date: "month, 15th may 2023",
    supervisor: "Dev Team",
    shiftType: "night",
    trackedTime: "--",
  },
];

const columns: ColumnsType<TReportDetails> = [
  {
    title: "Employees",
    dataIndex: "employee",
  },
  {
    title: "Tracked time",
    dataIndex: "trackedTime",
  },
  {
    title: "Supervisors/shift-in-charge",
    dataIndex: "supervisor",
  },

  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Shift Type",
    dataIndex: "shiftType",
  },
];

 const EmployeesPerShift = () => {
  return (
    <>
      <ReportNav active="Employee_Per_shift" />
      <div className="Container">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default EmployeesPerShift;