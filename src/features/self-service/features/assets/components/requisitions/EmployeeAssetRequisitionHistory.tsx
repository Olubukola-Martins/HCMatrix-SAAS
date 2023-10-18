import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { TAssetRequisition } from "features/self-service/features/requisitions/types/asset";
import { AddVehicleBooking } from "features/self-service/features/vehicle-booking/components/AddVehicleBooking";
import { ViewVehicleBooking } from "features/self-service/features/vehicle-booking/components/ViewVehicleBooking";
import moment from "moment";
import React, { useState } from "react";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useGetAssetRequisitions4AuthEmployee } from "../../hooks/requisitions/useGetAssetRequisitions4AuthEmployee";
import { usePagination } from "hooks/usePagination";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import { TApprovalStatus } from "types/statuses";
import { NewAssetRequest } from "../NewAssetRequest";

export const EmployeeAssetRequisitionHistory: React.FC<{
  title?: string;
}> = ({ title }) => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetAssetRequisitions4AuthEmployee({
    pagination,
  });
  const [status, setStatus] = useState<TApprovalStatus>();
  const [showM, setShowM] = useState(false);
  const columns: ColumnsType<TAssetRequisition> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.date).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },

    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
      render: (_, item) => (
        <span className="capitalize">{item.asset.name} </span>
      ),
    },

    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      render: (_, item) => (
        <span className="capitalize">{item.description} </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span style={{ color: getAppropriateColorForStatus(item.status) }}>
          {item.status}{" "}
        </span>
      ),
    },
  ];

  return (
    <>
      <NewAssetRequest open={showM} handleClose={() => setShowM(false)} />

      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-light">{title}</h4>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="">
              <SelectApprovalStatus
                value={status}
                onSelect={(id) => {
                  setStatus(id);
                }}
                onClear={() => {
                  setStatus(undefined);
                }}
              />
            </div>
          </div>
          <AppButton
            {...{
              label: "New Asset Request",
              handleClick: () => setShowM(true),
            }}
          />
        </div>
        <Table
          columns={columns}
          size="small"
          dataSource={data?.data}
          loading={isFetching}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
