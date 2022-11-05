import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";
// import AddEmployee from "../../../Components/Organization/EmployeeProfiles/AddEmployee";
import { AddEmployee } from "../../../Components/Organization/EmployeeProfiles/AddEmployee";
// import { ImportEmployee } from "../../../Components/Organization/EmployeeProfiles/ImportEmployee";

const Employees = () => {
  const [addEmployeeDrawer, setAddEmployeeDrawer] = useState(false);
  const [importEmployeeDrawer, setImportEmployeeDrawer] = useState(false);
  const columns = [
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
      render: (val, item) => (
        <div className="flex items-center gap-3">
          <Link to="#!">
            <i className="ri-eye-line text-lg cursor-pointer hover:text-caramel"></i>
          </Link>
          <i className="ri-pencil-line text-lg cursor-pointer hover:text-caramel"></i>
        </div>
      ),
    },
  ];

  const dataSource = Array(5)
    .fill({
      name: "Godwin Ruth",
      EmployeeID: "ES_23",
      Role: "UI/UX Designer",
      department: "Dev Team",
      Email: "ruth@snapnetsolutions.com",
      Status: "Active",
    })
    .map((item, i) => ({ ...item, key: i }));
  return (
    <DashboardLayout>
      <AddEmployee
        open={addEmployeeDrawer}
        handleClose={() => setAddEmployeeDrawer(false)}
      />
      {/* <ImportEmployee
        open={importEmployeeDrawer}
        handleClose={() => setImportEmployeeDrawer(false)}
      /> */}
      <div className="Container">
        <PageIntro title="Employees" link="/settings" />

        <div className="flex justify-between md:flex-row flex-col gap-3 md:gap-0 md:items-center mt-7">
          <div>
            <button className="transparentButton flex items-center gap-3">
              <span>Download</span> <i className="ri-download-2-line"></i>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="button"
              onClick={() => setAddEmployeeDrawer(true)}
            >
              Add Employees
            </button>
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
            dataSource={dataSource}
            columns={columns}
            rowSelection={{
              type: "checkbox",
              rowSelection: () => {},
            }}
            scroll={{ x: "max-content" }}
            // scroll={{ x: 500 }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
