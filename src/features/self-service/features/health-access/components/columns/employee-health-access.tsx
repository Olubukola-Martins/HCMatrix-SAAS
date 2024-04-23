import { Dropdown, Menu, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { appRoutes } from "config/router/paths";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { AiOutlineMore } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TEmployeeHealthAccess } from "../../types/employee";
import { TEmployeeHealthAccessAction } from "../employee/EmployeeHealthAccessTable";

export const EMPLOYEE_HEALTH_ACCESS_TABLE_COLUMNS = (
  handleAction: (
    action: TEmployeeHealthAccessAction,
    data: TEmployeeHealthAccess
  ) => void
): ColumnsType<TEmployeeHealthAccess> => [
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    render: (_, item) => (
      <Link
        to={`${appRoutes.healthAccessDetails(item.employeeId).path}`}
        className="text-caramel hover:underline hover:text-caramel"
      >
        {getEmployeeFullName(item.employee)}
      </Link>
    ),
  },
  {
    title: "Email",
    dataIndex: "Email",
    key: "Email",
    render: (_, item) => (
      <span className="lowercase">{item.employee.email} </span>
    ),
  },
  {
    title: "Health Plan",
    dataIndex: "Health Plan",
    key: "Health Plan",
    render: (_, item) => (
      <span className="capitalize">{item.hmoPlan.name} </span>
    ),
  },

  {
    title: "No of Dependents",
    dataIndex: "No of Dependents",
    key: "No of Dependents",
    render: (_, item) => <span className="capitalize">{item.dependents} </span>,
  },

  {
    title: "Action",
    key: "action",
    render: (_, item) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              key="edit-employee-hmo-plan"
              onClick={() => handleAction("edit-employee-hmo-plan", item)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              key="delete"
              onClick={() => handleAction("delete", item)}
            >
              Remove
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <Button title="Actions" icon={<AiOutlineMore />} type="text" />
      </Dropdown>
    ),
  },
];
