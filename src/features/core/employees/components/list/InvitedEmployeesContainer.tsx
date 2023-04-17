import { TablePaginationConfig } from "antd";

import InvitedEmpTableView from "./InvitedEmpTableView";
import { useApiAuth } from "hooks/useApiAuth";
import { useState } from "react";
import { useFetchInvitedEmployees } from "../../hooks/useFetchInvitedEmployees";
import { TInvitedEmployee } from "../../types";
import { DEFAULT_PAGE_SIZE } from "constants/general";

const InvitedEmployeesContainer = () => {
  const { token, companyId } = useApiAuth();

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
  } = useFetchInvitedEmployees({
    companyId,
    pagination: {
      limit: pagination.pageSize,
      offset,
    },
    token,
  });

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: TInvitedEmployee[]
    ) => {},
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
      <InvitedEmpTableView
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

export default InvitedEmployeesContainer;
