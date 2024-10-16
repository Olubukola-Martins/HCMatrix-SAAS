import { Table } from "antd";
import React, { useState } from "react";
import { TableFocusTypeBtn } from "./TableFocusTypeBtn";
import { ColumnsType } from "antd/lib/table";
import { TableProps } from "antd/es/table";

export function TableWithFocusType<TEntity extends object>(
  props: TableProps<TEntity> & {
    defaultSelectedColumns?: ColumnsType<TEntity>;
  }
): JSX.Element {
  const columns = props?.columns ?? [];
  const defaultSelectedColumns = props?.defaultSelectedColumns ?? columns;
  const [selectedColumns, setSelectedColumns] = useState<ColumnsType<TEntity>>(
    defaultSelectedColumns
  );
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
