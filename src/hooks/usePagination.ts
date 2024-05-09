import { useCallback, useState } from "react";
import { TablePaginationConfig } from "antd/es/table";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from "constants/general";

export const usePagination = ({
  pageSize = DEFAULT_PAGE_SIZE,
}: { pageSize?: number } = {}) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize,
    total: 0,
    showSizeChanger: false,
  });

  const resetPagination = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  }, []);

  const offset =
    pagination.current && pagination.current !== 1
      ? (pagination.pageSize ?? DEFAULT_PAGE_SIZE) * (pagination.current - 1)
      : 0;
  const onChange = (newPagination: TablePaginationConfig | number) => {
    if (typeof newPagination === "number") {
      setPagination((prev) => ({
        ...prev,

        current: newPagination,
      }));
    } else {
      setPagination((prev) => ({
        ...prev,
        ...newPagination,
      }));
    }
  };
  return {
    onChange,
    pagination: {
      ...pagination,
      limit: pagination.pageSize,
      pageSize: pagination.pageSize,
      offset,
      showSizeChanger: true,
      pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
      onChange: (page: number, pageSize: number) => {
        setPagination((prev) => ({
          ...prev,
          pageSize,
          current: 1,
        }));
      },
    },
    resetPagination,
  };
};
