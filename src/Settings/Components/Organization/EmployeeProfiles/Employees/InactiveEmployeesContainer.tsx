import { TablePaginationConfig } from "antd";
import React, { useContext, useState } from "react";
import { useFetchEmployees } from "../../../../../APIRQHooks/Utility/employeeHooks";
import { TEmployee } from "../../../../../AppTypes/DataEntitities";
import { GlobalContext } from "../../../../../Contexts/GlobalContextProvider";
import ActiveEmpTableView from "./ActiveEmpTableView";
import InactiveEmpTableView from "./InactiveEmpTableView";

const InactiveEmployeesContainer = () => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;

  const [pagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 4,
    total: 0,
    showSizeChanger: false,
  });

  const offset =
    pagination.current && pagination.current !== 1
      ? (pagination.pageSize ?? 4) * (pagination.current - 1)
      : 0;
  const {
    data: employeeData,
    isSuccess,
    isFetching,
  } = useFetchEmployees({
    companyId,
    pagination: {
      limit: pagination.pageSize,
      offset,
      current: pagination.current,
    },
  });

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TEmployee[]) => {},
  };

  return (
    <div>
      <InactiveEmpTableView
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        loading={isFetching}
        employees={isSuccess ? employeeData.data : []}
      />
    </div>
  );
};

export default InactiveEmployeesContainer;
