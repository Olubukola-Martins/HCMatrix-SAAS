import { TablePaginationConfig, Tooltip } from "antd";
import { useDeleteGroup, useFetchGroups } from "APIRQHooks/Utility/groupHooks";
import { IAuthDets } from "AppTypes/Auth";
import { TDataView } from "AppTypes/Component";
import { gridPageSize, listPageSize } from "Constants";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { ErrorComponent } from "GeneralComps/ErrorComps";
import { DataContainerLoader } from "GeneralComps/LoaderComps";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

import { EditGroupDrawer } from "./EditGroupDrawer";
import GroupsTableView from "./GroupsTableView";
import GroupsGridView from "./GroupsGridView";
import { TGroup } from "AppTypes/DataEntitities";
import { openNotification } from "NotificationHelpers";
import { useQueryClient } from "react-query";

const GroupsViewContainer = () => {
  const queryClient = useQueryClient();

  const [viewId, setViewId] = useState<TDataView>("list");
  const handleViewId = (val: TDataView) => {
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
    pageSize: listPageSize,
    total: 0,
    showSizeChanger: false,
  });

  const offset =
    pagination.current && pagination.current !== 1
      ? (pagination.pageSize ?? listPageSize) * (pagination.current - 1)
      : 0;

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
  const { data, isError, isFetching, isSuccess } = useFetchGroups({
    token,
    companyId,
    pagination: {
      limit: pagination.pageSize,
      offset,
      current: pagination.current,
    },
  });

  // to be able to maitain diff page size per diff view
  useEffect(() => {
    if (viewId === "grid") {
      setPagination((val) => ({ ...val, pageSize: gridPageSize, current: 1 }));
    } else {
      setPagination((val) => ({ ...val, pageSize: listPageSize, current: 1 }));
    }
  }, [viewId]);
  const [entityId, setEntityId] = useState<number>();
  const [openEditModal, setOpenEditModal] = useState(false);
  const editDepartment = (id: number) => {
    setEntityId(id);
    setOpenEditModal(true);
  };
  const handleClose = () => {
    setEntityId(0);
    setOpenEditModal(false);
  };
  const { mutate: deleteMutate } = useDeleteGroup();

  const handleDeleteGroup = (id: number) => {
    if (companyId) {
      deleteMutate(
        {
          id: id,
          companyId,

          token,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });

            // form.resetFields(); //will be added if it was empty vals under to prevent it from being used in the row below on edit

            queryClient.invalidateQueries({
              queryKey: ["groups"],
              // exact: true,
            });
          },
        }
      );
    }
  };

  return (
    <>
      {entityId ? (
        <EditGroupDrawer
          entityId={entityId}
          open={openEditModal}
          handleClose={handleClose}
        />
      ) : null}

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
          {!isSuccess && !isError && <DataContainerLoader />}
          {isError && (
            <ErrorComponent
              message="Oops! Something went wrong."
              supportText="Please check back in a minute"
            />
          )}
          {viewId === "grid" && isSuccess && (
            <GroupsGridView
              groups={data.data}
              loading={isFetching}
              pagination={{ ...pagination, total: data.total }}
              onChange={onChange}
              editGroup={editDepartment}
              deleteGroup={handleDeleteGroup}
            />
          )}

          {viewId === "list" && isSuccess && (
            <GroupsTableView
              groups={data.data}
              loading={isFetching}
              pagination={{ ...pagination, total: data.total }}
              onChange={onChange}
              editGroup={editDepartment}
              deleteGroup={handleDeleteGroup}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GroupsViewContainer;
