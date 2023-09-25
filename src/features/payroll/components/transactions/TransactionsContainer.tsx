import {
  TTransaction,
  TTransactionStatus,
  TTransactionType,
} from "features/payroll/types";
import { ColumnsType } from "antd/lib/table";
import { usePagination } from "hooks/usePagination";
import TransactionTable from "./TransactionTable";
import {
  TTransactionApiEntity,
  useGetTransactionsByApiEntity,
} from "features/payroll/hooks/transactions/useGetTransactionsByApiEntity";

export const TransactionsContainer: React.FC<{
  columns: ColumnsType<TTransaction>;
  status?: TTransactionStatus[];
  type?: TTransactionType[];
  employeeId?: number;

  transactionApiEntity: TTransactionApiEntity;
}> = ({ columns, type, transactionApiEntity, status, employeeId }) => {
  // TODO: fetch  transactions when api is ready
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetTransactionsByApiEntity({
    transactionApiEntity,
    props: {
      type,
      status,
      employeeId,
      pagination,
    },
  });

  return (
    <div>
      <TransactionTable
        data={data?.data}
        columns={columns}
        pagination={pagination}
        onChange={onChange}
        total={data?.total}
        loading={isFetching}
      />
    </div>
  );
};
