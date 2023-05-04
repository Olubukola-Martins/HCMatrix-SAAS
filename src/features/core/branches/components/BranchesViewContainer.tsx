import { TablePaginationConfig, Tooltip } from "antd";
import { useEffect, useState } from "react";

import { BranchesGridView } from "./BranchesGridView";
import { BranchesTableView } from "./BranchesTableView";

import { EditBranchModal } from "./EditBranchModal";
import { TListDataTypeView } from "types";
import { ErrorComponent } from "components/errorHandlers/ErrorComponent";
import { DataContainerLoader } from "components/loaders/DataContainerLoader";

import { useFetchBranches } from "../hooks/useFetchBranches";
import { DEFAULT_GRID_PAGE_SIZE, DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";

const BranchesViewContainer = () => {
  const [viewId, setViewId] = useState<TListDataTypeView>("list");
  const handleViewId = (val: TListDataTypeView) => {
    setViewId(val);
  };
  const { companyId, token } = useApiAuth();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
    showSizeChanger: false,
  });

  const offset =
    pagination.current && pagination.current !== 1
      ? (pagination.pageSize ?? DEFAULT_PAGE_SIZE) * (pagination.current - 1)
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

  const {
    data: branchData,
    isError,
    isFetching,
    isSuccess,
  } = useFetchBranches({
    companyId,
    pagination: {
      limit: pagination.pageSize,
      offset,
    },
    token,
  });

  // to be able to maitain diff page size per diff view
  useEffect(() => {
    if (viewId === "grid") {
      setPagination((val) => ({
        ...val,
        pageSize: DEFAULT_GRID_PAGE_SIZE,
        current: 1,
      }));
    } else {
      setPagination((val) => ({
        ...val,
        pageSize: DEFAULT_PAGE_SIZE,
        current: 1,
      }));
    }
  }, [viewId]);

  const [branchId, setBranchId] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editItem, setEditItem] = useState(false); //to disable edit on just view
  const editBranch = (id: number) => {
    setEditItem(true);
    setBranchId(id);
    setOpenEditModal(true);
  };
  const viewBranch = (id: number) => {
    setEditItem(false);
    setBranchId(id);
    setOpenEditModal(true);
  };
  const handleClose = () => {
    setBranchId(0);
    setOpenEditModal(false);
  };

  return (
    <>
      <EditBranchModal
        id={branchId}
        open={openEditModal}
        handleClose={handleClose}
        editable={editItem}
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
          {!isSuccess && !isError && <DataContainerLoader />}
          {isError && (
            <ErrorComponent
              message="Oops! Something went wrong."
              supportText="Please check back in a minute"
            />
          )}
          {viewId === "grid" && isSuccess && (
            <BranchesGridView
              data={branchData.data}
              loading={isFetching}
              pagination={{ ...pagination, total: branchData.total }}
              onChange={onChange}
              editBranch={editBranch}
              viewBranch={viewBranch}
            />
          )}

          {viewId === "list" && isSuccess && (
            <BranchesTableView
              data={branchData.data}
              loading={isFetching}
              pagination={{ ...pagination, total: branchData.total }}
              onChange={onChange}
              editBranch={editBranch}
              viewBranch={viewBranch}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BranchesViewContainer;
