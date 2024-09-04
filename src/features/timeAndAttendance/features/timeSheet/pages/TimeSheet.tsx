import Table from "antd/lib/table";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import { useGetTimeSheet } from "../hooks/useGetTimeSheet";
import { timeSheetFilterProps } from "../types";
import { usePagination } from "hooks/usePagination";
import { FilterTimeSheet } from "../components/FilterTimeSheet";
import { AppButton } from "components/button/AppButton";
import { openNotification } from "utils/notifications";
import { AddManuelAttendance } from "../components/AddManuelAttendance";
import { Dropdown, Menu } from "antd";
import { AddMultipleAttendance } from "../components/AddMultipleAttendance";
import { useGetActiveTrackingPolicy } from "../../settings/timeTrackingRules/hooks/useGetActiveTrackingPolicy";
import { TIME_SHEET_TABLE_COLUMNS } from "../components/columns";
import ExportTimeSheet from "../components/exports/ExportTimeSheet";
import { TableWithFocusType } from "components/table";
import { PermissionRestrictor } from "components/permission-restriction/PermissionRestrictor";

const TimeSheet = () => {
  const [filterSheet, setFilterSheet] = useState(false);
  const [addMultiple, setAddMultiple] = useState(false);
  const [addAttendance, setAddAttendance] = useState(false);
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
  const { data: policyData } = useGetActiveTrackingPolicy();

  const noAttendance = () => {
    openNotification({
      state: "error",
      title: "Error",
      description: "Attendance not found",
      duration: 4.5,
    });
  };

  const columns = TIME_SHEET_TABLE_COLUMNS(noAttendance);

  return (
    <>
      <AttendanceSubToper active="time-sheet" />
      <FilterTimeSheet
        open={filterSheet}
        handleClose={() => setFilterSheet(false)}
        setFilterData={setFilterData}
      />
      <AddManuelAttendance
        open={addAttendance}
        handleClose={() => setAddAttendance(false)}
      />
      <AddMultipleAttendance
        open={addMultiple}
        handleClose={() => setAddMultiple(false)}
      />
      <div className="Container">
        <PageIntro title="Timesheet" link={appRoutes.attendanceHome} />
        <p className="pt-2">
          Welcome on board, here is a detailed list of clocked work hours and
          breaks{" "}
          <PermissionRestrictor
            requiredPermissions={["view-all-time-and-attendance-timesheet"]}
          >
            <span>of all employee</span>
          </PermissionRestrictor>
          .
        </p>

        <div className="flex justify-between items-center mt-10 mb-7">
          <div className="flex items-center gap-x-5">
            <PermissionRestrictor
              requiredPermissions={["upload-time-and-attendance-timesheet"]}
            >
              <Dropdown
                trigger={["click"]}
                disabled={policyData?.title === "Mandatory" ? true : false}
                overlay={
                  <Menu>
                    <Menu.Item key="1" onClick={() => setAddAttendance(true)}>
                      Add Single
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => setAddMultiple(true)}>
                      Add Bulk
                    </Menu.Item>
                  </Menu>
                }
              >
                <button className="button flex items-center gap-3">
                  <span>Upload Timesheet</span>
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </Dropdown>
            </PermissionRestrictor>

            <PermissionRestrictor
              requiredPermissions={["view-all-time-and-attendance-timesheet"]}
            >
              {filterData !== undefined && (
                <AppButton
                  variant="transparent"
                  label="Reset Report"
                  handleClick={() => setFilterData(undefined)}
                />
              )}
            </PermissionRestrictor>
          </div>

          <div className="flex items-center gap-x-3">
            <button
              className="flex items-center gap-x-2 transparentButton"
              onClick={() => setFilterSheet(true)}
            >
              <span className="text-caramel font-medium">Filter</span>
              <i className="ri-filter-2-line text-caramel"></i>
            </button>
            <ExportTimeSheet
              trigger={<button className="button">Export</button>}
            />
          </div>
        </div>

        <PermissionRestrictor
          requiredPermissions={["view-all-time-and-attendance-timesheet"]}
        >
          <TableWithFocusType
            columns={columns}
            dataSource={data?.data}
            scroll={{ x: 500 }}
            loading={isLoading}
            pagination={{ ...pagination, total: data?.total }}
            onChange={onChange}
          />
        </PermissionRestrictor>
      </div>
    </>
  );
};

export default TimeSheet;
