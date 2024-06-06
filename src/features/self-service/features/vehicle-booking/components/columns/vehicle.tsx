import { ColumnsType } from "antd/lib/table";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { TVehicle } from "../../hooks/useFetchVehicles";
import { generateVehicleName } from "../../utils/generateVehicleName";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

export const VEHICLES_TABLE_COLUMNS = (): ColumnsType<TVehicle> => [
  {
    title: "Vehicle Name",
    dataIndex: "name",
    key: "name",
    render: (val, item) => (
      <Link
        to={`${appRoutes.vehicleDetails(item.id).path}`}
        className="text-caramel hover:underline hover:text-caramel"
      >
        {generateVehicleName(item)}
      </Link>
    ),
  },
  {
    title: "Plate No",
    dataIndex: "Plate No",
    key: "Plate No",
    render: (_, item) => item.plateNumber,
  },
  {
    title: "Vehicle Type",
    dataIndex: "Vehicle Type",
    key: "Vehicle Type",
    render: (_, item) => item.type,
  },

  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
    render: (_, item) => item.status,
  },
  {
    title: "Color",
    dataIndex: "Color",
    key: "Color",
    render: (_, item) => item.color,
  },
  {
    title: "Assigned to",
    dataIndex: "Assigned to",
    key: "Assigned to",
    render: (_, item) => (
      <span className="capitalize">{getEmployeeFullName(item.assignee)}</span>
    ),
  },
];
export const VEHICLES_EXPORT_COLUMNS = (
  items?: TVehicle[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      "Vehicle Name": generateVehicleName(item),
      "Plate No": item.plateNumber,

      "Vehicle Type": item.type,
      Status: item.status,
      Color: item.color,
      "Assigned to": getEmployeeFullName(item.assignee),
    })) ?? []
  );
};
