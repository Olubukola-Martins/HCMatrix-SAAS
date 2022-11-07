import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import PayrollSubNav from "../Components/PayrollSubNav";
import ViewPayslip from "../Components/ViewPayslip";
import { Table, Space, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const EmployeePayslips = () => {
  const [view, setView] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      // ellipsis: true,

      // width: 100,
    },
    {
      title: "PayDate",
      dataIndex: "PayDate",
      key: "PayDate",
    },

    {
      title: "Employee ID",
      dataIndex: "Employee ID",
      key: "Employee ID",
    },
    {
      title: "Pay Type",
      dataIndex: "Pay Type",

      key: "Pay Type",
    },
    {
      title: "Net Pay",
      dataIndex: "Net Pay",

      key: "Net Pay",
    },
    {
      title: "Gross Pay",
      dataIndex: "Gross Pay",
      key: "Gross Pay",
    },
    {
      title: "Total Deductions",
      dataIndex: "Total Deductions",
      key: "Total Deductions",
      ellipsis: true,
    },
    {
      title: "Bonuses",
      dataIndex: "Bonuses",
      key: "Bonuses",
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (val, item) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="3">Action 1</Menu.Item>
                <Menu.Item key="2">Action 2</Menu.Item>
                <Menu.Item key="1">Action 3</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <EllipsisOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];
  const dataSource = Array(20)
    .fill({
      PayDate: "January",
      // Name: "John Capybaras Pseudonomas Areugonoso",
      Name: "John Areugonoso",
      "Employee ID": "ES_23",
      "Total Deductions": "none",
      "Gross Pay": 200,
      "Net Pay": 200,
      "Pay Type": 200,
      Bonuses: "none",
    })
    .map((item, i) => ({ ...item, key: i }));
  return (
    <DashboardLayout>
      <PayrollSubNav />

      <ViewPayslip open={view} handleClose={() => setView(false)} />

      <div className="Container">
        <div className="">
          <div className="flex gap-2 text-accent">
            <Link to="/payroll/payslip">
              <i className="ri-arrow-left-s-line text-xl cursor-pointer"></i>
            </Link>
            <div>
              <h5 className="font-black text-lg">Employees Payslips</h5>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button className="button">Export</button>
            <button className="transparentButton">September 2022</button>
          </div>
          <div className="mt-4">
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
        {/* <table className="payroll-table text-accent mt-7">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="" id="" />
              </th>
              <th>Pay Date</th>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Pay Type</th>
              <th>Net Pay</th>
              <th>Gross Pay</th>
              <th>Total Deductions</th>
              <th>Total Bonuses</th>
              <th>Tax</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
                <td>DD/MM/YY</td>
                <td>Ruth Godwin</td>
                <td>xxxx</td>
                <td>Salary</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td className="flex items-center gap-3">
                  <i
                    className="ri-eye-line text-lg cursor-pointer hover:text-caramel"
                    onClick={() => setView(true)}
                  ></i>
                  <i className="ri-download-2-line text-lg cursor-pointer hover:text-caramel"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </DashboardLayout>
  );
};

export default EmployeePayslips;
