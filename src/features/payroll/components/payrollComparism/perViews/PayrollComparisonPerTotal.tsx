import { Skeleton } from "antd";
import { TableWithFocusType } from "components/table";
import {
  TPayrollComaparisonType,
  useComparePayroll,
} from "features/payroll/hooks/payroll/comparison/useComparePayroll";
import React from "react";
import {
  PAYROLL_COMPARISON_PER_TOTAL_TABLE_COLUMNS,
  constructPayrollComparisonPerTableData,
} from "./columns";
interface IProps {
  against: string;
  selected: string;
  type: TPayrollComaparisonType;
  payrollId: number;
}
const PayrollComparisonPerTotal: React.FC<IProps> = (props) => {
  const { data, isLoading } = useComparePayroll({ data: props });
  const columns = PAYROLL_COMPARISON_PER_TOTAL_TABLE_COLUMNS({
    againstPayroll: data?.againstPayroll,
    selectedPayroll: data?.selectedPayroll,
  });
  const dataSource = constructPayrollComparisonPerTableData({
    against: data?.againstPayroll,
    selected: data?.selectedPayroll,
    columnsToDisplay: data?.componentHeadersToDisplay,
  })?.map((item, i) => ({
    ...item,
    key: i,
  }));
  return (
    <Skeleton loading={isLoading} paragraph={{ rows: 10 }}>
      <TableWithFocusType
        size="small"
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </Skeleton>
  );
};

export default PayrollComparisonPerTotal;
