import { TablePaginationConfig } from "antd";

import React, { useState } from "react";

import ActiveEmpTableView from "./ActiveEmpTableView";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import { TEmployee } from "../../types";

const ActiveEmployeesContainer = () => {
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
    status: ["probation", "confirmed"],

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
      <ActiveEmpTableView
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

export default ActiveEmployeesContainer;
