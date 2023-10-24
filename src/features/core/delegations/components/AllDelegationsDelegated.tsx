import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DelegationDetail } from "./DelegationDetail";
import moment from "moment";
import { useState } from "react";
import { TDelegation } from "../types";
import { usePagination } from "hooks/usePagination";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useGetAllDelegationsDelegated } from "../hooks/useGetAllDelegationsDelegated";

const AllDelegationsDelegated = () => {
  const [delegationId, setDelegationId] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const { onChange, pagination } = usePagination();
  const view = (id: number) => {
    setDelegationId(id);
    setShowModal(true);
  };
  const { data, isFetching } = useGetAllDelegationsDelegated({
    pagination,
  });
  const columns: ColumnsType<TDelegation> = [
    {
      title: "Delegator",
      dataIndex: "Delegator",
      key: "Delegator",
      render: (_, item) => (
        <span className="capitalize">
          {getEmployeeFullName(item.delegator)}
        </span>
      ),
    },
    {
      title: "Delegatee",
      dataIndex: "Delegatee",
      key: "Delegatee",
      render: (_, item) => (
        <span className="capitalize">
          {getEmployeeFullName(item.delegatee)}
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

export default AllDelegationsDelegated;
