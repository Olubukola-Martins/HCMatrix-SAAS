import { Modal, Skeleton, Switch } from "antd";
import Themes from "components/Themes";
import { useActivateOrDeactivateEmployeeSalaryComponent } from "features/payroll/hooks/payroll/employee/salaryComponent/useActivateOrDeactivateEmployeeSalaryComponent";
import { QUERY_KEY_FOR_EMPLOYEES_IN_PAYROLL } from "features/payroll/hooks/payroll/employee/useGetEmployeesInPayroll";
import {
  QUERY_KEY_FOR_SINGLE_EMPLOYEE_PAYROLL,
  useGetSingleEmployeePayroll,
} from "features/payroll/hooks/payroll/employee/useGetSingleEmployeePayroll";
import { TEmployeesInPayrollData } from "features/payroll/types";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";

interface IProps extends IModalProps {
  params: {
    payrollId: number;
    employeeId: number;
  };
  showControls?: boolean;
}

const ViewEmployeePayrollBreakdown: React.FC<IProps> = ({
  open,
  handleClose,
  params,
  showControls = true,
}) => {
  const queryClient = useQueryClient();

  const { baseCurrency, loading: baseCurrLoading } =
    useGetCompanyBaseCurrency();
  const { payrollId, employeeId } = params;
  const { data: employeePayroll, isLoading } = useGetSingleEmployeePayroll({
    employeeId,
    payrollId,
  });
  const [selectedCompId, setSelectedCompId] = useState<number>();
  const { mutate: mutateSalaryComp, isLoading: isSalaryCompLoading } =
    useActivateOrDeactivateEmployeeSalaryComponent();
  const handleSalaryComponent = (data: {
    salaryComponentId: number;
    isActive: boolean;
  }) => {
    const { salaryComponentId, isActive } = data;

    mutateSalaryComp(
      {
        employeeId,
        payrollId,
        salaryComponentId,
        data: { isActive },
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

          queryClient.setQueriesData(
            [QUERY_KEY_FOR_SINGLE_EMPLOYEE_PAYROLL],
            (vals: unknown) => {
              const data = vals as TEmployeesInPayrollData;

              return {
                ...data,
                employeeSalaryComponents: data.employeeSalaryComponents.map(
                  (item) =>
                    item.id === salaryComponentId ? { ...item, isActive } : item
                ),
              };
            }
          );
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_EMPLOYEES_IN_PAYROLL],
            // exact: true,
          });
          setSelectedCompId(undefined);
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 5 }}
      width={`65%`}
      title={
        <div className="flex items-center justify-between">
          <h5 className="font-semibold text-lg">Payroll breakdown</h5>
        </div>
      }
    >
      <Themes>
        <Skeleton
          loading={isLoading || baseCurrLoading}
          paragraph={{ rows: 28 }}
          active
        >
          <div className="scrollBar overflow-auto">
            <div className="text-sm mt-5 font-medium">
              <div className="bg-mainBg flex items-center justify-between px-5 py-2">
                <span> Employee Name</span>
                <span>{employeePayroll?.fullName}</span>
              </div>
              <div className="bg-mainBg flex items-center justify-between px-5 py-2 mt-3">
                <span> Employee ID</span>
                <span>{employeePayroll?.empUid}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-6">
                {[
                  { name: "Allowance", type: "allowance" },
                  { name: "Deduction", type: "deduction" },
                ].map((comp) => (
                  <div key={comp.type}>
                    <table className="payroll-table view">
                      <thead>
                        <tr>
                          <th className="capitalize">{comp.name}</th>
                          <th>Amount</th>
                          {showControls && <th>Active</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {employeePayroll?.employeeSalaryComponents
                          .filter((item) => item.type === comp.type)
                          .map((item, i) => (
                            <tr key={i}>
                              <td>{item.name}</td>
                              <td>
                                {baseCurrency?.currencySymbol}
                                {item.calculatedAmount}
                              </td>
                              {showControls && (
                                <td>
                                  <Switch
                                    loading={
                                      isSalaryCompLoading &&
                                      item.id === selectedCompId
                                    }
                                    defaultChecked={item.isActive}
                                    onChange={(val) =>
                                      handleSalaryComponent({
                                        salaryComponentId: item.id,
                                        isActive: val,
                                      })
                                    }
                                    unCheckedChildren={"No"}
                                    size="small"
                                    checkedChildren={`Yes`}
                                  />
                                </td>
                              )}
                            </tr>
                          ))}
                        <tr>
                          <td>Sub Total</td>
                          <td colSpan={showControls ? 2 : 1}>
                            {baseCurrency?.currencySymbol}
                            {comp.type === "allowance"
                              ? employeePayroll?.totalAllowances
                              : employeePayroll?.totalDeductions}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              <div className="bg-mainBg flex items-center justify-between px-5 py-2">
                <span> Net Pay</span>
                <span>
                  {baseCurrency?.currencySymbol}
                  {employeePayroll?.netPay}
                </span>
              </div>
              <div className="bg-mainBg flex items-center justify-between px-5 py-2 mt-3">
                <span>Account Number</span>
                <span>xxxxxxxxxx</span>
              </div>

              {/* <div className="flex items-center justify-around mt-6">
              <button className="neutralButton">Roll back</button>
              <button className="button">Approve</button>
            </div> */}
            </div>
          </div>
        </Skeleton>
      </Themes>
    </Modal>
  );
};

export default ViewEmployeePayrollBreakdown;
