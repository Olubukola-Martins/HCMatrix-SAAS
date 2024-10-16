import { Menu, Dropdown } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TEmployeesInPayrollData } from "features/payroll/types";
import { AiOutlineMore } from "react-icons/ai";
import { TEmployeePayrollUpdateActionItem } from "../EmployeePayrollUpdatesContainer";

export const EMPLOYEE_PAYROLL_UPDATE_TABLE_COLUMNS = (
  employeeIds: number[],
  expatriate: boolean,
  EMPLOYEE_PAYROLL_UPDATE_ACTION_ITEMS: (vals: {
    employee: TEmployeesInPayrollData;
  }) => TEmployeePayrollUpdateActionItem[],
  extraColumns: ColumnsType<TEmployeesInPayrollData>
): ColumnsType<TEmployeesInPayrollData> => {
  return [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => item.fullName,
    },

    {
      title: "Net Pay",
      dataIndex: "Net Pay",
      key: "Net Pay",
      render: (_, item) => item.netPay,
    },
    {
      title: "Gross Pay",
      dataIndex: "Gross Pay",
      key: "Gross Pay",
      render: (_, item) => item.grossPay,
    },
    {
      title: "Total Deductions",
      dataIndex: "Gross Pay",
      key: "Gross Pay",
      render: (_, item) => item.totalDeductions,
    },
    {
      title: "Total Allowances",
      dataIndex: "Total Allowances",
      key: "Total Allowances",
      render: (_, item) => item.totalAllowances,
    },
    ...extraColumns,
    {
      title: "Exchange Rate",
      dataIndex: "Exchange Rate",
      key: "Exchange Rate",
      render: (_, item) => item.currency,
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 100,

      render: (_, employee) => (
        <div className="flex gap-4">
          <Dropdown
            disabled={!employee.isActive || employeeIds.length > 0}
            overlay={
              <Menu
                getPopupContainer={(triggerNode) =>
                  triggerNode.parentElement as HTMLElement
                }
                items={
                  expatriate
                    ? EMPLOYEE_PAYROLL_UPDATE_ACTION_ITEMS({ employee })
                    : EMPLOYEE_PAYROLL_UPDATE_ACTION_ITEMS({ employee }).filter(
                        (item) => item.label !== "Configure Tax"
                      )
                }
              />
            }
            trigger={["click"]}
          >
            <AiOutlineMore />
          </Dropdown>
        </div>
      ),
    },
  ];
};
