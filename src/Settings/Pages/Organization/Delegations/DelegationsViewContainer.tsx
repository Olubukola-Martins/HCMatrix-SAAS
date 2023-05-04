import { Table, TablePaginationConfig } from "antd";
import { ColumnsType } from "antd/lib/table";

import { listPageSize } from "Constants";
import { useApiAuth } from "Hooks/useApiAuth";
import moment from "moment";
import { useState } from "react";

import { ErrorComponent } from "../../../../GeneralComps/ErrorComps";
import { DataContainerLoader } from "../../../../GeneralComps/LoaderComps";
import { DelegationDetail } from "./DelegationDetail";

import { TDelegation, useFetchDelegations } from "./hooks/useFetchDelegations";

const DelegationsViewContainer = () => {
  const { token, companyId } = useApiAuth();
  const [delegationId, setDelegationId] = useState<number>();
  const [showModal, setShowModal] = useState(false);

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
  const view = (id: number) => {
    setDelegationId(id);
    setShowModal(true);
  };
  const { data, isFetching } = useFetchDelegations({
    companyId,
    pagination: {
      limit: pagination.pageSize,
      offset,
      current: pagination.current,
    },
    token,
  });
  const columns: ColumnsType<TDelegation> = [
    {
      title: "Delegator",
      dataIndex: "Delegator",
      key: "Delegator",
      render: (_, item) => (
        <span className="capitalize">
          {item.delegator.firstName} {item.delegator.lastName}
        </span>
      ),
    },
    {
      title: "Delegatee",
      dataIndex: "Delegatee",
      key: "Delegatee",
      render: (_, item) => (
        <span className="capitalize">
          {item.delegatee.firstName} {item.delegatee.lastName}
        </span>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (val) => <span>{moment(val).format("YYYY/MM/DD")}</span>,
    },
    {
      title: "Expires On",
      dataIndex: "endDate",
      key: "endDate",
      render: (val) => <span>{moment(val).format("YYYY/MM/DD")}</span>,
    },
    {
      title: "Permission Count",
      dataIndex: "Permission",
      key: "Permission",
      ellipsis: true,
      render: (_, item) => `${item.permissions.length}`,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, item) => (
        <div className="flex items-center gap-3 text-lg">
          <i
            className="ri-eye-line cursor-pointer hover:text-caramel"
            onClick={() => view(item.id)}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <>
      {delegationId && (
        <DelegationDetail
          open={showModal}
          handleClose={() => {
            setShowModal(false);
            setDelegationId(undefined);
          }}
          id={delegationId}
        />
      )}
      <div className="mt-5 flex flex-col gap-4">
        <div className="content overflow-y-hidden relative">
          <Table
            columns={columns}
            size="small"
            dataSource={data?.data}
            loading={isFetching}
            pagination={pagination}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default DelegationsViewContainer;
