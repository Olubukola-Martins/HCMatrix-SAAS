import { Table, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { usePagination } from "hooks/usePagination";
import { MoreOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ModifyPayrollBreakdown from "../ModifyPayrollBreakdown";
import { AddSalaryComponent } from "../salaryComponents/AddSalaryComponent";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TEmployeesInPayrollData } from "features/payroll/types";
import {
  TSalaryComponent,
  TSalaryComponentCalculationMode,
} from "features/payroll/types/salaryComponents";
import { useAddAllowanceOrDeductionToEmployees } from "features/payroll/hooks/payroll/employee/salaryComponent/useAddAllowanceOrDeductionToEmployees";
import { openNotification } from "utils/notifications";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import { useActivateOrDeactivateEmployeesInPayroll } from "features/payroll/hooks/payroll/employee/useActivateOrDeactivateEmployeesInPayroll";
import ViewEmployeePayrollBreakdown from "../employeeReports/ViewEmployeePayrollBreakdown";
import ConfirmationModal from "components/modals/ConfirmationModal";

interface IProps {
  expatriate: boolean;
  isLoading?: boolean;
  employees?: TEmployeesInPayrollData[];
  generalSalaryComponents?: TSalaryComponent[];
  payrollId?: number;
}

type TAction =
  | "add-allowance"
  | "add-deduction"
  | "modify-details"
  | "view-details"
  | "deactivate"
  | "activate"
  | "exempt-from-tax"
  | "configure-tax";

const salaryCompTypes: {
  actionType: "add-allowance" | "add-deduction";
  component: "allowance" | "deduction";
}[] = [
  { actionType: "add-allowance", component: "allowance" },
  { actionType: "add-deduction", component: "deduction" },
];

export const EmployeePayrollUpdatesContainer: React.FC<IProps> = ({
  expatriate = false,
  isLoading,
  employees,
  generalSalaryComponents,
  payrollId,
}) => {
  const [action, setAction] = useState<TAction>();
  const [employee, setEmployee] = useState<TEmployeesInPayrollData>();
  const [employeeIds, setEmployeeIds] = useState<number[]>([]);

  const handleAction = (props: {
    action: TAction;
    data?: { employee?: TEmployeesInPayrollData };
  }) => {
    const initEmployee = () => {
      setEmployee(props?.data?.employee);
    };

    initEmployee();
    setAction(props.action);
  };

  const clearAction = () => {
    setAction(undefined);
    setEmployee(undefined);
  };
  const actionItems = (props: { employee: TEmployeesInPayrollData }) => {
    const { employee } = props;
    return [
      {
        label: "Add Allowance",
        key: "Add Allowance",
        onClick: () => {
          handleAction({ action: "add-allowance", data: { employee } });
        },
      },
      {
        label: "Add Deduction",
        key: "Add Deduction",
        onClick: () => {
          handleAction({ action: "add-deduction", data: { employee } });
        },
      },
      {
        label: "View Details",
        key: "View Details",
        onClick: () => {
          handleAction({ action: "view-details", data: { employee } });
        },
      },
      {
        label: "Modify Details",
        key: "Modify Details",
        onClick: () => {
          handleAction({ action: "modify-details", data: { employee } });
        },
      },
      {
        label: `${employee.isActive ? "Deactivate" : "Activate"}`,
        key: "ActivateOrDeactivate",
        onClick: () => {
          handleAction({
            action: employee.isActive ? "deactivate" : "activate",
            data: { employee },
          });
        },
      },
      {
        label: "Exempt From Tax",
        key: "Exempt From Tax",
        onClick: () => {
          handleAction({ action: "exempt-from-tax", data: { employee } });
        },
      },
      {
        label: "Configure Tax",
        key: "Configure Tax",
        onClick: () => {
          handleAction({ action: "configure-tax", data: { employee } });
        },
      },
    ];
  };
  const { pagination, onChange } = usePagination();

  const columns: ColumnsType<TEmployeesInPayrollData> = [
    {
      title: "Name",
      dataIndex: "uid",
      key: "uid",
      render: (_, item) => item.fullName,
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
      render: (_, item) => item.currency,
    },

    {
      title: "Action",
      key: "action",
      width: 100,

      render: (_, employee) => (
        <div className="flex gap-4">
          <Dropdown
            disabled={!employee.isActive || employeeIds.length > 0}
            overlay={
              <Menu
                items={
                  expatriate
                    ? actionItems({ employee })
                    : actionItems({ employee }).filter(
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

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: TEmployeesInPayrollData[]
    ) => {
      setEmployeeIds(selectedRows.map((item) => item.employeeId));
    },
  };

  const {
    mutate: mutateActivateOrDeactivateEmployees,
    isLoading: isActivateOrDeactivateEmployeesLoading,
  } = useActivateOrDeactivateEmployeesInPayroll();

  const handleActivateOrDeactivateEmployees = () => {
    if (
      (payrollId && action === "activate") ||
      (payrollId && action === "deactivate")
    ) {
      mutateActivateOrDeactivateEmployees(
        {
          employeeIds: employee ? [employee.employeeId] : employeeIds,
          payrollId,
          data: {
            isActive: action === "activate" ? true : false,
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });
            clearAction();
            setEmployeeIds([]);

            // queryClient.invalidateQueries({
            //   queryKey: [QUERY_KEY_FOR_FOLDERS],
            //   // exact: true,
            // });
          },
        }
      );
    }
  };
  const { mutate: mutateAddSalaryComp, isLoading: isSalaryCompLoading } =
    useAddAllowanceOrDeductionToEmployees();
  const handleAddSalaryComponent = (data: {
    amount: number | string;
    label: string;
    mode: TSalaryComponentCalculationMode;
    name: string;
  }) => {
    const { amount, label, mode, name } = data;
    if (
      (payrollId && action === "add-allowance") ||
      (payrollId && action === "add-deduction")
    ) {
      mutateAddSalaryComp(
        {
          salaryComponentType:
            action === "add-allowance" ? "allowance" : "deduction",
          employeeIds: employee ? [employee.employeeId] : employeeIds,
          payrollId,
          data: {
            amount,
            label,
            mode,
            name,
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });
            clearAction();
            setEmployeeIds([]);

            // queryClient.invalidateQueries({
            //   queryKey: [QUERY_KEY_FOR_FOLDERS],
            //   // exact: true,
            // });
          },
        }
      );
    }
  };

  return (
    <>
      {salaryCompTypes.map((item) => (
        <AddSalaryComponent
          key={item.component}
          title={
            employeeIds.length > 0
              ? `Add ${item.component} to ${pluralOrSingular({
                  amount: employeeIds.length,
                  singular: "employee",
                  plural: "employees",
                })}`
              : `Add ${item.component} to ${employee?.fullName}`
          }
          open={action === item.actionType}
          handleClose={() => clearAction()}
          handleSave={(data) => handleAddSalaryComponent(data)}
          dependencies={generalSalaryComponents?.map((item) => item.label)}
          type={item.component}
          loading={isSalaryCompLoading}
        />
      ))}

      <ConfirmationModal
        title={
          employeeIds.length > 0
            ? `Deactivate ${pluralOrSingular({
                amount: employeeIds.length,
                singular: "employee",
                plural: "employees",
              })}`
            : `Deactivate ${employee?.fullName}`
        }
        description={
          employeeIds.length > 0
            ? `Are you sure you want to deactivate ${pluralOrSingular({
                amount: employeeIds.length,
                singular: "employee",
                plural: "employees",
              })}`
            : `Are you sure you want to deactivate ${employee?.fullName}`
        }
        handleClose={() => clearAction()}
        open={action === "deactivate"}
        handleConfirm={{
          fn: () => handleActivateOrDeactivateEmployees(),
          isLoading: isActivateOrDeactivateEmployeesLoading,
        }}
      />
      <ConfirmationModal
        title={
          employeeIds.length > 0
            ? `Activate ${pluralOrSingular({
                amount: employeeIds.length,
                singular: "employee",
                plural: "employees",
              })}`
            : `Activate ${employee?.fullName}`
        }
        description={
          employeeIds.length > 0
            ? `Are you sure you want to activate ${pluralOrSingular({
                amount: employeeIds.length,
                singular: "employee",
                plural: "employees",
              })}`
            : `Are you sure you want to activate ${employee?.fullName}`
        }
        handleClose={() => clearAction()}
        open={action === "activate"}
        handleConfirm={{
          fn: () => handleActivateOrDeactivateEmployees(),
          isLoading: isActivateOrDeactivateEmployeesLoading,
        }}
      />
      {payrollId && employee && (
        <ViewEmployeePayrollBreakdown
          data={{ payrollId, employeeId: employee.employeeId }}
          handleClose={() => clearAction()}
          open={action === "view-details"}
        />
      )}
      <ModifyPayrollBreakdown
        handleClose={() => clearAction()}
        open={action === "modify-details"}
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
              handleClick={() => {}}
            />
          </div>
          {employeeIds.length > 0 && (
            <div className="flex gap-2">
              <AppButton
                label="Add Allowance"
                variant="transparent"
                handleClick={() => handleAction({ action: "add-allowance" })}
              />
              <AppButton
                label="Add Deduction"
                variant="transparent"
                handleClick={() => handleAction({ action: "add-deduction" })}
              />
              <AppButton
                label="Deactivate"
                variant="transparent"
                handleClick={() => handleAction({ action: "deactivate" })}
              />
              <AppButton
                label="Activate"
                variant="transparent"
                handleClick={() => handleAction({ action: "activate" })}
              />
            </div>
          )}
        </div>

        {/* table */}
        <Table
          rowSelection={{
            selectedRowKeys: employeeIds,
            type: "checkbox",

            getCheckboxProps: (record) => ({
              // className: record.isActive ? "bg-red-200" : "bg-red-400",
              // disabled: !record.isActive, // Column configuration not to be checked , would be deactivated users
              name: record.fullName,
            }),

            ...rowSelection,
          }}
          columns={columns}
          size="small"
          loading={isLoading}
          dataSource={employees?.map((item) => ({
            ...item,
            key: item.employeeId,
          }))}
          pagination={{ ...pagination, total: employees?.length }}
          onChange={onChange}
          rowClassName={({ isActive }) =>
            !isActive ? `bg-gray-200 text-slate-400` : ""
          }
        />
      </div>
    </>
  );
};
