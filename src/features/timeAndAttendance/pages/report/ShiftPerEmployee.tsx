import { ReportNav } from "features/timeAndAttendance/components/report/ReportNav";
import Table, { ColumnsType } from "antd/lib/table";

type TReportDetails = {
  key: React.Key;
  employee: string;
  trackedTime: string;
  daysOfWeek: string;
  approved: string;
  notApproved: string;
};

const data: TReportDetails[] = [
  {
    key: 1,
    employee: "Godswill Omenuko",
    approved: "Approved",
    daysOfWeek: "---",
    notApproved: "NIL",
    trackedTime: "---",
  },
  {
    key: 2,
    employee: "Godswill Omenuko",
    approved: "Approved",
    daysOfWeek: "---",
    notApproved: "NIL",
    trackedTime: "---",
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
    title: "Days of the week",
    dataIndex: "daysOfWeek",
  },
  {
    title: "Approved",
    dataIndex: "approved",
  },
  {
    title: "Approved",
    dataIndex: "approved",
  },
];

export const ShiftPerEmployee = () => {
  return (
    <>
      <ReportNav active="Shift_Per_Employee" />
     <div className="Container">
     <Table columns={columns} dataSource={data} />
     </div>
    </>
  );
};
