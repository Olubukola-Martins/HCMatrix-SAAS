import { Dropdown, Menu } from "antd";
import { appRoutes } from "config/router/paths";
import React from "react";
import { Link } from "react-router-dom";

const dropdownItems = [
  {
    link: appRoutes.createOfficePayroll,
    name: "Office",
  },
  {
    link: appRoutes.createDirectSalaryPayroll,
    name: "Direct Salary",
  },
  {
    link: appRoutes.createWagesPayroll,
    name: "Wages",
  },
  {
    link: appRoutes.createProjectPayroll,
    name: "Project",
  },
];

export const CreatePayrollButton = () => {
  return (
    <Dropdown
      overlay={
        <Menu
          items={dropdownItems.map((item) => ({
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
