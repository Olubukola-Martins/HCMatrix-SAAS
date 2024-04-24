import { Table } from "antd";
import React, { useState } from "react";
import { TableFocusTypeBtn } from "./TableFocusTypeBtn";
import { ColumnsType } from "antd/lib/table";

export function TableWithFocusType<TEntity>(
  props: (typeof Table)["defaultProps"]
): JSX.Element {
  const columns = props?.columns ?? [];
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TEntity>>(columns);
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {TableFocusTypeBtn<TEntity>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      <Table {...{ ...props, columns: selectedColumns }} />
    </div>
  );
}

export default TableWithFocusType;
