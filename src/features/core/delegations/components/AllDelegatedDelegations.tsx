import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DelegationDetail } from "./DelegationDetail";
import { useState } from "react";
import { TDelegation } from "../types";
import { usePagination } from "hooks/usePagination";
import { useGetAllDelegatedDelegations } from "../hooks/useGetAllDelegatedDelegations";
import { DELEGATIONS_TABLE_COLUMNS } from "./columns";
import { TableFocusTypeBtn } from "components/table";

const AllDelegatedDelegations = () => {
  const [delegationId, setDelegationId] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const { onChange, pagination } = usePagination();
  const view = (id: number) => {
    setDelegationId(id);
    setShowModal(true);
  };
  const { data, isFetching } = useGetAllDelegatedDelegations({
    pagination,
  });
  const columns = DELEGATIONS_TABLE_COLUMNS(view);
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TDelegation>>(columns);
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
        <div className="flex justify-end">
          {TableFocusTypeBtn<TDelegation>({
            selectedColumns,
            setSelectedColumns,
            data: {
              columns,
            },
          })}
        </div>
        <div className="content overflow-y-hidden relative">
          <Table
            columns={selectedColumns}
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

export default AllDelegatedDelegations;
