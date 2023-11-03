import { Tooltip } from "antd";
import { DesignationsGridView } from "./DesignationsGridView";
import { DesignationsTableView } from "./DesignationsTableView";
import { TListDataTypeView } from "types";
import { useEffect, useState } from "react";
import {
  QUERY_KEY_FOR_DESIGNATIONS,
  useFetchDesignations,
} from "../hooks/useFetchDesignations";
import { useQueryClient } from "react-query";
import { usePagination } from "hooks/usePagination";
import { ICreateDegProps, TDesignation } from "../types";
import { useUpdateDesignation } from "../hooks/useUpdateDesignation";
import { openNotification } from "utils/notifications";
import { SaveDesignation } from "./SaveDesignation";
import { DeleteDesignation } from "./DeleteDesignation";

type TAction = "view" | "edit" | "delete";

const DesignationsViewContainer = () => {
  const [viewId, setViewId] = useState<TListDataTypeView>("list");
  const handleViewId = (val: TListDataTypeView) => {
    setViewId(val);
  };
  const { pagination, onChange, resetPagination } = usePagination();

  const { data: designationData, isFetching } = useFetchDesignations({
    pagination,
  });

  // to be able to maitain diff page size per diff view
  useEffect(() => {
    resetPagination();
  }, [resetPagination, viewId]);

  const queryClient = useQueryClient();
  const [selectedDesignation, setSelectedDesignation] =
    useState<TDesignation>();

  const [action, setAction] = useState<TAction>();
  const {
    mutate,
    isLoading,
    isSuccess: isSuccUpdateDesignation,
  } = useUpdateDesignation();
  const handleUpdateDesignation = (data: ICreateDegProps) => {
    if (!selectedDesignation) return;
    mutate(
      {
        id: selectedDesignation.id,
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
            queryKey: [QUERY_KEY_FOR_DESIGNATIONS],
            // exact: true,
          });
        },
      }
    );
  };

  const editDesignation = (val: TDesignation) => {
    setSelectedDesignation(val);
    setAction("edit");
  };
  const viewDesignation = (val: TDesignation) => {
    setSelectedDesignation(val);
    setAction("view");
  };
  const deleteDesignation = (val: TDesignation) => {
    setSelectedDesignation(val);
    setAction("delete");
  };
  return (
    <>
      <SaveDesignation
        key="edit"
        open={action === "edit"}
        action="edit"
        title="Edit Designation"
        onSubmit={{
          fn: handleUpdateDesignation,
          isLoading,
          isSuccess: isSuccUpdateDesignation,
        }}
        designation={selectedDesignation}
        handleClose={() => setAction(undefined)}
      />
      <SaveDesignation
        key="view"
        open={action === "view"}
        action="view"
        title="View Designation"
        designation={selectedDesignation}
        handleClose={() => setAction(undefined)}
      />
      <DeleteDesignation
        open={action === "delete"}
        designation={selectedDesignation}
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
            <DesignationsGridView
              data={designationData?.data}
              loading={isFetching}
              pagination={{ ...pagination, total: designationData?.total }}
              onChange={onChange}
              editDesignation={editDesignation}
              viewDesignation={viewDesignation}
              deleteDesignation={deleteDesignation}
            />
          )}

          {viewId === "list" && (
            <DesignationsTableView
              data={designationData?.data}
              loading={isFetching}
              pagination={{ ...pagination, total: designationData?.total }}
              onChange={onChange}
              editDesignation={editDesignation}
              viewDesignation={viewDesignation}
              deleteDesignation={deleteDesignation}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DesignationsViewContainer;
