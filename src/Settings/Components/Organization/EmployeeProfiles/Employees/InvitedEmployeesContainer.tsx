import { TablePaginationConfig } from "antd";
import { listPageSize } from "Constants";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useFetchInvitedEmployees } from "../../../../../APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "../../../../../AppTypes/Auth";
import { TInvitedEmployee } from "../../../../../AppTypes/DataEntitities";
import { GlobalContext } from "../../../../../Contexts/GlobalContextProvider";

import InvitedEmpTableView from "./InvitedEmpTableView";

const InvitedEmployeesContainer = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;

  const [pagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: listPageSize,
    total: 0,
    showSizeChanger: false,
  });

  const offset =
    pagination.current && pagination.current !== 1
      ? (pagination.pageSize ?? listPageSize) * (pagination.current - 1)
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
      current: pagination.current,
    },
    token,
  });

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: TInvitedEmployee[]
    ) => {},
  };

  return (
    <div>
      <InvitedEmpTableView
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

export default InvitedEmployeesContainer;
