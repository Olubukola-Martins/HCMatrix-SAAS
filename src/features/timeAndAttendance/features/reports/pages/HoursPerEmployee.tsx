import { ReportNav } from "features/timeAndAttendance/components/report/ReportNav";
import Table, { ColumnsType } from "antd/lib/table";

type TReportDetails = {
  key: React.Key;
  employee: string;
  trackedTime: string;
  department: string;
  status: string;
  shiftType: string;
};

const data: TReportDetails[] = [
  {
    key: 1,
    employee: "Godswill Omenuko",
    status: "Approved",
    department: "Dev Team",
    shiftType: "night",
    trackedTime: "--",
  },
  {
    key: 2,
    employee: "Godswill Omenuko",
    status: "Approved",
    department: "Dev Team",
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
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Tracked time",
    dataIndex: "trackedTime",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Shift Type",
    dataIndex: "shiftType",
  },
];

 const HoursPerEmployee = () => {
  return (
    <>
      <ReportNav active="Hours_Per_Employee" />
      <div className="Container">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default HoursPerEmployee;