import { Tooltip } from "antd";

import { useEffect, useState } from "react";

import { TListDataTypeView } from "types";
import { usePagination } from "hooks/usePagination";
import { TRole } from "../types";

import { DeleteRole } from "./DeleteRole";
import { useFetchRoles } from "../hooks/useFetchRoles";
import { RolesGridView } from "./RolesGridView";
import { RolesTableView } from "./RolesTableView";

type TAction = "delete";

const RolesViewContainer = () => {
  const [viewId, setViewId] = useState<TListDataTypeView>("grid");
  const handleViewId = (val: TListDataTypeView) => {
    setViewId(val);
  };
  const { pagination, onChange, resetPagination } = usePagination();

  const { data: roles, isFetching } = useFetchRoles({
    pagination,
  });

  // to be able to maitain diff page size per diff view
  useEffect(() => {
    resetPagination();
  }, [resetPagination, viewId]);

  const [selectedRole, setSelectedRole] = useState<TRole>();

  const [action, setAction] = useState<TAction>();

  const deleteRole = (val: TRole) => {
    setSelectedRole(val);
    setAction("delete");
  };
  return (
    <>
      <DeleteRole
        open={action === "delete"}
        role={selectedRole}
        handleClose={() => setAction(undefined)}
      />
      <div className="mt-5 flex flex-col gap-4">
        <div className="view-toggler flex rounded overflow-hidden items-center">
          <Tooltip title="Grid View">
            <i
              onClick={() => handleViewId("grid")}
              className={
                viewId === "grid"
                  ? "ri-layout-grid-fill text-base text-white bg-caramel px-2 border cursor-pointer"
                  : "ri-layout-grid-fill text-base text-black bg-white px-2 border cursor-pointer"
              }
              aria-hidden="true"
            ></i>
          </Tooltip>

          <Tooltip title="List View">
            <i
              className={
                viewId === "list"
                  ? "ri-list-unordered text-base text-white bg-caramel px-2 border cursor-pointer"
                  : "ri-list-unordered text-base text-black bg-white px-2 border cursor-pointer"
              }
              onClick={() => handleViewId("list")}
              aria-hidden="true"
            ></i>
          </Tooltip>
        </div>
        <div className="content overflow-y-hidden relative">
          {viewId === "grid" && (
            <RolesGridView
              data={roles?.data}
              loading={isFetching}
              pagination={{ ...pagination, total: roles?.total }}
              onChange={onChange}
              deleteRole={deleteRole}
            />
          )}

          {viewId === "list" && (
            <RolesTableView
              data={roles?.data}
              loading={isFetching}
              pagination={{ ...pagination, total: roles?.total }}
              onChange={onChange}
              deleteRole={deleteRole}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RolesViewContainer;
