import { ReportNav } from "../components/ReportNav";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { filterReportProps } from "../types";
import { useState } from "react";
import { usePagination } from "hooks/usePagination";
import { useGetShiftPerEmployee } from "../hooks/useGetShiftPerEmployee";
import { FilterShiftPerEmployee } from "../components/FilterShiftPerEmployee";
import { AppButton } from "components/button/AppButton";
import ExportEmployeePerShift from "../components/exports/ExportEmployeePerShift";
import { EMPLOYEE_PER_SHIFT_TABLE_COLUMNS } from "../components/columns/employeePerShiftColumn";
import { TableWithFocusType } from "components/table";

const columns = EMPLOYEE_PER_SHIFT_TABLE_COLUMNS();

const EmployeesPerShift = () => {
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
      <ReportNav active="Employee_Per_shift" />
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
          <ExportEmployeePerShift
            trigger={<button className="button">Export</button>}
          />
        </div>
      </div>

      <div className="Container">
        <TableWithFocusType
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

export default EmployeesPerShift;
