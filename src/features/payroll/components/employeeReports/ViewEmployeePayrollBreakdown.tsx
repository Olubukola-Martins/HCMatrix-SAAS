import { Modal, Skeleton, Switch } from "antd";
import Themes from "components/Themes";
import { useActivateOrDeactivateEmployeeSalaryComponent } from "features/payroll/hooks/payroll/employee/salaryComponent/useActivateOrDeactivateEmployeeSalaryComponent";
import { QUERY_KEY_FOR_EMPLOYEES_IN_PAYROLL } from "features/payroll/hooks/payroll/employee/useGetEmployeesInPayroll";
import {
  QUERY_KEY_FOR_SINGLE_EMPLOYEE_PAYROLL,
  useGetSingleEmployeePayroll,
} from "features/payroll/hooks/payroll/employee/useGetSingleEmployeePayroll";
import {
  TEmployeesInPayrollData,
  TPayrollBreakdownAttr,
} from "features/payroll/types";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";
import moment from "moment";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import "../../style/style.css";
import { hcMatrixWatermarkSvg } from "assets/images";

interface IProps extends IModalProps {
  params: {
    payrollId?: number;
    employeeId?: number;
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

  const { loading: baseCurrLoading, formatValueWithCurrency } =
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

    if (payrollId && employeeId) {
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
                      item.id === salaryComponentId
                        ? { ...item, isActive }
                        : item
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
    }
  };
  const payrollAttrs: TPayrollBreakdownAttr[] = [
    {
      label: "Name",
      value: employeePayroll?.fullName,
    },
    {
      label: "Employee ID",
      value: employeePayroll?.empUid,
    },
    {
      label: "Department",
      value: employeePayroll?.designation,
    },
    {
      label: "Designation",
      value: employeePayroll?.designation,
    },
    {
      label: "Year to Date Net",
      value: formatValueWithCurrency(employeePayroll?.ytdNet),
    },

    {
      label: "Year to Date Tax",
      value: formatValueWithCurrency(employeePayroll?.ytdTax),
    },
    {
      label: "Year to Date Gross",
      value: formatValueWithCurrency(employeePayroll?.ytdGross),
    },
    {
      label: "Gross Pay",
      value: moment(employeePayroll?.createdAt).format("YYYY-MM-DD"),
    },

    {
      label: "Pay Date",
      value: moment(employeePayroll?.createdAt).format("YYYY-MM-DD"),
      takeFullSpace: true,
    },
    ...[],
  ];
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
          <div
            className="scrollBar overflow-auto bg-contain bg-center bg-no-repeat "
            style={{ backgroundImage: `url(${hcMatrixWatermarkSvg})` }}
          >
            <div className="text-sm mt-5 font-medium">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 my-2">
                {payrollAttrs.map((item, i) => (
                  <div
                    key={i}
                    className={`${
                      item.takeFullSpace ? "col-span-2" : "col-span-1"
                    } bg-transparent border shadow-md border-slate-300 flex items-center justify-between px-5 py-2`}
                  >
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                ))}
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
                              <td className="capitalize">{item.name}</td>
                              <td>
                                {formatValueWithCurrency(item.calculatedAmount)}
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
                            {formatValueWithCurrency(
                              comp.type === "allowance"
                                ? employeePayroll?.totalAllowances
                                : employeePayroll?.totalDeductions
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              <div className="bg-mainBg flex items-center justify-between px-5 py-2">
                <span> Net Pay</span>
                <span>{formatValueWithCurrency(employeePayroll?.netPay)}</span>
              </div>
              <div className="bg-mainBg flex items-center justify-between px-5 py-2 mt-3">
                <span>Account Number</span>
                <span>{employeePayroll?.accountNumber}</span>
              </div>
              {/* <div className="bg-mainBg flex items-center justify-between px-5 py-2 mt-3">
                <span>Bank</span>
                <span>{employeePayroll?.bankName}</span>
              </div> */}
            </div>
          </div>
        </Skeleton>
      </Themes>
    </Modal>
  );
};

export default ViewEmployeePayrollBreakdown;
