import {  Table } from "antd";
import { SelectVehicleStatus } from "./SelectVehicleStatus";
import { SelectVehicleType } from "./SelectVehicleType";
import { useState } from "react";
import { TVehicle, useFetchVehicles } from "../hooks/useFetchVehicles";
import { useApiAuth } from "hooks/useApiAuth";
import { ColumnsType } from "antd/lib/table";
import { TVehicleStatus, TVehicleType } from "../hooks/useCreateVehicle";
import { usePagination } from "hooks/usePagination";
import { TableFocusTypeBtn } from "components/table";
import { VEHICLES_TABLE_COLUMNS } from "./columns/vehicle";

const VehicleList = () => {
  const { token, companyId } = useApiAuth();
  const [status, setStatus] = useState<TVehicleStatus>();
  const [type, setType] = useState<TVehicleType>();

  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useFetchVehicles({
    token,
    companyId,
    pagination,
    searchParams: {
      name: type,
    },
    status,
  });

  const columns: ColumnsType<TVehicle> = VEHICLES_TABLE_COLUMNS();
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TVehicle>>(columns);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center gap-3">
        {/* filter inputs */}
        <div className="flex items-center gap-3">
          <SelectVehicleType
            onSelect={(val) => setType(val)}
            onClear={() => setType(undefined)}
          />
          <SelectVehicleStatus
            onSelect={(val) => setStatus(val)}
            onClear={() => setStatus(undefined)}
          />
        </div>
        <div className="flex justify-end">
        {TableFocusTypeBtn<TVehicle>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      </div>
      <Table
        columns={selectedColumns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default VehicleList;
