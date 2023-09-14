import {
  TTransaction,
  TTransactionStatus,
  TTransactionType,
} from "features/payroll/types";
import { ColumnsType } from "antd/lib/table";
import { usePagination } from "hooks/usePagination";
import TransactionTable from "./TransactionTable";

export const TransactionsContainer: React.FC<{
  columns: ColumnsType<TTransaction>;
  status?: TTransactionStatus[];
  employeeId?: number;
  type?: TTransactionType;
}> = ({ columns, type }) => {
  // TODO: fetch  transactions when api is ready
  const { pagination, onChange } = usePagination();

  return (
    <div>
      <TransactionTable
        data={[]}
        columns={columns}
        pagination={pagination}
        onChange={onChange}
        total={0}
      />
    </div>
  );
};
