import { Table } from "antd";
import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { ImportEmployee } from "../../../Components/Organization/EmployeeProfiles/ImportEmployee";

const Employees = () => {
  const [importEmployeeDrawer, setImportEmployeeDrawer] = useState(false);

  interface DataType {
    key: React.Key;
    name: string;
    EmployeeID: string;
    department: string;
    Role: string;
    Email: string;
    Status: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Role",
      dataIndex: "Role",
      key: "Role",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
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
        <div className="flex items-center gap-3">
          <Link to="#!">
            <i className="ri-eye-line text-lg cursor-pointer hover:text-caramel"></i>
          </Link>
          <i className="ri-pencil-line text-lg cursor-pointer hover:text-caramel"></i>
        </div>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "Godswill Onyeka",
      EmployeeID: "123",
      department: "Dev team",
      Role: "Front dev",
      Email: "godswill@snapnetsolution.com",
      Status: "confirm",
    },
    {
      key: "2",
      name: "Godswill Onyeka",
      EmployeeID: "123",
      department: "Dev team",
      Role: "Front dev",
      Email: "godswill@snapnetsolution.com",
      Status: "confirm",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <DashboardLayout>
      <ImportEmployee
        open={importEmployeeDrawer}
        handleClose={() => setImportEmployeeDrawer(false)}
      />
      <div className="Container">
        <PageIntro title="Employees" link="/settings" />
        <div className="flex justify-between md:flex-row flex-col gap-3 md:gap-0 md:items-center mt-7">
          <div>
            <button className="transparentButton flex items-center gap-3">
              <span>Download</span> <i className="ri-download-2-line"></i>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/settings/add-employee" className="button">
              Add Employees
            </Link>
            <button
              className="transparentButton"
              onClick={() => setImportEmployeeDrawer(true)}
            >
              Import Employees
            </button>
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
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
