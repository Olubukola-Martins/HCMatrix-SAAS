import { TablePaginationConfig, Tooltip } from "antd";
import { gridPageSize, listPageSize } from "Constants";
import { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useFetchDesignations } from "../../../../APIRQHooks/Utility/designationHooks";
import { IAuthDets } from "../../../../AppTypes/Auth";
import { TDataView } from "../../../../AppTypes/Component";
import { GlobalContext } from "../../../../Contexts/GlobalContextProvider";
import { ErrorComponent } from "../../../../GeneralComps/ErrorComps";
import { DataContainerLoader } from "../../../../GeneralComps/LoaderComps";
import { DesignationsGridView } from "./DesignationsGridView";
import { DesignationsTableView } from "./DesignationsTableView";
import { EditDesignationModal } from "./EditDesignationModal";

const DesignationsViewContainer = () => {
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
    token,
  });

  // to be able to maitain diff page size per diff view
  useEffect(() => {
    if (viewId === "grid") {
      setPagination((val) => ({ ...val, pageSize: gridPageSize, current: 1 }));
    } else {
      setPagination((val) => ({ ...val, pageSize: listPageSize, current: 1 }));
    }
  }, [viewId]);

  const [designationId, setDesignationId] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const editDesignation = (id: number) => {
    setDesignationId(id);
    setOpenEditModal(true);
  };
  const handleClose = () => {
    setDesignationId(0);
    setOpenEditModal(false);
  };

  return (
    <>
      <EditDesignationModal
        id={designationId}
        open={openEditModal}
        handleClose={handleClose}
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
            <DesignationsGridView
              data={designationData.data}
              loading={isFetching}
              pagination={{ ...pagination, total: designationData.total }}
              onChange={onChange}
              editDesignation={editDesignation}
            />
          )}

          {viewId === "list" && isSuccess && (
            <DesignationsTableView
              data={designationData.data}
              loading={isFetching}
              pagination={{ ...pagination, total: designationData.total }}
              onChange={onChange}
              editDesignation={editDesignation}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DesignationsViewContainer;
