import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { TVehicleBooking } from "../../hooks/useFetchVehicleBookings";
import { usePagination } from "hooks/usePagination";
import { AddVehicleBooking } from "../AddVehicleBooking";
import { ViewVehicleBooking } from "../ViewVehicleBooking";
import { useGetVehicleBookings4AuthEmployee } from "../../hooks/booking/useGetVehicleBookings4AuthEmployee";
import { CancelVehicleBooking } from "./CancelVehicleBooking";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";
import {
  EMPLOYEE_VEHICLE_BOOKINGS_TABLE_COLUMNS,
  TEmployeeVehicleBookingAction,
} from "../columns/employee-vehicle-booking";
import { TableFocusTypeBtn } from "components/table";
import { stringIsIncludedInArray } from "utils/dataHelpers/stringIsIncludedInArray";
import ExportAuthVehicleBookings from "../export/ExportAuthVehicleBookings";

export const EmployeeVehicleBookingHistory: React.FC<{
  title?: string;
}> = ({ title }) => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetVehicleBookings4AuthEmployee({
    pagination,
  });
  const [showM, setShowM] = useState<TEmployeeVehicleBookingAction>();
  const [booking, setBooking] = useState<TVehicleBooking>();
  const handleAction = (
    action: TEmployeeVehicleBookingAction,
    item?: TVehicleBooking
  ) => {
    setBooking(item);
    setShowM(action);
  };
  const columns: ColumnsType<TVehicleBooking> =
    EMPLOYEE_VEHICLE_BOOKINGS_TABLE_COLUMNS(handleAction);
  const [selectedColumns, setSelectedColumns] = useState<
    ColumnsType<TVehicleBooking>
  >(
    columns.filter(
      (col) =>
        !stringIsIncludedInArray(col?.key?.toString()!, [
          "Employee",
          "Plate No",
          "Vehicle Type",
        ])
    )
  );
  const onClose = () => {
    setShowM(undefined);
    setBooking(undefined);
  };
  return (
    <>
      <AddVehicleBooking open={showM === "add"} handleClose={onClose} />
      <CancelVehicleBooking
        open={showM === "cancel"}
        data={booking}
        handleClose={onClose}
      />
      {booking && (
        <ViewVehicleBooking
          open={showM === "view"}
          handleClose={onClose}
          bookingId={booking.id}
        />
      )}
      {booking && (
        <ViewApprovalStages
          handleClose={onClose}
          open={showM === "view-approval-stages"}
          id={booking?.id}
          type="vehicle"
        />
      )}
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-light">{title}</h4>
        <div className="flex items-center gap-3 justify-between">
          <ExportAuthVehicleBookings
            trigger={<i className="ri-download-2-line text-lg" />}
          />
          <div className="my-5 flex justify-end gap-3">
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
