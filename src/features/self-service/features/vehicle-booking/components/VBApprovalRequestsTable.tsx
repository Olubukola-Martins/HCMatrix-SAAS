import { Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { usePagination } from "hooks/usePagination";
import { useQueryClient } from "react-query";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { ViewVehicleBooking } from "./ViewVehicleBooking";
import { TApprovalStatus } from "types/statuses";
import { QUERY_KEY_FOR_VEHICLE_BOOKINGS } from "../hooks/useFetchVehicleBookings";
import { QUERY_KEY_FOR_VEHICLE_BOOKINGS_FOR_AUTH_EMPLOYEE } from "../hooks/booking/useGetVehicleBookings4AuthEmployee";
import { QUERY_KEY_FOR_VEHICLE_BOOKING_ANALYTICS_FOR_EMPLOYEE } from "../hooks/useGetVehicleEmployeeBookingAnalytics";
import { VEHICLE_BOOKING_APPROVAL_REQUEST_TABLE_COLUMNS } from "./columns/vb-approval-requests";
import { TableFocusTypeBtn } from "components/table";

const VBApprovalRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const queryClient = useQueryClient();

  const [showD, setShowD] = useState(false);
  const [request, setRequest] = useState<TApprovalRequest>();

  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "vehicle",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_VEHICLE_BOOKINGS],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_VEHICLE_BOOKINGS_FOR_AUTH_EMPLOYEE],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_VEHICLE_BOOKING_ANALYTICS_FOR_EMPLOYEE],
        // exact: true,
      });
    },
  });

  const columns: ColumnsType<TApprovalRequest> =
    VEHICLE_BOOKING_APPROVAL_REQUEST_TABLE_COLUMNS(
      confirmApprovalAction,
      setRequest,
      setShowD
    );
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TApprovalRequest>>(columns);
  return (
    <div className="space-y-6">
      {request?.vehicleBooking && (
        <ViewVehicleBooking
          bookingId={request.vehicleBooking.id}
          handleClose={() => setShowD(false)}
          open={showD}
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

export default VBApprovalRequestsTable;
