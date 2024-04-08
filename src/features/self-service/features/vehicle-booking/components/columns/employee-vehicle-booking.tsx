import { ColumnsType } from "antd/lib/table";
import { generateVehicleName } from "../../utils/generateVehicleName";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TVehicleBooking } from "../../hooks/useFetchVehicleBookings";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { AppButton } from "components/button/AppButton";

export type TEmployeeVehicleBookingAction =
  | "add"
  | "view"
  | "cancel"
  | "view-approval-stages";

export const EMPLOYEE_VEHICLE_BOOKINGS_TABLE_COLUMNS = (
  handleAction: (
    action: TEmployeeVehicleBookingAction,
    item?: TVehicleBooking
  ) => void
): ColumnsType<TVehicleBooking> => [
  {
    title: "Booking Date",
    dataIndex: "Booking Date",
    key: "Booking Date",
    width: 120,
    render: (_, item) => moment(item.date).format(DEFAULT_DATE_FORMAT),
  },
  {
    title: "Employee",
    dataIndex: "Employee",
    key: "Employee",
    render: (_, item) => (
      <span className="capitalize">{getEmployeeFullName(item.employee)}</span>
    ),
  },
  {
    title: "Vehicle",
    dataIndex: "Vehicle",
    key: "Vehicle",
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
    render: (_, item) => (
      <span className="capitalize">{item.vehicle.type}</span>
    ),
  },

  {
    title: "Status",
    dataIndex: "Status",
    width: 80,
    key: "Status",
    render: (_, item) => (
      <span
        className={`capitalize`}
        style={{ color: getAppropriateColorForStatus(item.status) }}
      >
        {item.status}
      </span>
    ),
  },
  {
    title: "Duration(hrs)",
    dataIndex: "duration",
    width: 120,
    key: "duration",
    render: (_, item) => item.duration,
  },
  {
    title: "Destination",
    dataIndex: "destination",
    key: "destination",
    ellipsis: true,
    render: (_, item) => item.destination,
  },

  {
    title: "Action",
    key: "Action",
    render: (_, item) => (
      <div className="flex gap-3">
        <AppButton
          label="View"
          handleClick={() => handleAction("view", item)}
          variant="default"
        />
        <AppButton
          variant="transparent"
          label="View Stages"
          handleClick={() => handleAction("view-approval-stages", item)}
        />
        <AppButton
          variant="style-with-class"
          label="Cancel"
          disabled={item.status !== "pending"}
          additionalClassNames={[
            "neutralButton",
            "disabled:cursor-not-allowed",
            "disabled:bg-slate-200",
            "disabled:border-none",
          ]}
          handleClick={() => handleAction("cancel", item)}
        />
      </div>
    ),
  },
];
export const EMPLOYEE_VEHICLE_BOOKINGS_EXPORT_COLUMNS = (
  items?: TVehicleBooking[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      "Booking Date": moment(item.date).format(DEFAULT_DATE_FORMAT),
      Employee: getEmployeeFullName(item.employee),

      Vehicle: generateVehicleName(item.vehicle),
      "Plate No": item.vehicle.plateNumber,
      "Vehicle Type": item.vehicle.type,
      Status: item.status,
      "Duration(hrs)": item.duration,
      Destination: item.destination,
    })) ?? []
  );
};
