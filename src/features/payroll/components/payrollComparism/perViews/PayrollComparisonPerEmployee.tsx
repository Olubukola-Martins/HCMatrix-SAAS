import { Skeleton } from "antd";
import { TableWithFocusType } from "components/table";
import {
  TPayrollComaparisonType,
  useComparePayroll,
} from "features/payroll/hooks/payroll/comparison/useComparePayroll";
import { usePagination } from "hooks/usePagination";
import React from "react";
import {
  AttrCompsToDisplayText,
  PAYROLL_COMPARISON_PER_EMPLOYEE_TABLE_COLUMNS,
} from "./columns";
import { ColumnsType } from "antd/lib/table";
import { TEmployeesInPayrollData } from "features/payroll/types";
interface IProps {
  against: string;
  selected: string;
  type: TPayrollComaparisonType;
  payrollId: number;
}
const PayrollComparisonPerEmployee: React.FC<IProps> = (props) => {
  const { data, isLoading } = useComparePayroll({ data: props });
  const { onChange, pagination } = usePagination();
  const extraColumnsToDisplay: ColumnsType<TEmployeesInPayrollData> =
    data?.componentHeadersToDisplay
      ? data?.componentHeadersToDisplay?.map((name) => ({
          title: <span className="capitalize">{name}</span>,
          dataIndex: name,
          key: name,
          render: (_, item) => (
            <AttrCompsToDisplayText
              {...{
                againstEmployeesData: data.againstPayroll.employeePayrolls,
                _key: name,
                selectedEmployee: item,
              }}
            />
          ),
        }))
      : [];
  const columns = PAYROLL_COMPARISON_PER_EMPLOYEE_TABLE_COLUMNS({
    againstEmployeesPayrollData: data?.againstPayroll.employeePayrolls,
    extraColumns: extraColumnsToDisplay,
  });
  const selectedEmployeePayrolls =
    data?.selectedPayroll.employeePayrolls?.map((item) => ({
      ...item,
      key: item.id,
      payrollDate: data.selectedPayroll.date,
    })) ?? [];
  const againstEmployeePayrolls =
    data?.againstPayroll.employeePayrolls?.map((item) => ({
      ...item,
      key: item.id,
      payrollDate: data.againstPayroll.date,
    })) ?? [];
  return (
    <Skeleton loading={isLoading} paragraph={{ rows: 10 }}>
      <TableWithFocusType
        size="small"
        columns={columns}
        dataSource={[
          ...selectedEmployeePayrolls,
          ...againstEmployeePayrolls,
        ].sort((a, b) => a.employeeId - b.employeeId)}
        loading={isLoading}
        pagination={{
          ...pagination,
          total: data?.selectedPayroll.employeePayrolls?.length,
        }}
        onChange={onChange}
        scroll={{ x: "max-content" }}
      />
    </Skeleton>
  );
};

export default PayrollComparisonPerEmployee;
