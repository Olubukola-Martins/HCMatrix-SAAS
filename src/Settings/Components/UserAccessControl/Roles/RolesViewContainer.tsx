import { TablePaginationConfig } from "antd";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { getRoles } from "../../../../ApiRequesHelpers/Auth/permissions";
import { getDepartments } from "../../../../ApiRequesHelpers/Utility/departments";
import { getDesignations } from "../../../../ApiRequesHelpers/Utility/designations";
import { useFetchRoles } from "../../../../APIRQHooks/Auth/roleHooks";
import { IAuthDets } from "../../../../AppTypes/Auth";
import {
  TDepartment,
  TDesignation,
  TRole,
} from "../../../../AppTypes/DataEntitities";
import { GlobalContext } from "../../../../Contexts/GlobalContextProvider";
import { openNotification } from "../../../../NotificationHelpers";
import { RolesGridView } from "./RolesGridView";

import { RolesTableView } from "./RolesTableView";

const RolesViewContainer = () => {
  const [viewId, setViewId] = useState("list");
  const handleViewId = (val: React.SetStateAction<string>) => {
    setViewId(val);
  };
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 4,
    total: 0,
    showSizeChanger: false,
  });

  const offset =
    pagination.current && pagination.current !== 1
      ? (pagination.pageSize ?? 4) * (pagination.current - 1)
      : 0;

  const onChange = (newPagination: TablePaginationConfig) => {
    setPagination(() => ({
      ...newPagination,
    }));
  };
  const {
    data: rolesData,
    isError,
    isFetching,
    isSuccess,
  } = useFetchRoles({
    companyId,
    pagination: {
      limit: pagination.pageSize,
      offset,
      current: pagination.current,
    },
    token,
  });

  return (
    <div className="mt-5 flex flex-col gap-4">
      {/* uncomment when needed */}
      {/* <div className="view-toggler flex rounded overflow-hidden items-center">
        <i
          onClick={() => handleViewId("grid")}
          className={
            viewId === "grid"
              ? "ri-layout-grid-fill text-base text-white bg-caramel px-2 border cursor-pointer"
              : "ri-layout-grid-fill text-base text-black bg-white px-2 border cursor-pointer"
          }
          aria-hidden="true"
        ></i>

        <i
          className={
            viewId === "list"
              ? "ri-list-unordered text-base text-white bg-caramel px-2 border cursor-pointer"
              : "ri-list-unordered text-base text-black bg-white px-2 border cursor-pointer"
          }
          onClick={() => handleViewId("list")}
          aria-hidden="true"
        ></i>
      </div> */}

      {/*Table view is hidden for now */}
      <div className="content overflow-y-hidden relative hidden">
        {viewId === "list" && isSuccess && (
          <RolesTableView
            data={rolesData.data}
            loading={isFetching}
            pagination={{ ...pagination, total: rolesData.total }}
            onChange={onChange}
          />
        )}
      </div>
      {isSuccess && (
        <RolesGridView
          data={rolesData.data}
          loading={isFetching}
          pagination={{ ...pagination, total: rolesData.total }}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default RolesViewContainer;
