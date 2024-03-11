import Table, { ColumnsType } from "antd/lib/table";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import { useGetTimeSheet } from "../hooks/useGetTimeSheet";
import { timeSheetProps } from "../types";
import { usePagination } from "hooks/usePagination";
import { convertMinutesToHours } from "features/timeAndAttendance/utils";
// import { FilterTimeSheet } from "../components/FilterTimeSheet";

const columns: ColumnsType<timeSheetProps> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (_, val) => (
      <span className="capitalize">
        {val?.employee?.firstName} {val?.employee?.lastName}
      </span>
    ),
  },
  {
    title: "Monday",
    dataIndex: "monday",
    render: (_, val) => convertMinutesToHours(val?.days?.Monday?.totalTimeTracked),
  },
  {
    title: "Tuesday",
    dataIndex: "tuesday",
    render: (_, val) =>
      convertMinutesToHours(val?.days?.Tuesday?.totalTimeTracked),
  },
  {
    title: "Wednesday",
    dataIndex: "wednesday",
    render: (_, val) =>
      convertMinutesToHours(val?.days?.Wednesday?.totalTimeTracked),
  },
  {
    title: "Thursday",
    dataIndex: "thursday",
    render: (_, val) =>
      convertMinutesToHours(val?.days.Thursday?.totalTimeTracked),
  },
  {
    title: "Friday",
    dataIndex: "friday",
    render: (_, val) => convertMinutesToHours(val?.days?.Friday?.totalTimeTracked),
  },
  {
    title: "Saturday",
    dataIndex: "saturday",
    render: (_, val) =>
      convertMinutesToHours(val?.days?.Saturday?.totalTimeTracked),
  },
  {
    title: "Sunday",
    dataIndex: "sunday",
    render: (_, val) => convertMinutesToHours(val?.days?.Sunday?.totalTimeTracked),
  },
  {
    title: "Total",
    dataIndex: "total",
  },
];

const TimeSheet = () => {
  const [filterSheet, setFilterSheet] = useState(false);
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetTimeSheet({ pagination });

  console.log(data?.data);
  
  return (
    <>
      <AttendanceSubToper active="time-sheet" />
      {/* <FilterTimeSheet
        open={filterSheet}
        handleClose={() => setFilterSheet(false)}
      /> */}
      <div className="Container">
        <PageIntro title="Timesheet" link={appRoutes.attendanceHome} />
        <p className="pt-2">
          Welcome on board, here is a detailed list of clocked work hours and
          breaks of all employee.
        </p>

        <div className="flex justify-between items-center mt-10 mb-7">
          <Input.Search
            placeholder="Search..."
            style={{ width: "25%" }}
            allowClear
          />
          <div className="flex items-center gap-x-3">
            <button
              className="flex items-center gap-x-2 transparentButton"
              onClick={() => setFilterSheet(true)}
            >
              <span className="text-caramel font-medium">Filter</span>
              <i className="ri-filter-2-line text-caramel"></i>
            </button>
            <Link className="button" to={appRoutes.uploadAttendance}>
              Upload Timesheet
            </Link>
          </div>
        </div>

        {/* <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <Select
            defaultValue="Weekly"
            style={{ width: 120 }}
            options={[{ value: "weekly", label: "weekly" }]}
          />
          <AppButton
            label="Feb 27-Mar 5"
            additionalClassNames={[" transparentButton text-accent"]}
          />
        </div>
        <div className="flex items-center gap-3">
          <Select
            defaultValue="Tracked hours"
            style={{ width: 150 }}
            options={[{ value: "hours", label: "hours" }]}
          />
          <Select
            defaultValue="Status"
            style={{ width: 120 }}
            options={[{ value: "hours", label: "hours" }]}
          />
          <Select
            defaultValue="Clocked in"
            style={{ width: 120 }}
            options={[{ value: "hours", label: "hours" }]}
          />
        </div>
      </div> */}

        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
          scroll={{ x: 500 }}
        />
      </div>
    </>
  );
};

export default TimeSheet;
