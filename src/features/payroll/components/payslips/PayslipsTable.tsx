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
import { TableFocusTypeBtn } from "components/table";
import { PAYSLIP_TABLE_COLUMNS } from "./columns/payslip";

export type TPayslipAction = "view";

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
  const [action, setAction] = useState<TPayslipAction>();
  const [grade, setGrade] = useState<TPayslip>();
  const handleAction = ({
    action,
    grade,
  }: {
    action: TPayslipAction;
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

  const columns: ColumnsType<TPayslip> = PAYSLIP_TABLE_COLUMNS(handleAction);
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TPayslip>>(columns);
  return (
    <div className="space-y-6">
      <ViewEmployeePayrollBreakdown
        params={{
          employeeId: grade?.employeeId,
          payrollId: grade?.payrollId,
        }}
        handleClose={cancelAction}
        open={action === "view"}
        showControls={false}
      />

      <div className="flex justify-end">
        {TableFocusTypeBtn<TPayslip>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      <Table
        columns={selectedColumns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default PayslipsTable;
