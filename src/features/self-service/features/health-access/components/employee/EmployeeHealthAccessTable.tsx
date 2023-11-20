import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";

import { TEmployeeHealthAccess } from "../../types/employee";
import { useGetEmployeeHealthAccesses } from "../../hooks/employee/useGetEmployeeHealthAccesses";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { RemoveEmployeeHealthAccess } from "./RemoveEmployeeHealthAccess";
import { EditEmployeeHMOPlan } from "./EditEmployeeHMOPlan";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

type TAction = "edit-employee-hmo-plan" | "view" | "delete";
export const EmployeeHealthAccessTable: React.FC<{
  search?: string;
  departmentId?: number;
}> = ({ search, departmentId }) => {
  const [employee, setEmployee] = useState<TEmployeeHealthAccess>();
  const [action, setAction] = useState<TAction>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetEmployeeHealthAccesses({
    pagination,
    searchParams: { name: search },
    departmentId,
  });
  const handleAction = (action: TAction, data: TEmployeeHealthAccess) => {
    setAction(action);
    setEmployee(data);
  };

  const columns: ColumnsType<TEmployeeHealthAccess> = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => (
        <Link
          to={`${appRoutes.healthAccessDetails(item.id).path}`}
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
      render: (_, item) => (
        <span className="capitalize">{item.dependents} </span>
      ),
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
          <Button title="Actions" icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <EditEmployeeHMOPlan
        handleClose={() => setAction(undefined)}
        healthAccess={employee}
        open={action === "edit-employee-hmo-plan"}
      />
      <RemoveEmployeeHealthAccess
        handleClose={() => setAction(undefined)}
        healthAccess={employee}
        open={action === "delete"}
      />
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={columns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
