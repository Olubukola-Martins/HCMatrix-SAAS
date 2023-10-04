import { Tooltip } from "antd";

import React, { useEffect, useState } from "react";
import { DepartmentsGridView } from "./DepartmentsGridView";
import { DepartmentsTableView } from "./DepartmentsTableView";
import {
  QUERY_KEY_FOR_DEPARTMENTS,
  useFetchDepartments,
} from "../hooks/useFetchDepartments";
import { TListDataTypeView } from "types";
import { DataContainerLoader } from "components/loaders/DataContainerLoader";
import { ErrorComponent } from "components/errorHandlers/ErrorComponent";
import { usePagination } from "hooks/usePagination";
import { useQueryClient } from "react-query";
import { TCreateDepProps, TDepartment } from "../types";
import { useUpdateDepartment } from "../hooks/useUpdateDepartment";
import { openNotification } from "utils/notifications";
import { SaveDepartment } from "./SaveDepartment";
import { DeleteDepartment } from "./DeleteDepartment";

type TAction = "view" | "edit" | "delete";

const DepartmentsViewContainer = () => {
  const [viewId, setViewId] = useState<TListDataTypeView>("list");
  const handleViewId = (val: TListDataTypeView) => {
    setViewId(val);
  };
  const { pagination, onChange, resetPagination } = usePagination();

  const { data: departmentData, isFetching } = useFetchDepartments({
    pagination,
  });

  // to be able to maitain diff page size per diff view
  useEffect(() => {
    resetPagination();
  }, [resetPagination, viewId]);

  const queryClient = useQueryClient();
  const [selectedDepartment, setSelectedDepartment] = useState<TDepartment>();

  const [action, setAction] = useState<TAction>();
  const {
    mutate,
    isLoading,
    isSuccess: isSuccUpdateDept,
  } = useUpdateDepartment();
  const handleUpdateDepartment = (data: TCreateDepProps) => {
    if (!selectedDepartment) return;
    mutate(
      {
        id: selectedDepartment.id,
        data,
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
          setAction(undefined);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_DEPARTMENTS],
            // exact: true,
          });
        },
      }
    );
  };

  const editDepartment = (val: TDepartment) => {
    setSelectedDepartment(val);
    setAction("edit");
  };
  const viewDepartment = (val: TDepartment) => {
    setSelectedDepartment(val);
    setAction("view");
  };
  const deleteDepartment = (val: TDepartment) => {
    setSelectedDepartment(val);
    setAction("delete");
  };
  return (
    <>
      <SaveDepartment
        key="edit"
        open={action === "edit"}
        action="edit"
        title="Edit Department"
        onSubmit={{
          fn: handleUpdateDepartment,
          isLoading,
          isSuccess: isSuccUpdateDept,
        }}
        department={selectedDepartment}
        handleClose={() => setAction(undefined)}
      />
      <SaveDepartment
        key="view"
        open={action === "view"}
        action="view"
        title="View Department"
        department={selectedDepartment}
        handleClose={() => setAction(undefined)}
      />
      <DeleteDepartment
        open={action === "delete"}
        department={selectedDepartment}
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
            <DepartmentsGridView
              data={departmentData?.data}
              loading={isFetching}
              pagination={{ ...pagination, total: departmentData?.total }}
              onChange={onChange}
              editDepartment={editDepartment}
              viewDepartment={viewDepartment}
              deleteDepartment={deleteDepartment}
            />
          )}

          {viewId === "list" && (
            <DepartmentsTableView
              data={departmentData?.data}
              loading={isFetching}
              pagination={{ ...pagination, total: departmentData?.total }}
              onChange={onChange}
              editDepartment={editDepartment}
              viewDepartment={viewDepartment}
              deleteDepartment={deleteDepartment}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DepartmentsViewContainer;
