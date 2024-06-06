import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import { BranchesGridView } from "./BranchesGridView";
import { BranchesTableView } from "./BranchesTableView";
import { TListDataTypeView } from "types";
import {
  QUERY_KEY_FOR_BRANCHES,
  useFetchBranches,
} from "../hooks/useFetchBranches";
import { SaveBranch } from "./SaveBranch";
import { useUpdateBranch } from "../hooks/useUpdateBranch";
import { TBranch, TCreateBranchProps } from "../types";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { usePagination } from "hooks/usePagination";
import { DeleteBranch } from "./DeleteBranch";

type TAction = "view" | "edit" | "delete";

const BranchesViewContainer = () => {
  const [viewId, setViewId] = useState<TListDataTypeView>("list");
  const handleViewId = (val: TListDataTypeView) => {
    setViewId(val);
  };
  const { pagination, onChange, resetPagination } = usePagination();

  const { data: branchData, isFetching } = useFetchBranches({
    pagination,
  });

  // to be able to maitain diff page size per diff view
  useEffect(() => {
    resetPagination();
  }, [resetPagination, viewId]);

  const queryClient = useQueryClient();
  const [selectedBranch, setSelectedBranch] = useState<TBranch>();

  const [action, setAction] = useState<TAction>();
  const {
    mutate,
    isLoading,
    isSuccess: isSuccUpdateBranch,
  } = useUpdateBranch();
  const handleUpdateBranch = (data: TCreateBranchProps) => {
    if (!selectedBranch) return;
    mutate(
      {
        id: selectedBranch.id,
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
            queryKey: [QUERY_KEY_FOR_BRANCHES],
            // exact: true,
          });
        },
      }
    );
  };

  const editBranch = (val: TBranch) => {
    setSelectedBranch(val);
    setAction("edit");
  };
  const viewBranch = (val: TBranch) => {
    setSelectedBranch(val);
    setAction("view");
  };
  const deleteBranch = (val: TBranch) => {
    setSelectedBranch(val);
    setAction("delete");
  };

  return (
    <>
      <SaveBranch
        key="edit"
        open={action === "edit"}
        action="edit"
        title="Edit Branch"
        onSubmit={{
          fn: handleUpdateBranch,
          isLoading,
          isSuccess: isSuccUpdateBranch,
        }}
        branchId={selectedBranch?.id}
        handleClose={() => setAction(undefined)}
      />
      <SaveBranch
        key="view"
        open={action === "view"}
        action="view"
        title="View Branch"
        branchId={selectedBranch?.id}
        handleClose={() => setAction(undefined)}
      />
      <DeleteBranch
        open={action === "delete"}
        branch={selectedBranch}
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
            <BranchesGridView
              data={branchData?.data}
              loading={isFetching}
              pagination={{ ...pagination, total: branchData?.total }}
              onChange={onChange}
              editBranch={editBranch}
              viewBranch={viewBranch}
              deleteBranch={deleteBranch}
            />
          )}

          {viewId === "list" && (
            <BranchesTableView
              data={branchData?.data}
              loading={isFetching}
              pagination={{ ...pagination, total: branchData?.total }}
              onChange={onChange}
              editBranch={editBranch}
              viewBranch={viewBranch}
              deleteBranch={deleteBranch}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BranchesViewContainer;
