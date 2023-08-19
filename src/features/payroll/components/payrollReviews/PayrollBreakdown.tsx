import { Modal, Skeleton } from "antd";
import Themes from "components/Themes";
import { TSinglePayroll } from "features/payroll/types";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";
import React from "react";
import { IModalProps } from "types";

interface IProps extends IModalProps {
  payroll: TSinglePayroll;
}

const PayrollBreakdown: React.FC<IProps> = ({ open, handleClose, payroll }) => {
  const { baseCurrency, loading: baseCurrLoading } =
    useGetCompanyBaseCurrency();
  const payrollAttrs = [
    { label: "Payroll Name", value: payroll.name, takeFullSpace: true },
    { label: "Date(for)", value: payroll.date, takeFullSpace: true },
    {
      label: "Gross Pay",
      value: payroll.totalGrossPay,
      amount: true,
      takeFullSpace: true,
    },
    { label: "Net Pay", value: payroll.totalGrossPay, amount: true },
    { label: "Total Tax", value: payroll.totalTax, amount: true },
    { label: "Total Allowance", value: payroll.totalAllowances, amount: true },
    { label: "Total Deduction", value: payroll.totalDeductions, amount: true },
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
        <Skeleton loading={baseCurrLoading} paragraph={{ rows: 28 }} active>
          <div className="scrollBar overflow-auto">
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
                    <span>
                      {item?.amount ? baseCurrency?.currencySymbol : ""}
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-12">
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
                        </tr>
                      </thead>
                      <tbody>
                        {[]
                          .filter((item) => item)
                          .map((item, i) => (
                            <tr key={i}>
                              <td>{/* {item.name} */}</td>
                              <td>
                                {baseCurrency?.currencySymbol}
                                {/* {item.calculatedAmount} */}
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <td>Sub Total</td>
                          <td colSpan={1}>
                            {baseCurrency?.currencySymbol}
                            {comp.type === "allowance" ? 0 : 0}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Skeleton>
      </Themes>
    </Modal>
  );
};

export default PayrollBreakdown;
