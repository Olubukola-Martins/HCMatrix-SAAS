import { TablePaginationConfig } from "antd";
import { listPageSize } from "Constants";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useFetchEmployees } from "../../../../../APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "../../../../../AppTypes/Auth";
import { TEmployee } from "../../../../../AppTypes/DataEntitities";
import { GlobalContext } from "../../../../../Contexts/GlobalContextProvider";
import InactiveEmpTableView from "./InactiveEmpTableView";

const InactiveEmployeesContainer = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;

  const [pagination, setPagination] = useState<TablePaginationConfig>({
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
  } = useFetchEmployees({
    companyId,
    token,
    status: ["suspended", "terminated"],
    pagination: {
      limit: pagination.pageSize,
      offset,
      current: pagination.current,
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
