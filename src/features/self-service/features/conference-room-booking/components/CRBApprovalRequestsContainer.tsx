import { Select } from "antd";

import { CR_BOOKING_STATUS_OPTIONS } from "../constants";
import { useState } from "react";
import { TCRBookingStatus } from "../hooks/useFetchAllConferenceRoomBookings";
import CRBApprovalRequestsTable from "./CRBApprovalRequestsTable";

export const CRBApprovalRequestsContainer = () => {
  const [status, setStatus] = useState<TCRBookingStatus>();
  return (
    <div>
      <p className="text-lg mb-4">Booking Request Approvals</p>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Select
            allowClear
            onClear={() => setStatus(undefined)}
            value={status}
            size="middle"
            className="w-32"
            placeholder="Filter"
            onSelect={(val: TCRBookingStatus) => setStatus(val)}
            options={CR_BOOKING_STATUS_OPTIONS}
          />
          <div className="flex items-center gap-4">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>
          </div>
        </div>
        <CRBApprovalRequestsTable status={status} />
      </div>
    </div>
  );
};
