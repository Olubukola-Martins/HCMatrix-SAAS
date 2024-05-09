import { Tooltip } from "antd";

import React, { useEffect, useState } from "react";

import { EditGroupDrawer } from "./EditGroupDrawer";
import GroupsTableView from "./GroupsTableView";
import GroupsGridView from "./GroupsGridView";

import { TListDataTypeView } from "types";

import { useFetchGroups } from "../hooks/useFetchGroups";
import { TGroup } from "../types";
import { usePagination } from "hooks/usePagination";
import { DeleteGroup } from "./DeleteGroup";

type TAction = "view" | "delete";

const GroupsViewContainer = () => {
  const [viewId, setViewId] = useState<TListDataTypeView>("list");
  const handleViewId = (val: TListDataTypeView) => {
    setViewId(val);
  };
  const { pagination, onChange, resetPagination } = usePagination();

  const { data: groupData, isFetching } = useFetchGroups({
    pagination,
  });

  // to be able to maitain diff page size per diff view
  useEffect(() => {
    resetPagination();
  }, [resetPagination, viewId]);

  const [selectedGroup, setSelectedGroup] = useState<TGroup>();

  const [action, setAction] = useState<TAction>();

  const viewGroup = (val: TGroup) => {
    setSelectedGroup(val);
    setAction("view");
  };
  const deleteGroup = (val: TGroup) => {
    setSelectedGroup(val);
    setAction("delete");
  };
  const onClose = () => {
    setSelectedGroup(undefined);
    setAction(undefined);
  };

  return (
    <>
      {selectedGroup && (
        <EditGroupDrawer
          entityId={selectedGroup?.id}
          handleClose={onClose}
          open={action === "view"}
        />
      )}
      <DeleteGroup
        open={action === "delete"}
        handleClose={onClose}
        group={selectedGroup}
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
            <GroupsGridView
              groups={groupData?.data}
              loading={isFetching}
              pagination={{ ...pagination, total: groupData?.total }}
              onChange={onChange}
              editGroup={viewGroup}
              deleteGroup={deleteGroup}
            />
          )}

          {viewId === "list" && (
            <GroupsTableView
              groups={groupData?.data}
              loading={isFetching}
              pagination={{ ...pagination, total: groupData?.total }}
              onChange={onChange}
              editGroup={viewGroup}
              deleteGroup={deleteGroup}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GroupsViewContainer;
