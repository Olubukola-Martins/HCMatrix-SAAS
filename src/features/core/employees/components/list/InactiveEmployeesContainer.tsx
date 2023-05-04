import { TablePaginationConfig } from "antd";

import InactiveEmpTableView from "./InactiveEmpTableView";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useState } from "react";
import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import { TEmployee } from "../../types";

const InactiveEmployeesContainer = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
    showSizeChanger: false,
  });

  const offset =
    pagination.current && pagination.current !== 1
      ? (pagination.pageSize ?? DEFAULT_PAGE_SIZE) * (pagination.current - 1)
      : 0;
  const {
    data: employeeData,
    isSuccess,
    isFetching,
  } = useFetchEmployees({
    status: ["suspended", "terminated"],
    pagination: {
      limit: pagination.pageSize,
      offset,
    },
  });

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TEmployee[]) => {},
  };
  const onChange = (newPagination: TablePaginationConfig | number) => {
    if (typeof newPagination === "number") {
      setPagination((val) => ({
        ...val,
        current: newPagination,
      }));
    } else {
      setPagination((val) => ({
        ...val,
        current: newPagination.current,
      }));
    }
  };

  return (
    <div>
      <InactiveEmpTableView
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        pagination={{ ...pagination, total: employeeData?.total }}
        loading={isFetching}
        employees={isSuccess ? employeeData.data : []}
        onChange={onChange}
      />
    </div>
  );
};

export default InactiveEmployeesContainer;
