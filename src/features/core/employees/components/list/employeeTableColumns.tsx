import { ColumnsType } from "antd/lib/table";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { TEmployee } from "../../types";
import { getEmployeeStatusColor } from "../../utils/getEmployeeStatusColor";
import { getEmployeeFullName } from "../../utils/getEmployeeFullName";

export const EMPLOYEE_TABLE_COLUMNS: ColumnsType<TEmployee> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (val, item) => (
      <Link
        to={`${appRoutes.singleEmployee(item.id).path}`}
        className="text-caramel hover:underline hover:text-caramel capitalize"
      >
        {getEmployeeFullName(item)}
      </Link>
    ),
  },

  {
    title: "Employee ID",
    dataIndex: "employeeID",
    key: "employeeID",
    render: (_, item) => item.empUid,
  },
  {
    title: "License Type",
    dataIndex: "licenseType",
    key: "licenseType",
    render: (_, item) => <span className="capitalize">{item.licenseType}</span>,
  },
  {
    title: "Branch",
    dataIndex: "Branch",
    key: "Branch",
    render: (_, item) => (
      <span className="capitalize">
        {item?.jobInformation?.branch?.name ?? "none"}
      </span>
    ),
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    render: (_, item) => (
      <span className="capitalize">
        {item.designation?.department?.name ?? "none"}
      </span>
    ),
  },
  {
    title: "Designation",
    dataIndex: "Designation",
    key: "Designation",
    render: (_, item) => (
      <span className="capitalize">{item.designation?.name ?? "none"}</span>
    ),
  },

  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (_, item) => <span className="capitalize">{item.role.name}</span>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    ellipsis: true,
    width: 20,
  },
  {
    title: "Employee Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <span className={`capitalize ${getEmployeeStatusColor(status)}`}>
        {status}
      </span>
    ),
  },
  {
    title: "Verification Status",
    dataIndex: "verification",
    key: "verification",
    render: (_, item) => (
      <>
        {item.user?.isVerified ? (
          <span className="text-green-700 capitalize">Verified</span>
        ) : (
          <span className="text-red-500 capitalize">Unverified</span>
        )}
      </>
    ),
  },
];
export const EMPLOYEE_EXPORT_COLUMNS = (
  items?: TEmployee[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      Name: getEmployeeFullName(item),

      "Employee ID": item.empUid,

      "License Type": item?.licenseType ?? "none",
      Branch: item?.jobInformation?.branch?.name ?? "none",
      Department: item.designation?.department?.name ?? "none",
      Designation: item.designation?.name ?? "none",
      Role: item?.role?.name ?? "none",

      Email: item.email,
      "Verification Status": item?.user?.isVerified ? "Verified" : "Unverified",
      "Employee Status": item.status,
    })) ?? []
  );
};
