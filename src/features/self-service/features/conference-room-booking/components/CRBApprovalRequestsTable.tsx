import { Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import {
  QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS,
  TCRBookingStatus,
} from "../hooks/useFetchAllConferenceRoomBookings";
import CRBBookingDetails from "./CRBBookingDetails";
import { usePagination } from "hooks/usePagination";
import { useQueryClient } from "react-query";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { CRB_APPROVAL_REQUESTS_TABLE_COLUMNS } from "./columns/crb-approval-requests";
import { TableFocusTypeBtn } from "components/table";

const CRBApprovalRequestsTable: React.FC<{
  status?: TCRBookingStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const queryClient = useQueryClient();

  const [showD, setShowD] = useState(false);
  const [request, setRequest] = useState<TApprovalRequest>();

  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "conference-room",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS],
        // exact: true,
      });
    },
  });

  const columns: ColumnsType<TApprovalRequest> =
    CRB_APPROVAL_REQUESTS_TABLE_COLUMNS(
      confirmApprovalAction,
      setRequest,
      setShowD
    );

  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TApprovalRequest>>(columns);
  return (
    <div className="space-y-6">
      {request?.conferenceRoomBooking && (
        <CRBBookingDetails
          id={request.conferenceRoomBooking?.id}
          open={showD}
          handleClose={() => setShowD(false)}
          approvalRequest={request}
        />
      )}
      <div className="flex justify-end">
        {TableFocusTypeBtn<TApprovalRequest>({
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

export default CRBApprovalRequestsTable;
