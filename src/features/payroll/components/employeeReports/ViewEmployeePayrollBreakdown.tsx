import { Modal, Skeleton } from "antd";
import Themes from "components/Themes";
import { useGetSingleEmployeePayroll } from "features/payroll/hooks/payroll/employee/useGetSingleEmployeePayroll";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";
import React from "react";
import { IModalProps } from "types";

interface IProps extends IModalProps {
  data: {
    payrollId: number;
    employeeId: number;
  };
}

const ViewEmployeePayrollBreakdown: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const { baseCurrency, loading: baseCurrLoading } =
    useGetCompanyBaseCurrency();
  const { payrollId, employeeId } = data;
  const { data: employeePayroll, isLoading } = useGetSingleEmployeePayroll({
    employeeId,
    payrollId,
  });
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
                <div>
                  <table className="payroll-table view">
                    <thead>
                      <tr>
                        <th>Allowances</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeePayroll?.employeeSalaryComponents
                        .filter((item) => item.type === "allowance")
                        .map((item, i) => (
                          <tr>
                            <td>{item.name}</td>
                            <td>
                              {baseCurrency?.currencySymbol}
                              {item.calculatedAmount}
                            </td>
                          </tr>
                        ))}
                      <tr>
                        <td>Sub Total</td>
                        <td>
                          {baseCurrency?.currencySymbol}
                          {employeePayroll?.totalAllowances}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <table className="payroll-table view">
                  <thead>
                    <tr>
                      <th>Deductions</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeePayroll?.employeeSalaryComponents
                      .filter((item) => item.type === "deduction")
                      .map((item, i) => (
                        <tr>
                          <td>{item.name}</td>
                          <td>
                            {baseCurrency?.currencySymbol}
                            {item.calculatedAmount}
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td>Sub Total</td>
                      <td>
                        {baseCurrency?.currencySymbol}
                        {employeePayroll?.totalDeductions}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
