import { Table } from "antd";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { Link } from "react-router-dom";

const HandOver = () => {
  const columns: any = [
    {
      title: "Separation Date",
      dataIndex: "SeparationDate",
      key: "SeparationDate",
    },
    {
      title: "Employee Name",
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
      title: "Reason",
      dataIndex: "Reason",
      key: "Reason",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "View",
      key: "view",
      width: 100,
      fixed: "right",
      render: () => (
        <div className="cursor-pointer">
          <Link to="/self-service/handover-form/1">
            <i className="ri-eye-line text-lg"></i>
          </Link>
        </div>
      ),
    },
  ];

  const dataSource = Array(20)
    .fill({
      SeparationDate: "DD/MM/YY",
      name: "Godwin Ruth",
      EmployeeID: "ES_23",
      department: "Dev Team",
      Reason: "Promotion",
      Status: "Pending",
    })
    .map((item, i) => ({ ...item, key: i }));
  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-extrabold ">
            <Link to="/self-service/home">
              <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
            </Link>
            <h2 className="text-xl md:text-2xl text-accent">Hand over Form</h2>
          </div>
          <Link to="/self-service/handover-new-form" className="button">
            New Form
          </Link>
        </div>

        <div className="mt-4">
          <Table
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: "max-content" }}
            // scroll={{ x: 500 }}
          />
        </div>
      </div>
    </>
  );
};

export default HandOver;
