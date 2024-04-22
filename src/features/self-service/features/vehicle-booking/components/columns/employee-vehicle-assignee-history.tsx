import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import moment from "moment";
import { TVehicleAssigneeHistory } from "../../types/vehicleAssigneeHistory";
import { generateVehicleName } from "../../utils/generateVehicleName";

export const EMPLOYEE_VEHICLE_ASSIGNEE_HISTORY_TABLE_COLUMNS =
  (): ColumnsType<TVehicleAssigneeHistory> => [
    {
      title: "Date Returned",
      dataIndex: "Date Returned",
      key: "Date Returned",
      render: (_, item) =>
        moment(item.dateReturned).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
      render: (_, item) => generateVehicleName(item.vehicle),
    },
    {
      title: "Plate No",
      dataIndex: "Plate No",
      key: "Plate No",
      render: (_, item) => item.vehicle.plateNumber,
    },
    {
      title: "Vehicle Type",
      dataIndex: "Vehicle Type",
      key: "Vehicle Type",
      render: (_, item) => item.vehicle.type,
    },

    {
      title: "Assignee",
      dataIndex: "Assignee",
      key: "Assignee",
      render: (_, item) => (
        <span className={`capitalize`}>
          {getEmployeeFullName(item.assignee)}
        </span>
      ),
    },
    {
      title: "Duration(hrs)",
      dataIndex: "duration",
      key: "duration",
      render: (_, item) => item.duration,
    },
  ];

export const EMPLOYEE_VEHICLE_ASSIGNEE_HISTORY_EXPORT_COLUMNS = (
  items?: TVehicleAssigneeHistory[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      "Date Returned": moment(item.dateReturned).format(DEFAULT_DATE_FORMAT),
      Vehicle: generateVehicleName(item.vehicle),
      "Plate No": item.vehicle.plateNumber,
      "Vehicle Type": item.vehicle.type,
      Assignee: getEmployeeFullName(item.assignee),
      "Duration(hrs)": item.duration,
    })) ?? []
  );
};
