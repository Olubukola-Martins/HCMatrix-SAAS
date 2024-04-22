import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Table } from "antd";
import { useGetConferenceRoomBookings4AuthEmployee } from "../../hooks/useGetConferenceRoomBookings4AuthEmployee";
import { TSingleConferenceRoomBooking } from "../../types";
import CRBBookingDetails from "../CRBBookingDetails";
import { CancelCRBBooking } from "./CancelCRBBooking";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";
import { EMPLOYEE_CRB_BOOKINGS_TABLE_COLUMNS } from "../columns/employee-crb-bookings";
import { TableFocusTypeBtn } from "components/table";

export type TEmployeeCRBBookingAction =
  | "cancel"
  | "view"
  | "view-approval-stages";
export const EmployeeCRBBookingsTable: React.FC<{
  status?: TApprovalStatus[] | TApprovalStatus;
}> = ({ status }) => {
  const [request, setRequest] = useState<TSingleConferenceRoomBooking>();
  const [action, setAction] = useState<TEmployeeCRBBookingAction>();
  const handleAction = (
    key: TEmployeeCRBBookingAction,
    item?: TSingleConferenceRoomBooking
  ) => {
    setAction(key);
    setRequest(item);
  };
  const onClose = () => {
    setAction(undefined);
    setRequest(undefined);
  };

  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetConferenceRoomBookings4AuthEmployee({
    status,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: ColumnsType<TSingleConferenceRoomBooking> =
    EMPLOYEE_CRB_BOOKINGS_TABLE_COLUMNS(handleAction);
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TSingleConferenceRoomBooking>>(columns);
  return (
    <div className="space-y-6">
      {request && (
        <CRBBookingDetails
          id={request.id}
          open={action === "view"}
          handleClose={onClose}
        />
      )}
      {request && (
        <ViewApprovalStages
          handleClose={onClose}
          open={action === "view-approval-stages"}
          id={request?.id}
          type="conference-room"
        />
      )}
      <CancelCRBBooking
        open={action === "cancel"}
        handleClose={onClose}
        data={request}
      />
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
