import Table from "antd/lib/table";
import { ReportNav } from "../components/ReportNav";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { filterReportProps } from "../types";
import { useGetHoursPerEmployee } from "../hooks/useGetHoursPerEmployee";
import { usePagination } from "hooks/usePagination";
import { useState } from "react";
import { AppButton } from "components/button/AppButton";
import { FilterHoursPerEmployee } from "../components/FilterHoursPerEmployee";
import { HOURS_PER_SHIFT_TABLE_COLUMNS } from "../components/columns/hoursPerShiftColumn";
import ExportHourPerEmployee from "../components/exports/ExportHourPerEmployee";

const columns = HOURS_PER_SHIFT_TABLE_COLUMNS();

const HoursPerEmployee = () => {
  const [filterData, setFilterData] = useState<filterReportProps>();
  const [openFilter, setOpenFilter] = useState(false);
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetHoursPerEmployee({
    pagination,
    filter: {
      departmentId: filterData?.departmentId,
      employeeId: filterData?.employeeId,
      startDate: filterData?.startDate,
      endDate: filterData?.endDate,
    },
  });

  return (
    <>
      <FilterHoursPerEmployee
        open={openFilter}
        handleClose={() => setOpenFilter(false)}
        setFilterData={setFilterData}
      />
      <AttendanceSubToper active="reports" />
      <ReportNav active="Hours_Per_Employee" />
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
          <ExportHourPerEmployee
            trigger={<button className="button">Export</button>}
          />
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

export default HoursPerEmployee;
