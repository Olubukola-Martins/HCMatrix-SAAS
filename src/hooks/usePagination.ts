import { useState } from "react";
import { TablePaginationConfig } from "antd/es/table";

const DEFAULT_PAGE_SIZE = 4;

export const usePagination = ({
  pageSize = DEFAULT_PAGE_SIZE,
}: { pageSize?: number } = {}) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize,
    total: 0,
    showSizeChanger: false,
  });

  const offset =
    pagination.current && pagination.current !== 1
      ? (pagination.pageSize ?? 4) * (pagination.current - 1)
      : 0;
  const onChange = (newPagination: TablePaginationConfig | number) => {
    if (typeof newPagination === "number") {
      setPagination(() => ({
        current: newPagination,
      }));
    } else {
      setPagination(() => ({
        ...newPagination,
      }));
    }
  };
  return {
    onChange,
    pagination: {
      ...pagination,
      limit: pagination.pageSize,
      offset,
    },
  };
};
