import {  TablePaginationConfig, TableProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TTransaction } from "features/payroll/types";
import React from "react";
import { TableWithFocusType } from "components/table";
const TransactionTable: React.FC<{
  columns: ColumnsType<TTransaction>;
  data?: TTransaction[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TTransaction>["onChange"];
  total?: number;
}> = ({ data, loading, pagination, onChange, total, columns }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-slate-300 italic">
        {total} total tranactions
      </span>
      <TableWithFocusType
        size="small"
        dataSource={data}
        loading={loading}
        columns={columns}
        pagination={{ ...pagination, total }}
        onChange={onChange}
      />
    </div>
  );
};

export default TransactionTable;
