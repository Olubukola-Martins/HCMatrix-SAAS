import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import {
  TVehicleBooking,
  useFetchVehicleBookings,
} from "../../hooks/useFetchVehicleBookings";
import { useApiAuth } from "hooks/useApiAuth";
import { usePagination } from "hooks/usePagination";
import { AddVehicleBooking } from "../AddVehicleBooking";
import { ViewVehicleBooking } from "../ViewVehicleBooking";
import { SelectEmployee } from "features/core/employees/components/SelectEmployee";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";
import {
  ALL_VEHICLE_BOOKINGS_TABLE_COLUMNS,
  TAllVehicleBookingAction,
} from "../columns/all-vehicle-booking";
import { TableFocusTypeBtn } from "components/table";
import { stringIsIncludedInArray } from "utils/dataHelpers/stringIsIncludedInArray";
import ExportAllVehicleBookings from "../export/ExportAllVehicleBookings";

export const AllVehicleBookingHistory: React.FC<{
  title?: string;
}> = ({ title }) => {
  const { token, companyId } = useApiAuth();
  const { pagination, onChange } = usePagination();
  const [employeeId, setEmployeeId] = useState<number>();

  const { data, isFetching } = useFetchVehicleBookings({
    token,
    companyId,
    pagination,
    employeeId,
  });
  const [showM, setShowM] = useState<TAllVehicleBookingAction>();
  const [request, setRequest] = useState<TVehicleBooking>();
  const handleAction = (
    action: TAllVehicleBookingAction,
    item?: TVehicleBooking
  ) => {
    setShowM(action);
    setRequest(item);
  };
  const columns: ColumnsType<TVehicleBooking> =
    ALL_VEHICLE_BOOKINGS_TABLE_COLUMNS(handleAction);
  const [selectedColumns, setSelectedColumns] = useState<
    ColumnsType<TVehicleBooking>
  >(
    columns.filter(
      (col) => !stringIsIncludedInArray(col?.key?.toString()!, ["Destination"])
    )
  );
  return (
    <>
      <AddVehicleBooking
        open={showM === "add"}
        handleClose={() => setShowM(undefined)}
      />
      {request && (
        <ViewVehicleBooking
          open={showM === "view"}
          handleClose={() => setShowM(undefined)}
          bookingId={request.id}
        />
      )}
      {request && (
        <ViewApprovalStages
          handleClose={() => setShowM(undefined)}
          open={showM === "view-approval-stages"}
          id={request?.id}
          type="vehicle"
        />
      )}
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-light">{title}</h4>
        <div className="flex items-center gap-3 justify-between">
          <div>
            <SelectEmployee
              handleSelect={(val) => setEmployeeId(val)}
              handleClear={() => setEmployeeId(undefined)}
            />
          </div>
          <div className="my-5 flex justify-end gap-3">
            <ExportAllVehicleBookings
              trigger={<i className="ri-download-2-line text-lg" />}
            />

            <AppButton
              label="Book Vehicle"
              handleClick={() => setShowM("add")}
            />
            <div className="flex justify-end">
              {TableFocusTypeBtn<TVehicleBooking>({
                selectedColumns,
                setSelectedColumns,
                data: {
                  columns,
                },
              })}
            </div>
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
    </>
  );
};
