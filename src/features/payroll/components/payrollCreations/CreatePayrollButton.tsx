import { Dropdown, Menu } from "antd";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { appRoutes } from "config/router/paths";
import React from "react";
import { Link } from "react-router-dom";

export const createPayrollDropdownItems = [
  {
    link: appRoutes.createOfficePayroll,
    name: "Step Pay ",
    label: "office",
  },
  {
    link: appRoutes.createDirectSalaryPayroll,
    name: "Direct Salary",
    label: "direct-salary",
  },
  {
    link: appRoutes.createWagesPayroll,
    name: "Wages",
    label: "wages",
  },
  {
    link: appRoutes.createProjectPayroll,
    name: "Project",
    label: "project",
  },
];

export const CreatePayrollButton = () => {
  const { userPermissions, companyActiveSubscription: activeSubscription } =
    useGetUserPermissions();
  if (
    !canUserAccessComponent({
      userPermissions,
      requiredPermissions: ["create-payroll"],
      activeSubscription,
      requiredSubscriptionState: {
        label: "payroll",
        resources: [
          "wages-payroll",
          "office-payroll",
          "direct-salary-payroll",
          "project-payroll",
        ],
      },
    })
  ) {
    return null;
  }
  return (
    <Dropdown
      overlay={
        <Menu
          items={createPayrollDropdownItems.map((item) => ({
            title: item.name,
            key: item.name,
            label: <Link to={item.link}>{item.name}</Link>,
          }))}
        />
      }
      trigger={["click"]}
    >
      <button className="button flex items-center gap-2">
        <span>Create Payroll</span> <i className="fa-solid fa-chevron-down"></i>
      </button>
    </Dropdown>
  );
};
