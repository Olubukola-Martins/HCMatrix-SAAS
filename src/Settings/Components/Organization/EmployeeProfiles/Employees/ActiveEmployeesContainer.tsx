import { TablePaginationConfig } from "antd";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useFetchEmployees } from "../../../../../APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "../../../../../AppTypes/Auth";
import { TEmployee } from "../../../../../AppTypes/DataEntitities";
import { GlobalContext } from "../../../../../Contexts/GlobalContextProvider";
import ActiveEmpTableView from "./ActiveEmpTableView";

const ActiveEmployeesContainer = () => {
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
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
    token,
    status: ["probation", "confirmed"],

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
      <ActiveEmpTableView
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

export default ActiveEmployeesContainer;
