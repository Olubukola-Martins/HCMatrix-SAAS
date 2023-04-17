import { TablePaginationConfig } from "antd";

import React, { useState } from "react";
import { useFetchAllBasicWorkflows } from "../hooks/useFetchAllBasicWorkflows";
import { WorkflowsTable } from "./WorkflowsTable";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { ErrorComponent } from "components/errorHandlers/ErrorComponent";
import { DataContainerLoader } from "components/loaders/DataContainerLoader";

export const WorkflowsViewContainer = () => {
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
  const { data, isError, isFetching, isSuccess } = useFetchAllBasicWorkflows({
    pagination: {
      limit: pagination.pageSize,
      offset,
    },
  });

  return (
    <>
      <div className="mt-5 flex flex-col gap-4">
        <div className="content overflow-y-hidden relative">
          {!isSuccess && !isError && <DataContainerLoader />}
          {isError && (
            <ErrorComponent
              message="Oops! Something went wrong."
              supportText="Please check back in a minute"
            />
          )}

          {isSuccess && (
            <WorkflowsTable
              data={data?.data}
              loading={isFetching}
              pagination={{ ...pagination, total: data?.total }}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </>
  );
};
