import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Table } from "antd";
import { THospital } from "../../../types/hospital/hospital";
import { useGetHospitals } from "../../../hooks/hospital/useGetHospitals";
import { ViewHospital } from "./ViewHospital";
import { EditHospital } from "./EditHospital";
import { DeleteHospital } from "./DeleteHospital";
import { HOSPITAL_TABLE_COLUMNS } from "../../columns/hospitals";
import { TableFocusTypeBtn } from "components/table";

export type THospitalAction = "edit" | "view" | "delete";
export const HospitalTable: React.FC<{
  search?: string;
  stateId?: number;
  type?: "mine";
  showDelete?: boolean;
  showEdit?: boolean;
}> = ({ search, stateId, type, showDelete, showEdit }) => {
  const [hospital, setHospital] = useState<THospital>();
  const [action, setAction] = useState<THospitalAction>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetHospitals({
    type,
    props: {
      pagination,
      searchParams: { name: search },
      stateId,
    },
  });
  const handleAction = (action: THospitalAction, data: THospital) => {
    setAction(action);
    setHospital(data);
  };

  const columns: ColumnsType<THospital> = HOSPITAL_TABLE_COLUMNS(
    handleAction,
    showEdit,
    showDelete
  );
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<THospital>>(columns);

  return (
    <div>
      <ViewHospital
        handleClose={() => setAction(undefined)}
        hospital={hospital}
        open={action === "view"}
      />
      <EditHospital
        handleClose={() => setAction(undefined)}
        hospital={hospital}
        open={action === "edit"}
      />
      <DeleteHospital
        handleClose={() => setAction(undefined)}
        hospital={hospital}
        open={action === "delete"}
      />
      <div className="flex justify-end">
        {TableFocusTypeBtn<THospital>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={selectedColumns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
