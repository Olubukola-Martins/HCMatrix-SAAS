import { ColumnsType } from "antd/lib/table";
import { TPayrollListData } from "features/payroll/types/payroll";

type TPayrollComparisonPerTableData = {
  attrName: string;
  selected: number;
  against: number;
};
type TColData = ColumnsType<TPayrollComparisonPerTableData>;
export const constructPayrollComparisonPerTableData = (props: {
  selected?: TPayrollListData;
  against?: TPayrollListData;
  columnsToDisplay?: string[];
}): TPayrollComparisonPerTableData[] => {
  const { against, selected, columnsToDisplay = [] } = props;
  const extraRows = columnsToDisplay.map((col) => ({
    attrName: col,
    selected: selected?.["componentsToDisplay"]?.[col] ?? 0,
    against: against?.["componentsToDisplay"]?.[col] ?? 0,
  }));
  return [
    {
      attrName: "Employee Count",
      selected: selected?.employeePayrolls?.length ?? 0,
      against: against?.employeePayrolls?.length ?? 0,
    },
    {
      attrName: "Gross Amount",
      selected: selected?.totalGrossPay ?? 0,
      against: against?.totalGrossPay ?? 0,
    },
    {
      attrName: "Net Amount",
      selected: selected?.totalNetPay ?? 0,
      against: against?.totalNetPay ?? 0,
    },
    {
      attrName: "Allowances",
      selected: selected?.totalAllowances ?? 0,
      against: against?.totalAllowances ?? 0,
    },
    {
      attrName: "Deductions",
      selected: selected?.totalDeductions ?? 0,
      against: against?.totalDeductions ?? 0,
    },
    ...extraRows,
  ];
};
export const PAYROLL_COMPARISON_PER_TOTAL_TABLE_COLUMNS = (props: {
  selectedPayroll?: TPayrollListData;
  againstPayroll?: TPayrollListData;
}): TColData => {
  const { againstPayroll, selectedPayroll } = props;

  return [
    {
      title: "",
      dataIndex: "Attribute Name",
      key: "Attribute Name",
      render: (_, item) => item.attrName,
    },
    {
      title: <span className="capitalize">{selectedPayroll?.name}</span>,
      dataIndex: selectedPayroll?.name,
      key: selectedPayroll?.name,
      render: (_, item) => item.selected,
    },
    {
      title: <span className="capitalize">{againstPayroll?.name}</span>,
      dataIndex: againstPayroll?.name,
      key: againstPayroll?.name,
      render: (_, item) => item.against,
    },
  ];
};
