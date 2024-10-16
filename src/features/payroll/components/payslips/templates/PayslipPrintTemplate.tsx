import { Avatar } from "antd";
import { hcMatrixWatermarkSvg } from "assets/images";
import { TPayrollBreakdownAttr } from "features/payroll/types";
import { TSinglePayslip } from "features/payroll/types/payslip";
import { TPayrollTemplate } from "features/payroll/types/template";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";
import moment from "moment";
import React, { forwardRef } from "react";

interface PayslipPrintTemplateProps {
  employeePayroll: TSinglePayslip;
  defaultPayslipTemplate: TPayrollTemplate;
  company: {
    logoUrl?: string;
    name: string;
  };
}

const PayslipPrintTemplate = forwardRef<
  HTMLDivElement,
  PayslipPrintTemplateProps
>(({ employeePayroll, defaultPayslipTemplate: template, company }, ref) => {
  const { formatValueWithCurrency } = useGetCompanyBaseCurrency();
  const variablePayrollAttrs: TPayrollBreakdownAttr[] =
    template.employeeInformation.map((item) => {
      const value = (employeePayroll as { [key: string]: any })[
        item.templateInformation.label
      ];
      return {
        label: item.templateInformation.name,
        value,
        amount: typeof value === "number",
      };
    });
  const payrollAttrs: TPayrollBreakdownAttr[] = [
    {
      label: "Name",
      value: employeePayroll?.fullName,
    },

    {
      label: "Year to Date Net",
      value: employeePayroll?.ytdNet,
      hidden: template.ytdNet === false,
    },

    {
      label: "Year to Date Tax",
      value: employeePayroll?.ytdTax,
      hidden: template.ytdTax === false,
    },
    {
      label: "Year to Date Gross",
      value: employeePayroll?.ytdGross,
      hidden: template.ytdGross === false,
    },
    {
      label: "Gross Pay",
      value: employeePayroll.grossPay,
      amount: true,
    },

    {
      label: "Pay Date",
      value: moment(employeePayroll?.createdAt).format("YYYY-MM-DD"),
    },
    ...variablePayrollAttrs,
  ];

  //   TODO: Add company logo && Name
  return (
    <div ref={ref} className="px-4 py-4 flex flex-col gap-6 w-full">
      <div className="flex gap-2 items-center">
        <Avatar size={`large`} src={company.logoUrl} />
        <h4 className="font-semibold text-lg">{company.name}</h4>
      </div>

      <div
        className="bg-contain bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${hcMatrixWatermarkSvg})` }}
      >
        {/* <h6 className="text-xl text-center">Employee Payslip</h6> */}

        <div className="text-sm mt-5 font-medium gap-4">
          <div className="grid grid-cols-2 gap-2 my-2">
            {payrollAttrs
              .filter((item) => item.hidden !== true)
              .map((item, i) => (
                <div
                  key={i}
                  className={`${
                    item.takeFullSpace ? "col-span-2" : "col-span-1"
                  } bg-transparent border shadow-md border-slate-300 flex items-center justify-between px-5 py-2`}
                >
                  <span>{item.label}</span>
                  <span>
                    {item?.amount
                      ? formatValueWithCurrency(item.value)
                      : item.value}
                  </span>
                </div>
              ))}
          </div>

          <div className="grid grid-cols-2 gap-5 my-6">
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
                    {employeePayroll?.employeeSalaryComponents
                      .filter((item) => item.type === comp.type)
                      .map((item, i) => (
                        <tr key={i}>
                          <td className="capitalize">{item.name}</td>
                          <td className="capitalize">
                            {formatValueWithCurrency(item.calculatedAmount)}
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td>Sub Total</td>
                      <td colSpan={1}>
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
            <span className="font-bold">
              {formatValueWithCurrency(employeePayroll?.netPay)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PayslipPrintTemplate;
