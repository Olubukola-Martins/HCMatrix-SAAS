import Table, { ColumnsType } from "antd/lib/table";
import { ReportNav } from "../components/ReportNav";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { Input } from "antd";

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

export const ShiftPerEmployee = () => {
  return (
    <>
      <AttendanceSubToper active="reports" />
      <ReportNav active="Shift_Per_Employee" />
      <div className="Container flex items-center justify-between mb-5">
        <div className="flex items-center gap-5">
          <PageIntro title="Report" link={appRoutes.attendanceHome} />
          <Input.Search
            placeholder="Search.."
            style={{ width: "50%" }}
            allowClear
          />
        </div>
        <div className="flex items-center gap-x-3">
          <button className="flex items-center gap-x-2 transparentButton">
            <span className="text-caramel font-medium">Filter</span>
            <i className="ri-filter-2-line text-caramel"></i>
          </button>
          <a href="#" className="button">
            <span>Export</span>
          </a>
        </div>
      </div>
      <div className="Container">
        <Table columns={columns} dataSource={data} scroll={{ x: 500 }} />
      </div>
    </>
  );
};

export default ShiftPerEmployee;
