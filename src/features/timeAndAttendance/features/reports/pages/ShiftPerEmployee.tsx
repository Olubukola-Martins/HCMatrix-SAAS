import Table, { ColumnsType } from "antd/lib/table";
import { ReportNav } from "../components/ReportNav";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useGetShiftPerEmployee } from "../hooks/useGetShiftPerEmployee";
import { usePagination } from "hooks/usePagination";
import { filterReportProps, shiftPerEmployeeProps } from "../types";
import { convertMinutesToHours } from "features/timeAndAttendance/utils";
import { FilterShiftPerEmployee } from "../components/FilterShiftPerEmployee";
import { useState } from "react";
import { AppButton } from "components/button/AppButton";

const columns: ColumnsType<shiftPerEmployeeProps> = [
  {
    title: "Employees",
    dataIndex: "employee",
    render: (_, val) => (
      <span className="capitalize">
        {val?.employee?.firstName} {val?.employee?.lastName}
      </span>
    ),
  },
  {
    title: "Department",
    dataIndex: "department",
    render: (_, val) => (
      <span className="capitalize">{val?.department?.name}</span>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Tracked time",
    dataIndex: "trackedTime",
    render: (_, val) => convertMinutesToHours(val?.trackedTime),
  },
  {
    title: "Shift Type",
    dataIndex: "shiftType",
  },
];

export const ShiftPerEmployee = () => {
  const [filterData, setFilterData] = useState<filterReportProps>();
  const [openFilter, setOpenFilter] = useState(false);
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetShiftPerEmployee({
    pagination,
    filter: {
      departmentId: filterData?.departmentId,
      employeeId: filterData?.employeeId,
      startDate: filterData?.startDate,
      endDate: filterData?.endDate,
      shiftTypes: filterData?.shiftTypes,
    },
  });

  return (
    <>
      <FilterShiftPerEmployee
        open={openFilter}
        handleClose={() => setOpenFilter(false)}
        setFilterData={setFilterData}
      />
      <AttendanceSubToper active="reports" />
      <ReportNav active="Shift_Per_Employee" />
      <div className="Container flex items-center justify-between mb-5">
        <div className="flex items-center gap-5">
          <PageIntro title="Report" link={appRoutes.attendanceHome} />
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
            onClick={() => setOpenFilter(true)}
          >
            <span className="text-caramel font-medium">Filter</span>
            <i className="ri-filter-2-line text-caramel"></i>
          </button>
          <a href="#" className="button">
            <span>Export</span>
          </a>
        </div>
      </div>
      <div className="Container">
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

export default ShiftPerEmployee;
