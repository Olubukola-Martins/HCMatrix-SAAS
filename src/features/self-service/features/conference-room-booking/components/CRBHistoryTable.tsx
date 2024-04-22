import { Table } from "antd";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import {
  TCRBookingStatus,
  useFetchAllConferenceRoomBookings,
} from "../hooks/useFetchAllConferenceRoomBookings";
import { TSingleConferenceRoomBooking } from "../types";
import CRBBookingDetails from "./CRBBookingDetails";
import { usePagination } from "hooks/usePagination";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";
import { ALL_CRB_BOOKINGS_TABLE_COLUMNS } from "./columns/all-crb-bookings";
import { TableFocusTypeBtn } from "components/table";

export type TCRBHistoryAction =
  | "add"
  | "view"
  | "cancel"
  | "view-approval-stages";

const CRBHistoryTable: React.FC<{
  status?: TCRBookingStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [showM, setShowM] = useState<TCRBHistoryAction>();
  const [booking, setBooking] = useState<TSingleConferenceRoomBooking>();
  const handleAction = (
    action: TCRBHistoryAction,
    item?: TSingleConferenceRoomBooking
  ) => {
    setBooking(item);
    setShowM(action);
  };
  const onClose = () => {
    setShowM(undefined);
    setBooking(undefined);
  };
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useFetchAllConferenceRoomBookings({
    pagination,
    status,
    employeeId,
  });

  const columns: ColumnsType<TSingleConferenceRoomBooking> =
    ALL_CRB_BOOKINGS_TABLE_COLUMNS(handleAction);
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TSingleConferenceRoomBooking>>(columns);
  return (
    <div className="space-y-6">
      {booking && (
        <CRBBookingDetails
          id={booking.id}
          open={showM === "view"}
          handleClose={onClose}
        />
      )}
      {booking && (
        <ViewApprovalStages
          handleClose={onClose}
          open={showM === "view-approval-stages"}
          id={booking?.id}
          type="conference-room"
        />
      )}

      <div className="flex justify-end">
        {TableFocusTypeBtn<TSingleConferenceRoomBooking>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
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

export default CRBHistoryTable;
