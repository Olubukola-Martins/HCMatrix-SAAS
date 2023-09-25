import React, { useState } from "react";

import { RolesGridView } from "./RolesGridView";
import { TListDataTypeView } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { useFetchRoles } from "../hooks/useFetchRoles";
import { usePagination } from "hooks/usePagination";

const RolesViewContainer = () => {
  const [viewId, setViewId] = useState<TListDataTypeView>("grid");
  const handleViewId = (val: TListDataTypeView) => {
    setViewId(val);
  };
  const { token, companyId } = useApiAuth();

  const { pagination, onChange } = usePagination();

  const {
    data: rolesData,
    isFetching,
    isSuccess,
  } = useFetchRoles({
    companyId,
    pagination,
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
        {/* {viewId === "list" && isSuccess && (
          <RolesTableView
            data={rolesData.data}
            loading={isFetching}
            pagination={{ ...pagination, total: rolesData.total }}
            onChange={onChange}
          />
        )} */}
      </div>
      {isSuccess && viewId === "grid" && (
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
