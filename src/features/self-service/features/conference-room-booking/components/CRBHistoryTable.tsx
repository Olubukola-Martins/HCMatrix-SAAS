import { Select } from "antd";

import CRBBookingsList from "./CRBBookingsList";

const CRBHistoryTable = () => {
  return (
    <div>
      <p className="text-lg mb-4">Booking History</p>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Select size="middle" className="w-32" placeholder="Filter">
            <Select.Option value="2020" key="2020">
              2020
            </Select.Option>
          </Select>
          <div className="flex items-center gap-4">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>
          </div>
        </div>
        <CRBBookingsList />
      </div>
    </div>
  );
};

export default CRBHistoryTable;
