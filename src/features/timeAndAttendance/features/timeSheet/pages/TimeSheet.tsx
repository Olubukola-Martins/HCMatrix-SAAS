import Table, { ColumnsType } from "antd/lib/table";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import { useGetTimeSheet } from "../hooks/useGetTimeSheet";
import { timeSheetFilterProps, timeSheetProps } from "../types";
import { usePagination } from "hooks/usePagination";
import { convertMinutesToHours } from "features/timeAndAttendance/utils";
import { FilterTimeSheet } from "../components/FilterTimeSheet";
import { AppButton } from "components/button/AppButton";

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
    render: (_, val) =>
      convertMinutesToHours(val?.days?.Monday?.totalTimeTracked),
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
    render: (_, val) =>
      convertMinutesToHours(val?.days?.Friday?.totalTimeTracked),
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
    render: (_, val) =>
      convertMinutesToHours(val?.days?.Sunday?.totalTimeTracked),
  },
  {
    title: "Total",
    dataIndex: "total",
    render: (_, val) => convertMinutesToHours(val?.totalWeeklyTimeTracked),
  },
];

const TimeSheet = () => {
  const [filterSheet, setFilterSheet] = useState(false);
  const [filterData, setFilterData] = useState<timeSheetFilterProps>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetTimeSheet({
    pagination,
    filter: {
      employeeId: filterData?.employeeId,
      startDate: filterData?.startDate,
      endDate: filterData?.endDate,
      date: filterData?.date,
      period: filterData?.period,
    },
  });

  return (
    <>
      <AttendanceSubToper active="time-sheet" />
      <FilterTimeSheet
        open={filterSheet}
        handleClose={() => setFilterSheet(false)}
        setFilterData={setFilterData}
      />
      <div className="Container">
        <PageIntro title="Timesheet" link={appRoutes.attendanceHome} />
        <p className="pt-2">
          Welcome on board, here is a detailed list of clocked work hours and
          breaks of all employee.
        </p>

        <div className="flex justify-between items-center mt-10 mb-7">
          <div className="flex items-center gap-x-5">
            <Link className="button" to={appRoutes.uploadAttendance}>
              Upload Timesheet
            </Link>
            {filterData !== undefined && (
            <AppButton
              variant="transparent"
              label="Reset Report"
              handleClick={() => setFilterData(undefined)}
            />
          )}
          </div>

          <div className="flex items-center gap-x-3">
            <button
              className="flex items-center gap-x-2 transparentButton"
              onClick={() => setFilterSheet(true)}
            >
              <span className="text-caramel font-medium">Filter</span>
              <i className="ri-filter-2-line text-caramel"></i>
            </button>
            <a href="#" className="button">
            <span>Export</span>
          </a>
          </div>
        </div>

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
