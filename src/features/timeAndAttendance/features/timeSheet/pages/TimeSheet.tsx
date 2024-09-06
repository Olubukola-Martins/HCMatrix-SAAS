import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import { timeSheetFilterProps } from "../types";
import { FilterTimeSheet } from "../components/FilterTimeSheet";
import { AppButton } from "components/button/AppButton";
import {  Select } from "antd";
import { PermissionRestrictor } from "components/permission-restriction/PermissionRestrictor";
import { EmployeeTimeSheet } from "../components/EmployeeTimeSheet";
import { TimeSheetWithPermission } from "../components/TimeSheetWithPermission";

const TimeSheet = () => {
  const [filterSheet, setFilterSheet] = useState(false);
  const [switchView, setSwitchView] = useState("mine");
  const [filterData, setFilterData] = useState<timeSheetFilterProps>();

  return (
    <>
      <AttendanceSubToper active="time-sheet" />
      <FilterTimeSheet
        open={filterSheet}
        handleClose={() => setFilterSheet(false)}
        setFilterData={setFilterData}
      />

      <div className="Container">
        <div className="flex items-center justify-between">
          <PageIntro title="Timesheet" link={appRoutes.attendanceHome} />

          <PermissionRestrictor
            requiredPermissions={["view-all-time-and-attendance-timesheet"]}
          >
            <Select
              value={switchView}
              onChange={(val) => setSwitchView(val)}
              placeholder="Select View"
              allowClear
              options={[
                { label: "My Timesheet", value: "mine" },
                { label: "Employee's Timesheet", value: "withPermission" },
              ]}
              className="w-[12rem]"
            />
          </PermissionRestrictor>
        </div>
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

        {switchView === "mine" ? (
          <EmployeeTimeSheet />
        ) : (
          <TimeSheetWithPermission />
        )}
      </div>
    </>
  );
};

export default TimeSheet;
