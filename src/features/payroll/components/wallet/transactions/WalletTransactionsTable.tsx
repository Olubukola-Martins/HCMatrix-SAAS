import { Input, Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { usePagination } from "hooks/usePagination";
import { TableFocusTypeBtn } from "components/table";
import {
  TWalletTransaction,
  TWalletTransactionAction,
  TWalletTransactionFilterProps,
} from "features/payroll/types/payrollWallet";
import { WALLET_TRANSACTION_TABLE_COLUMNS } from "./columns";

import { ViewWalletTransaction } from "./ViewWalletTransaction";
import FilterWalletTransactions from "./FilterWalletTransactions";

export const WalletTransactionsTable: React.FC = () => {
  const [filter, setFilter] = useState<TWalletTransactionFilterProps>({});
  const [showM, setShowM] = useState<TWalletTransactionAction | "filter">();
  const [transaction, setTransaction] = useState<TWalletTransaction>();
  const handleAction = (
    data: TWalletTransaction,
    action: TWalletTransactionAction
  ) => {
    setShowM(action);
    setTransaction(data);
  };

  const { pagination, onChange } = usePagination();

  const columns: ColumnsType<TWalletTransaction> =
    WALLET_TRANSACTION_TABLE_COLUMNS(handleAction);
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TWalletTransaction>>(columns);
  return (
    <div className="space-y-4">
      <ViewWalletTransaction
        open={showM === "view"}
        handleClose={() => setShowM(undefined)}
        transaction={transaction}
      />
      <FilterWalletTransactions
        handleClose={() => setShowM(undefined)}
        open={showM === "filter"}
        handleFilter={(vals) => setFilter(vals)}
      />
      <div className="flex justify-end items-center">
        <div className="flex-1 flex justify-between items-center">
          <button
            className="transparentButton flex items-center gap-2"
            onClick={() => setShowM("filter")}
          >
            <span>Filter</span>
          </button>
          <Input.Search />
        </div>
        {TableFocusTypeBtn<TWalletTransaction>({
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
        dataSource={[]}
        loading={false}
        pagination={{ ...pagination, total: 0 }}
        onChange={onChange}
      />
    </div>
  );
};
