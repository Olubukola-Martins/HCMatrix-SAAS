import { Modal, Skeleton } from "antd";
import Themes from "components/Themes";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TPayrollBreakdownAttr, TSinglePayroll } from "features/payroll/types";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";
import moment from "moment";
import React from "react";
import { IModalProps } from "types";

interface IProps extends IModalProps {
  payroll: TSinglePayroll;
}

const PayrollBreakdown: React.FC<IProps> = ({ open, handleClose, payroll }) => {
  const { loading: baseCurrLoading, formatValueWithCurrency } =
    useGetCompanyBaseCurrency();
  const payrollAttrs: TPayrollBreakdownAttr[] = [
    { label: "Payroll Name", value: payroll.name, takeFullSpace: true },
    { label: "Date(for)", value: payroll.date, takeFullSpace: true },
    {
      label: "Disbursment Date",
      value: payroll.disbursementDate
        ? moment(payroll.disbursementDate).format(DEFAULT_DATE_FORMAT)
        : "",
      takeFullSpace: true,
    },
    {
      label: "Gross Pay",
      value: formatValueWithCurrency(payroll.totalGrossPay),
      amount: true,
      takeFullSpace: true,
    },
    {
      label: "Net Pay",
      value: formatValueWithCurrency(payroll.totalGrossPay),
      amount: true,
    },
    {
      label: "Total Tax",
      value: formatValueWithCurrency(payroll.totalTax),
      amount: true,
    },
    {
      label: "Total Allowance",
      value: formatValueWithCurrency(payroll.totalAllowances),
      amount: true,
    },
    {
      label: "Total Deduction",
      value: formatValueWithCurrency(payroll.totalDeductions),
      amount: true,
    },
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
                    <span>{item.value}</span>
                  </div>
                ))}
                <div
                  className={`${"col-span-2"} bg-transparent border shadow-md border-slate-300 flex flex-col gap-4 px-5 py-2`}
                >
                  <span>{`Description`}</span>
                  <span>{payroll.description}</span>
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </Themes>
    </Modal>
  );
};

export default PayrollBreakdown;
