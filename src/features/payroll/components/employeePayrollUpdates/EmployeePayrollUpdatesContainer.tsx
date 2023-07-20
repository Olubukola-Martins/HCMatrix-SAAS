import { Table, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { usePagination } from "hooks/usePagination";
import { MoreOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ViewPayrollBreakdown from "../ViewPayrollBreakdown";
import ModifyPayrollBreakdown from "../ModifyPayrollBreakdown";
import { AddSalaryComponent } from "../salaryComponents/AddSalaryComponent";
import DeleteEntityModal from "components/entity/DeleteEntityModal";

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
  const actionItems = [
    {
      label: "Add Allowance",
      key: "Add Allowance",
      onClick: () => setShowD(true),
    },
    {
      label: "Add Deduction",
      key: "Add Deduction",
      onClick: () => setShowD(true),
    },
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
    {
      label: "Deactivate",
      key: "Deactivate",
      onClick: () => setShowDu(true),
    },
    { label: "Exempt From Tax", key: "Exempt From Tax" },
    {
      label: "Configure Tax",
      key: "Configure Tax",
      onClick: () => {
        setShowD(true);
        setCompName("Tax");
      },
    },
  ];
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

      render: (_, item) => (
        <div className="flex gap-4">
          <Dropdown
            overlay={
              <Menu
                items={
                  expatriate
                    ? actionItems
                    : actionItems.filter(
                        (item) =>
                          item.label !== "Configure Tax" &&
                          item.label !== "Exempt From Tax"
                      )
                }
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
  const [showDu, setShowDu] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: TEmpPayrollDetail[]
    ) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedKeys(selectedRows.map((item, i) => i));
    },
    getCheckboxProps: (record: TEmpPayrollDetail) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked , would be deactivated users
      name: record.name,
    }),
  };
  const [compName, setCompName] = useState<string>();
  return (
    <>
      <AddSalaryComponent
        title={
          selectedKeys.length > 0
            ? `Add Allowance to ${selectedKeys.length} employees`
            : `Add allowance to employee`
        }
        componentName={compName}
        open={showD}
        handleClose={() => {
          setShowD(false);
          setCompName(undefined);
        }}
        handleSave={() => {}}
        dependencies={[]}
      />
      <DeleteEntityModal
        title="Exclude Employee"
        entity={{ type: "employees", name: `${selectedKeys.length}` }}
        handleClose={() => setShowDu(false)}
        open={showDu}
        handleDelete={{ fn: () => {}, isLoading: false }}
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
          {selectedKeys.length > 0 && (
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
                handleClick={() => setShowDu(true)}
              />
            </div>
          )}
        </div>

        {/* table */}
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          size="small"
          dataSource={Array(4)
            .fill({
              name: "James Kaladin",
              grossPay: 5000000,
              netPay: 350000, // sum of allowances and deductions
              totalDeductions: 200000,
              totalAllowances: 30000,
              tax: 2000,
              payrollScheme: "Grade",
            })
            .map((item, i) => ({ ...item, key: i }))}
          pagination={{ ...pagination, total: 0 }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
