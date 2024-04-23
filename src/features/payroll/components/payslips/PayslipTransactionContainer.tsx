import { Tabs } from "antd";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import React from "react";
import { PayslipsContainer } from "./PayslipsContainer";
import { TransactionsContainer } from "../transactions/TransactionsContainer";
import { TTransaction } from "features/payroll/types";
import { ColumnsType } from "antd/lib/table";
import {
  TFilterTransactionContainerProps,
  withFilterTransactionContainer,
} from "../transactions/hoc/FilterTransactionContainerProps";
import { PAYSLIP_TRANSACTION_TABLE_COLUMNS } from "./columns/payslip-transaction";

const columns: ColumnsType<TTransaction> = PAYSLIP_TRANSACTION_TABLE_COLUMNS;

interface IProps {
  employeePayrollType?: TPayrollSchemeType;
}

interface ComponentProps {}

const Component: React.FC<
  ComponentProps & TFilterTransactionContainerProps
> = ({ status, transactionType }) => {
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TTransaction>>(columns);
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {TableFocusTypeBtn<TTransaction>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      <TransactionsContainer
        columns={selectedColumns}
        status={status}
        type={transactionType}
        transactionApiEntity={`transaction`}
      />
    </div>
  );
};
const TransactionsWithFilter = withFilterTransactionContainer(Component, {
  displayEmployeeFilter: false,
  displayStatusFilter: true,
  displayTransactionTypeFilter: true,
});
const PayslipTransactionContainer: React.FC<IProps> = ({
  employeePayrollType,
}) => {
  const tabItems = [
    {
      key: "Payslips",
      label: "Payslips",
      children: (
        <PayslipsContainer
          role="employee" //TODO: Refactor the comp in folder to exists in selfservice/payslips
          defaultScheme={employeePayrollType}
        />
      ),
    },
    {
      key: "Transactions",
      label: "Transactions",
      children: <TransactionsWithFilter />,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        <Tabs items={tabItems} />
      </div>
    </>
  );
};

export default PayslipTransactionContainer;
