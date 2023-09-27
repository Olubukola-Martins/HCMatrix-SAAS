import { Table } from "antd";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import ViewEmployeePayrollBreakdown from "../employeeReports/ViewEmployeePayrollBreakdown";
import {
  TGetPayslipsProps,
  useGetPayslips,
} from "features/payroll/hooks/payslips/useGetPayslips";
import { TPayslip } from "features/payroll/types/payslip";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";

type TAction = "view";

interface IProps {
  role: TGetPayslipsProps["role"];
  scheme: TGetPayslipsProps["scheme"];
  fromDate?: string;
  toDate?: string;
}
const PayslipsTable: React.FC<IProps> = ({
  role,
  scheme,
  fromDate,
  toDate,
}) => {
  const [action, setAction] = useState<TAction>();
  const [grade, setGrade] = useState<TPayslip>();
  const handleAction = ({
    action,
    grade,
  }: {
    action: TAction;
    grade: TPayslip;
  }) => {
    setAction(action);
    setGrade(grade);
  };
  const cancelAction = () => {
    setAction(undefined);
    setGrade(undefined);
  };
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetPayslips({
    props: {
      pagination,
      fromDate,
      toDate,
    },
    role,
    scheme,
  });

  const columns: ColumnsType<TPayslip> = [
    {
      title: "Pay Date",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <span>{moment(item.createdAt).format(DEFAULT_DATE_FORMAT)}</span>
      ),

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Name",
      dataIndex: "cat",
      key: "cat",
      render: (_, item) => <span className="capitalize">{item.fullName}</span>,
    },
    {
      title: "Scheme",
      dataIndex: "_s",
      key: "_s",
      render: (_, item) => (
        <span className="capitalize">{item.payroll?.scheme.name}</span>
      ),
    },
    {
      title: "Net Pay",
      dataIndex: "_n",
      key: "_n",
      render: (_, item) => <span className="capitalize">{item.netPay}</span>,
    },
    {
      title: "Gross Pay",
      dataIndex: "_g",
      key: "_g",
      render: (_, item) => <span className="">{item.grossPay}</span>,
    },
    {
      title: "Total Allowances",
      dataIndex: "_ta",
      key: "_ta",
      render: (_, item) => <span className="">{item.totalAllowances}</span>,
    },
    {
      title: "Total Deductions",
      dataIndex: "_td",
      key: "_td",
      render: (_, item) => <span className="">{item.totalDeductions}</span>,
    },
    {
      title: "Tax",
      dataIndex: "_tax",
      key: "_tax",
      render: (_, item) => <span className="">{item.tax}</span>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <div className="flex gap-2">
          <i
            className="ri-eye-fill text-lg cursor-pointer"
            onClick={() => handleAction({ action: "view", grade: item })}
          />
          <i
            className="ri-download-line text-lg cursor-pointer"
            onClick={() => handleAction({ action: "view", grade: item })}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {/* TODO: PAsss proper id when endpoint is available */}
      <ViewEmployeePayrollBreakdown
        params={{
          employeeId: grade?.employeeId,
          payrollId: grade?.payrollId,
        }}
        handleClose={() => setAction(undefined)}
        open={action === "view"}
        showControls={false}
      />

      <Table
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </>
  );
};

export default PayslipsTable;
