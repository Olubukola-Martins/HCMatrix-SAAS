import ReactToPrint from "react-to-print";
import { PayslipGenerator } from "../PayslipGenerator";
import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { useGetPayrollSetting } from "features/payroll/hooks/payroll/setting/useGetPayrollSetting";
import { TPayslip } from "features/payroll/types/payslip";
import moment from "moment";
import { useRef } from "react";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import { TPayslipAction } from "../PayslipsTable";

export const PAYSLIP_TABLE_COLUMNS = (
  handleAction: (props: { action: TPayslipAction; grade: TPayslip }) => void
): ColumnsType<TPayslip> => [
  {
    title: "Pay Date",
    dataIndex: "Pay Date",
    key: "Pay Date",
    render: (_, item) => (
      <span>{moment(item.createdAt).format(DEFAULT_DATE_FORMAT)}</span>
    ),

    // ellipsis: true,

    // width: 100,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, item) => <span className="capitalize">{item.fullName}</span>,
  },
  {
    title: "Scheme",
    dataIndex: "scheme",
    key: "scheme",
    render: (_, item) => (
      <span className="capitalize">{item.payroll?.scheme.name}</span>
    ),
  },
  {
    title: "Net Pay",
    dataIndex: "net pay",
    key: "net pay",
    render: (_, item) => (
      <span className="capitalize">{formatNumberWithCommas(item.netPay)}</span>
    ),
  },
  {
    title: "Gross Pay",
    dataIndex: "gross pay",
    key: "gross pay",
    render: (_, item) => (
      <span className="">{formatNumberWithCommas(item.grossPay)}</span>
    ),
  },
  {
    title: "Total Allowances",
    dataIndex: "total allowances",
    key: "total allowances",
    render: (_, item) => (
      <span className="">{formatNumberWithCommas(item.totalAllowances)}</span>
    ),
  },
  {
    title: "Total Deductions",
    dataIndex: "total deductions",
    key: "total deductions",
    render: (_, item) => (
      <span className="">{formatNumberWithCommas(item.totalDeductions)}</span>
    ),
  },
  {
    title: "Tax",
    dataIndex: "tax",
    key: "tax",
    render: (_, item) => (
      <span className="">{formatNumberWithCommas(item.tax)}</span>
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (_, item) => (
      <div className="flex gap-2 text-slate-600">
        <i
          className="ri-eye-fill text-lg cursor-pointer"
          onClick={() => handleAction({ action: "view", grade: item })}
        />
        <PrintBtn data={item} />
      </div>
    ),
  },
];

const PrintBtn: React.FC<{ data?: TPayslip }> = ({ data }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const { data: payrollSetting } = useGetPayrollSetting();

  return (
    <>
      <ReactToPrint
        trigger={() => {
          return <i className="ri-printer-line text-lg cursor-pointer" />;
        }}
        content={() => componentRef.current}
        bodyClass={"w-full justify-stretch items-center"}
      />
      <div className="hidden">
        <PayslipGenerator
          ref={componentRef}
          params={{
            employeeId: data?.employeeId,
            payrollId: data?.payrollId,
          }}
          defaultPayslipTemplateId={payrollSetting?.payslipTemplate.templateId}
        />
      </div>
    </>
  );
};
