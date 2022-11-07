import { Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { PageIntro } from "../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";

const Onboarding = () => {
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
        <div className="cursor-pointer">
          <Link to="/self-service/onboarding/1">
            <button className="transparentButton text-caramel">Start</button>
          </Link>
        </div>
      ),
    },
  ];

  const dataSource = Array(5)
    .fill({
      name: "Godwin Ruth",
      EmployeeID: "ES_23",
      department: "Dev Team",
      Email: "ruth@snapnetsolutions.com",
      Status: "Not Start",
    })
    .map((item, i) => ({ ...item, key: i }));
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <div className="Container">
        <PageIntro link="/self-service/home" title="Onboarding" />

        <div className="flex items-center gap-4 justify-end">
          <button className="button">Start</button>
          <button className="transparentButton text-caramel">
            Mark as completed
          </button>
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
            scroll={{ x: 500 }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Onboarding;
