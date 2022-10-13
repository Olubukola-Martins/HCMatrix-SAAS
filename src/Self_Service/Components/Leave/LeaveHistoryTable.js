import { Select } from "@mui/material";
import React from "react";

const LeaveHistoryTable = () => {
  return (
    <div>
      <h4 className="text-lg mb-4">Leave History</h4>
      <div className="flex justify-between items-center">
        <Select size="small" className="w-32">
          <Select.Option value="2020" key="2020">
            2020
          </Select.Option>
        </Select>
      </div>
    </div>
  );
};

export default LeaveHistoryTable;
