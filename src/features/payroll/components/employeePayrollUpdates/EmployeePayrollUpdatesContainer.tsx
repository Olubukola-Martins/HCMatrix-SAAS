import { Button, Table, Switch, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { usePagination } from "hooks/usePagination";
import { MoreOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { TSalaryComponent } from "features/payroll/types";
import { ALLOWANNCES } from "features/payroll/constants";
import { AddSalaryComponent } from "../salaryComponents/AddSalaryComponent";
import ViewPayrollBreakdown from "../ViewPayrollBreakdown";
import ModifyPayrollBreakdown from "../ModifyPayrollBreakdown";

interface IProps {
  expatriate: boolean;
}

type TEmpPayrollDetail = {
  name: string;
  grossPay: number;
  netPay: number; // sum of allowances and deductions
  totalDeductions: number;
  totalAllowances: number;
  tax: number;
  payrollScheme: "direct-salary" | "grade" | "wages" | "project"; //project just means that the employee is part of a project(should not be used really cos the project consultant will handle this)
};

export const EmployeePayrollUpdatesContainer: React.FC<IProps> = ({
  expatriate = false,
}) => {
  const { pagination, onChange } = usePagination();
  const [showBreak, setShowBreak] = useState(false);
  const [showMod, setShowMod] = useState(false);
  const columns: ColumnsType<TEmpPayrollDetail> = [
    {
      title: "Name",
      dataIndex: "uid",
      key: "uid",
      render: (_, item) => item.name,
    },
    {
      title: "Payroll Scheme",
      dataIndex: "ps",
      key: "ps",
      render: (_, item) => item.payrollScheme,
    },
    {
      title: "Net Pay",
      dataIndex: "np",
      key: "np",
      render: (_, item) => item.netPay,
    },
    {
      title: "Gross Pay",
      dataIndex: "gp",
      key: "gp",
      render: (_, item) => item.grossPay,
    },
    {
      title: "Total Deductions",
      dataIndex: "td",
      key: "td",
      render: (_, item) => item.totalDeductions,
    },
    {
      title: "Total Allowances",
      dataIndex: "ta",
      key: "ta",
      render: (_, item) => item.totalAllowances,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      render: (_, item) => item.tax,
    },
    {
      title: "Exchange Rate",
      dataIndex: "Exchange Rate",
      key: "Exchange Rate",
      render: (_, item) => (expatriate ? "Dollar" : "Default(Naira)"),
    },

    {
      title: "Action",
      key: "action",
      width: 100,

      render: (_, item) =>
        !expatriate ? (
          <div className="flex gap-4">
            <Dropdown
              overlay={
                <Menu
                  items={[
                    { label: "Add Allowance", key: "Add Allowance" },
                    { label: "Add Deduction", key: "Add Deduction" },
                    {
                      label: "View Details",
                      key: "View Details",
                      onClick: () => setShowBreak(true),
                    },
                    {
                      label: "Modify Details",
                      key: "Modify Details",
                      onClick: () => setShowMod(true),
                    },
                    { label: "Deactivate", key: "Deactivate" },
                  ]}
                />
              }
              trigger={["click"]}
            >
              <MoreOutlined />
            </Dropdown>
          </div>
        ) : (
          <div className="flex gap-4">
            <Dropdown
              overlay={
                <Menu
                  items={[
                    { label: "Add Allowance", key: "Add Allowance" },
                    { label: "Add Deduction", key: "Add Deduction" },
                    {
                      label: "View Details",
                      key: "View Details",
                      onClick: () => setShowBreak(true),
                    },
                    {
                      label: "Modify Details",
                      key: "Modify Details",
                      onClick: () => setShowMod(true),
                    },
                    { label: "Deactivate", key: "Deactivate" },
                    { label: "Exempt From Tax", key: "Exempt From Tax" },
                    { label: "Configure Tax", key: "Configure Tax" },
                  ]}
                />
              }
              trigger={["click"]}
            >
              <MoreOutlined />
            </Dropdown>
          </div>
        ),
    },
  ];
  const [showD, setShowD] = useState(false);
  return (
    <>
      <AddSalaryComponent
        open={showD}
        handleClose={() => setShowD(false)}
        handleSave={() => {}}
        dependencies={ALLOWANNCES.map((item) => item.identifier)}
      />
      <ViewPayrollBreakdown
        open={showBreak}
        handleClose={() => setShowBreak(false)}
      />
      <ModifyPayrollBreakdown
        open={showMod}
        handleClose={() => setShowMod(false)}
      />
      <div className="flex flex-col gap-4">
        {/* btns */}

        <div className="flex justify-between">
          <div className="flex gap-2">
            <input
              type="text"
              className="border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
              placeholder="Search for Employee"
            />
            <AppButton
              label="Filter"
              variant="transparent"
              handleClick={() => setShowD(true)}
            />
          </div>
          <div className="flex gap-2">
            <AppButton
              label="Add Allowance"
              variant="transparent"
              handleClick={() => setShowD(true)}
            />
            <AppButton
              label="Add Deduction"
              variant="transparent"
              handleClick={() => setShowD(true)}
            />
            <AppButton
              label="Deactivate Users"
              variant="transparent"
              handleClick={() => setShowD(true)}
            />
          </div>
        </div>

        {/* table */}
        <Table
          columns={columns}
          size="small"
          dataSource={Array(4).fill({
            name: "James Kaladin",
            grossPay: 5000000,
            netPay: 350000, // sum of allowances and deductions
            totalDeductions: 200000,
            totalAllowances: 30000,
            tax: 2000,
            payrollScheme: "Grade",
          })}
          pagination={{ ...pagination, total: ALLOWANNCES.length }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
