import { TablePaginationConfig } from "antd";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getDepartments } from "../../../../ApiRequesHelpers/Utility/departments";
import { getDesignations } from "../../../../ApiRequesHelpers/Utility/designations";
import { useFetchDesignations } from "../../../../APIRQHooks/Utility/designationHooks";
import { TDepartment, TDesignation } from "../../../../AppTypes/DataEntitities";
import { GlobalContext } from "../../../../Contexts/GlobalContextProvider";
import { openNotification } from "../../../../NotificationHelpers";
import { DesignationsGridView } from "./DesignationsGridView";
import { DesignationsTableView } from "./DesignationsTableView";

const DesignationsViewContainer = () => {
  const [viewId, setViewId] = useState("list");
  const handleViewId = (val: React.SetStateAction<string>) => {
    setViewId(val);
  };
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
    data: designationData,
    isError,
    isFetching,
    isSuccess,
  } = useFetchDesignations({
    companyId,
    pagination: {
      limit: pagination.pageSize,
      offset,
      current: pagination.current,
    },
  });

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="view-toggler flex rounded overflow-hidden items-center">
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
      </div>
      <div className="content overflow-y-hidden relative">
        <AnimatePresence exitBeforeEnter>
          {viewId === "grid" && isSuccess && (
            <DesignationsGridView
              data={designationData.data}
              loading={isFetching}
              pagination={pagination}
              onChange={onChange}
            />
          )}

          {viewId === "list" && isSuccess && (
            <DesignationsTableView
              data={designationData.data}
              loading={isFetching}
              pagination={pagination}
              onChange={onChange}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DesignationsViewContainer;
