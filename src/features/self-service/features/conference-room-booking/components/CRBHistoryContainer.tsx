import { Select } from "antd";

import { useApiAuth } from "hooks/useApiAuth";
import { useState } from "react";
import { TCRBookingStatus } from "../hooks/useFetchAllConferenceRoomBookings";
import { CR_BOOKING_STATUS_OPTIONS } from "../constants";
import CRBHistoryTable from "./CRBHistoryTable";

const CRBHistoryContainer = () => {
  const { currentUserEmployeeId } = useApiAuth();
  const [status, setStatus] = useState<TCRBookingStatus>();

  return (
    <div>
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
        <CRBHistoryTable employeeId={currentUserEmployeeId} status={status} />
      </div>
    </div>
  );
};

export default CRBHistoryContainer;
