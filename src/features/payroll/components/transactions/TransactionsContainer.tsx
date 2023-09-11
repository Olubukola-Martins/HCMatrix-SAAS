import {
  TTransaction,
  TTransactionStatus,
  TTransactionType,
} from "features/payroll/types";
import { ColumnsType } from "antd/lib/table";
import { usePagination } from "hooks/usePagination";
import TransactionTable from "./TransactionTable";

const DUMMY_DATA_DEB = [
  {
    amount: "N40000",

    sender: "James lopez",
    receiver: "Cost Centre",
    paidAt: "08/2023",
    payroll: "November Payroll",
    ref: "pop09c34",
    status: "Declined",
    type: "credit",
  },
  {
    amount: "N40000",

    sender: "Ruth Godwin",
    receiver: "Ruth Godwin",
    paidAt: "08/2023",
    payroll: "December Payroll",
    ref: "pop09c34",
    status: "Completed",
    type: "credit",
  },
];
const DUMMY_DATA_CRED = [
  {
    amount: "N40000",

    receiver: "Cost Centre",
    sender: "Inititor",
    paidAt: "08/2023",
    payroll: "",
    ref: "pop09c34",
    status: "Processing",
    type: "credit",
  },
];
export const TransactionsContainer: React.FC<{
  columns: ColumnsType<TTransaction>;
  status?: TTransactionStatus[];
  employeeId?: number;
  type?: TTransactionType;
}> = ({ columns, type }) => {
  // TODO: fetch  transactions when api is ready
  const { pagination, onChange } = usePagination();
  const DUMMY_DATA = type === "credit" ? DUMMY_DATA_CRED : DUMMY_DATA_DEB;
  return (
    <div>
      <TransactionTable
        data={DUMMY_DATA}
        columns={columns}
        pagination={pagination}
        onChange={onChange}
        total={DUMMY_DATA.length}
      />
    </div>
  );
};
