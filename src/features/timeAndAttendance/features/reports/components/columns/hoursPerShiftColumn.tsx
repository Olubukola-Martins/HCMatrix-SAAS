import { ColumnsType } from "antd/lib/table";
import { shiftPerEmployeeProps } from "../../types";
import { convertMinutesToHours } from "features/timeAndAttendance/utils";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

export const HOURS_PER_SHIFT_TABLE_COLUMNS =
  (): ColumnsType<shiftPerEmployeeProps> => [
    {
      title: "Employees",
      key: "employee",
      render: (_, val) => (
        <span className="capitalize">
          {val?.employee?.firstName} {val?.employee?.lastName}
        </span>
      ),
    },
    {
      title: "Department",
      key: "designation",
      render: (_, val) => (
        <span className="capitalize">
          {val?.employee?.designation?.department?.name}
        </span>
      ),
    },
    {
      title: "Tracked time",
      key: "totalTimeTracked",
      render: (_, val) => convertMinutesToHours(val?.totalTimeTracked),
    },
  ];

export const HOUR_PER_SHIFT_EXPORT_COLUMNS = (
  items?: shiftPerEmployeeProps[]
): Record<string, string | number>[] => {
  return (
    items?.map((val) => ({
      Employee: getEmployeeFullName(val?.employee),
      Department: val?.employee?.designation?.department?.name,
      Tracked_Time: convertMinutesToHours(val?.totalTimeTracked),
    })) ?? []
  );
};
