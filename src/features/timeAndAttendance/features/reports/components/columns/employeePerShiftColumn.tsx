import { ColumnsType } from "antd/lib/table";
import { shiftPerEmployeeProps } from "../../types";
import { convertMinutesToHours } from "features/timeAndAttendance/utils";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

export const EMPLOYEE_PER_SHIFT_TABLE_COLUMNS =
  (): ColumnsType<shiftPerEmployeeProps> => [
    {
      title: "Employees",
      key: "employee",
      render: (_, val) => (
        <span className="capitalize">{getEmployeeFullName(val?.employee)}</span>
      ),
    },
    {
      title: "Tracked time",
      key: "trackedTime",
      render: (_, val) => convertMinutesToHours(val?.trackedTime),
    },
    {
      title: "Supervisors/shift-in-charge",
      key: "supervisor",
      render: (_, val) => (
        <span className="capitalize">
          {val?.departmentHead?.firstName} {val?.departmentHead?.lastName}
        </span>
      ),
    },
    {
      title: "Shift Type",
      key: "shiftType",
      render: (_, val) => <span className="capitalize">{val?.shiftType}</span>,
    },
  ];

export const EMPLOYEE_PER_SHIFT_EXPORT_COLUMNS = (
  items?: shiftPerEmployeeProps[]
): Record<string, string | number>[] => {
  return (
    items?.map((val) => ({
      Employee: getEmployeeFullName(val?.employee),
      Tracked_time: convertMinutesToHours(val?.trackedTime),
      Supervisors: `${val?.departmentHead?.firstName} ${val?.departmentHead?.lastName}`,
      Shift_type: val?.shiftType,
    })) ?? []
  );
};
