import { Button, Table, Select, Dropdown, Menu } from "antd";
import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import {
  FilterOutlined,
  QuestionCircleFilled,
  DownloadOutlined,
} from "@ant-design/icons";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import UploadFileModal from "../../../Components/Organization/EmployeeProfiles/UploadFileModal";
import FilterEmployeeDrawer from "../../../Components/Organization/EmployeeProfiles/FilterEmployeeDrawer";
import { EmployeeDataType } from "../../../../AppTypes/DataEntitities";
import { AddMultipleEmployees } from "../../../Components/Organization/EmployeeProfiles/AddMultipleEmployees";

const Employees = () => {
  const [importEmployeeDrawer, setImportEmployeeDrawer] = useState(false);
  const [openF, setOpenF] = useState(false);
  const [addMEmployees, setAddMEmployees] = useState(false);

  const employeeStatus = [
    { label: "Total (100)", value: "total" },
    { label: "Confirmed(20)", value: "confirmed" },
    { label: "Probation (10)", value: "probation" },
    // { label: "on-leave", value: "on-leave" },
    { label: "Suspended(10)", value: "suspended" },
    { label: "Inactive (60)", value: "inactive" },
    // { label: "resigned", value: "resigned" },
    // { label: "on-contract", value: "on-contract" },
    // { label: "off-contract", value: "off-contract" },
  ];

  const columns: ColumnsType<EmployeeDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Employee ID",
      dataIndex: "EmployeeID",
      key: "EmployeeID",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      ellipsis: true,
      width: 20,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Action",
      key: "Action",
      width: 100,
      fixed: "right",
      render: () => (
        <div className="flex items-center gap-3 text-sm">
          <Link to="#!">
            <i className="ri-eye-line  cursor-pointer hover:text-caramel"></i>
          </Link>
          <i className="ri-pencil-line  cursor-pointer hover:text-caramel"></i>
          <i className="ri-delete-bin-line  cursor-pointer hover:text-caramel"></i>
        </div>
      ),
    },
  ];

  const data: EmployeeDataType[] = [
    {
      key: "1",
      name: "Godswill Onyeka",
      EmployeeID: "123",
      department: "Dev team",
      gender: "male",
      designation: "Front dev",
      Email: "godswill@snapnetsolution.com",
      Status: "confirmed",
      Role: "Employee",
    },
    {
      key: "2",
      name: "Godswill Onyeka",
      EmployeeID: "123",
      department: "Dev team",
      gender: "male",
      Role: "Employee",
      designation: "Front dev",
      Email: "godswill@snapnetsolution.com",
      Status: "probation",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: EmployeeDataType[]
    ) => {},
  };

  return (
    <DashboardLayout>
      <UploadFileModal
        open={importEmployeeDrawer}
        handleClose={() => setImportEmployeeDrawer(false)}
      />
      <FilterEmployeeDrawer open={openF} handleClose={() => setOpenF(false)} />
      <AddMultipleEmployees
        open={addMEmployees}
        handleClose={() => setAddMEmployees(false)}
      />
      <div className="Container">
        <PageIntro title="Employees" link="/settings" />
        <div className="flex justify-between md:flex-row flex-col gap-3 md:gap-0 md:items-center mt-12">
          <div className="flex gap-2 items-center">
            <Select
              className="w-32"
              defaultValue={"total"}
              options={employeeStatus.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
            <button className="button flex items-center gap-3">
              <span>100</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <Link to="/settings/add-employee">Add Employee</Link>
                  </Menu.Item>
                  <Menu.Item onClick={() => setAddMEmployees(true)}>
                    Add Multiple Users
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <button className="button flex items-center gap-2">
                <span>Add</span> <i className="fa-solid fa-chevron-down"></i>
              </button>
            </Dropdown>

            <button
              className="transparentButton"
              onClick={() => setImportEmployeeDrawer(true)}
            >
              Import Employees
            </button>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>Import from GApps</Menu.Item>
                  <Menu.Item>Import from Office 365</Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <button className="transparentButton flex items-center gap-2">
                <span>Sync</span> <i className="fa-solid fa-chevron-down"></i>
              </button>
            </Dropdown>
            <Button
              icon={<FilterOutlined />}
              type="text"
              onClick={() => setOpenF(true)}
              title="Filter Employees"
            />
            <Button
              icon={<DownloadOutlined />}
              type="text"
              title="Downlaod Employee Data"
            />
            <Button
              icon={<QuestionCircleFilled />}
              type="text"
              title="Provides information on page"
            />
          </div>
        </div>

        <div className="mt-7">
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            scroll={{ x: "max-content" }}
            className="mt-5"
            size="small"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
