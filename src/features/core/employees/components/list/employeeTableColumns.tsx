import { ColumnsType } from "antd/lib/table";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { TEmployee } from "../../types";
import { getEmployeeStatusColor } from "../../utils/getEmployeeStatusColor";

export const EMPLOYEE_TABLE_COLUMNS: ColumnsType<TEmployee> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (val, item) => (
      <Link
        to={`${appRoutes.singleEmployee(item.id).path}`}
        className="text-caramel hover:underline hover:text-caramel"
      >
        {item.firstName} {item.lastName}
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
    title: "Department",
    dataIndex: "department",
    key: "department",
    render: (_, item) => item.designation?.department?.name ?? "none",
  },
  {
    title: "Designation",
    dataIndex: "Designation",
    key: "Designation",
    render: (_, item) => item.designation?.name ?? "none",
  },

  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (_, item) => item.role.name,
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
];
