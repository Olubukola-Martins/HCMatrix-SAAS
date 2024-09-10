import { TableWithFocusType } from "components/table";
import { TIME_SHEET_TABLE_COLUMNS } from "./columns";
import { openNotification } from "utils/notifications";
import { usePagination } from "hooks/usePagination";
import { useGetTimeSheet } from "../hooks/useGetTimeSheet";
import { useGetActiveTrackingPolicy } from "../../settings/timeTrackingRules/hooks/useGetActiveTrackingPolicy";
import { Dropdown, Menu } from "antd";
import { useState } from "react";
import ExportTimeSheet from "./exports/ExportTimeSheet";
import { AddManuelAttendance } from "./AddManuelAttendance";
import { AddMultipleAttendance } from "./AddMultipleAttendance";
import { TSheetIProps } from "./EmployeeTimeSheet";
import { AppButton } from "components/button/AppButton";
import { noAttendance } from "features/timeAndAttendance/utils";

export const TimeSheetWithPermission = ({
  filterData,
  setFilterData,
  setFilterSheet,
}: TSheetIProps) => {
  const [addMultiple, setAddMultiple] = useState(false);
  const [addAttendance, setAddAttendance] = useState(false);
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

  const columns = TIME_SHEET_TABLE_COLUMNS(noAttendance);

  return (
    <div>
      <AddManuelAttendance
        open={addAttendance}
        handleClose={() => setAddAttendance(false)}
      />
      <AddMultipleAttendance
        open={addMultiple}
        handleClose={() => setAddMultiple(false)}
      />
      <div className="flex justify-between items-center mt-10 mb-7">
        <div className="flex items-center gap-x-5">
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
          {filterData !== undefined && (
            <AppButton
              variant="transparent"
              label="Reset Result"
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
          <ExportTimeSheet
            trigger={<button className="button">Export</button>}
          />
        </div>
      </div>
      <TableWithFocusType
        columns={columns}
        dataSource={data?.data}
        scroll={{ x: 500 }}
        loading={isLoading}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
