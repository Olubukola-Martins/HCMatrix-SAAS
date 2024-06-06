import { Select } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { usePagination } from "hooks/usePagination";
import React, { useState } from "react";
import { AddSalaryComponent } from "../salaryComponents/AddSalaryComponent";
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
import {
  QUERY_KEY_FOR_EMPLOYEES_IN_PAYROLL,
  useGetEmployeesInPayroll,
} from "features/payroll/hooks/payroll/employee/useGetEmployeesInPayroll";
import { useQueryClient } from "react-query";
import { useConfigureTaxForAnExapatriate } from "features/payroll/hooks/payroll/employee/salaryComponent/configureTax/useConfigureTaxForAnExapatriate";
import { TableWithFocusType } from "components/table";
import { EMPLOYEE_PAYROLL_UPDATE_TABLE_COLUMNS } from "./columns";

interface IProps {
  expatriate: boolean;
  generalSalaryComponents?: TSalaryComponent[];
  eligibility?: "citizen" | "expatriate";
  payrollId?: number;
  allowMultipleSelect?: boolean;
  allowedEmployeeActions?: TAction[];
}
export type TEmployeePayrollUpdateActionItem = {
  label: string;
  key: TAction;
  onClick: () => void;
};
type TAction =
  | "add-allowance"
  | "add-deduction"
  | "modify-details"
  | "view-details"
  | "deactivate"
  | "activate"
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
  generalSalaryComponents,
  eligibility,
  payrollId,
  allowMultipleSelect = true,
  allowedEmployeeActions = [
    "activate",
    "deactivate",
    "add-allowance",
    "add-deduction",
    "activate",
    "deactivate",
    "configure-tax",
    "modify-details",
    "view-details",
  ],
}) => {
  const queryClient = useQueryClient();

  const { pagination, onChange } = usePagination();
  const [search, setSearch] = useState<{
    term?: string;
    action: "apply-search" | "clear-search";
  }>({ action: "clear-search" });
  const [isActive, setIsActive] = useState<boolean>();
  const { data, isFetching } = useGetEmployeesInPayroll({
    payrollId,
    data: {
      pagination,
      eligibility,
      searchParams: {
        name: search.action === "apply-search" ? search.term : undefined,
      },
      isActive: isActive,
    },
  });
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

  const EMPLOYEE_PAYROLL_UPDATE_ACTION_ITEMS = (props: {
    employee: TEmployeesInPayrollData;
  }): TEmployeePayrollUpdateActionItem[] => {
    const { employee } = props;
    const items: TEmployeePayrollUpdateActionItem[] = [
      {
        label: "Add Allowance",
        key: "add-allowance",
        onClick: () => {
          handleAction({ action: "add-allowance", data: { employee } });
        },
      },
      {
        label: "Add Deduction",
        key: "add-deduction",
        onClick: () => {
          handleAction({ action: "add-deduction", data: { employee } });
        },
      },
      {
        label: "View Details",
        key: "view-details",
        onClick: () => {
          handleAction({ action: "view-details", data: { employee } });
        },
      },
      {
        label: "Modify Details",
        key: "modify-details",
        onClick: () => {
          handleAction({ action: "modify-details", data: { employee } });
        },
      },
      {
        label: `${employee.isActive ? "Deactivate" : "Activate"}`,
        key: `${employee.isActive ? "deactivate" : "activate"}`,
        onClick: () => {
          handleAction({
            action: employee.isActive ? "deactivate" : "activate",
            data: { employee },
          });
        },
      },

      {
        label: "Configure Tax",
        key: "configure-tax",
        onClick: () => {
          handleAction({ action: "configure-tax", data: { employee } });
        },
      },
    ];
    return items.filter((item) => allowedEmployeeActions.includes(item.key));
  };
  const extraColumnsToDisplay: ColumnsType<TEmployeesInPayrollData> =
    data?.componentHeadersToDisplay
      ? data?.componentHeadersToDisplay?.map((name) => ({
          title: <span className="capitalize">{name}</span>,
          dataIndex: name,
          key: name,
          render: (_, item) => item.componentsToDisplay?.[name],
        }))
      : [];
  const columns: ColumnsType<TEmployeesInPayrollData> =
    EMPLOYEE_PAYROLL_UPDATE_TABLE_COLUMNS(
      employeeIds,
      expatriate,
      EMPLOYEE_PAYROLL_UPDATE_ACTION_ITEMS,
      extraColumnsToDisplay
    );

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

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_EMPLOYEES_IN_PAYROLL],
              // exact: true,
            });
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

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_EMPLOYEES_IN_PAYROLL],
              // exact: true,
            });
          },
        }
      );
    }
  };
  const { mutate: mutateTaxConfig, isLoading: isTaxConfigLoading } =
    useConfigureTaxForAnExapatriate();
  const handleTaxConfiguration = (data: {
    amount: number | string;
    label: string;
    mode: TSalaryComponentCalculationMode;
    name: string;
  }) => {
    const { amount, label, mode, name } = data;
    if (payrollId && employee && action === "configure-tax") {
      mutateTaxConfig(
        {
          employeeId: employee.employeeId,
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

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_EMPLOYEES_IN_PAYROLL],
              // exact: true,
            });
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
      <AddSalaryComponent
        key={"configure-tax"}
        title={`Configure tax for ${employee?.fullName}`}
        open={action === "configure-tax"}
        handleClose={() => clearAction()}
        handleSave={(data) => handleTaxConfiguration(data)}
        dependencies={generalSalaryComponents?.map((item) => item.label)}
        type={"deduction"}
        componentName="tax"
        loading={isTaxConfigLoading}
      />

      <ConfirmationModal
        key="deactivate"
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
        key="activate"
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
          params={{ payrollId, employeeId: employee.employeeId }}
          handleClose={() => clearAction()}
          open={action === "view-details"}
          showControls={false}
        />
      )}
      {payrollId && employee && (
        <ViewEmployeePayrollBreakdown
          params={{ payrollId, employeeId: employee.employeeId }}
          handleClose={() => clearAction()}
          open={action === "modify-details"}
        />
      )}

      <div className="flex flex-col gap-4">
        {/* btns */}

        <div className="flex justify-between">
          <div className="flex gap-6">
            <div className="flex gap-2">
              <input
                value={search.term}
                onChange={(e) =>
                  setSearch((val) => ({ ...val, term: e.target.value }))
                }
                type="text"
                className="border text-accent rounded px-3 py-1 border-gray-400 bg-mainBg"
                placeholder="Search for Employee"
              />
              {search.action === "clear-search" && (
                <AppButton
                  variant="transparent"
                  label="Search"
                  disabled={!search.term}
                  handleClick={() =>
                    setSearch((val) => ({ ...val, action: "apply-search" }))
                  }
                />
              )}
              {search.action === "apply-search" && (
                <AppButton
                  variant="default"
                  label="Clear"
                  handleClick={() =>
                    setSearch((val) => ({
                      term: "",
                      action: "clear-search",
                    }))
                  }
                />
              )}
            </div>
            <div className="w-full">
              <Select
                className="w-full"
                placeholder="Select Employee Status "
                options={[
                  { label: "Only Active", value: "activated" },
                  { label: "Only Deactivated", value: "deactivated" },
                ]}
                onClear={() => setIsActive(undefined)}
                allowClear
                onSelect={(val: string) => setIsActive(val === "activated")}
              />
            </div>
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
        <TableWithFocusType
          rowSelection={
            allowMultipleSelect
              ? {
                  selectedRowKeys: employeeIds,
                  type: "checkbox",

                  getCheckboxProps: (record) => ({
                    // className: record.isActive ? "bg-red-200" : "bg-red-400",
                    // disabled: !record.isActive, // Column configuration not to be checked , would be deactivated users
                    name: record.fullName,
                  }),

                  ...rowSelection,
                }
              : undefined
          }
          columns={columns}
          size="small"
          loading={isFetching}
          dataSource={data?.data?.map((item) => ({
            ...item,
            key: item.employeeId,
          }))}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
          rowClassName={({ isActive }) =>
            !isActive
              ? `bg-gray-200 text-slate-400 hover:bg-gray-200 hover:text-slate-400`
              : ""
          }
        />
      </div>
    </>
  );
};
