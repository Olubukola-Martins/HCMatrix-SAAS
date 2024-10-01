import { Modal } from "antd";
import React from "react";
import { IModalProps } from "types";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import { TLeaveAnalytics } from "../types";

const LeaveBalanceOverviewDetails: React.FC<
  IModalProps & { data?: TLeaveAnalytics["leaveBankBreakdown"] }
> = ({ open, handleClose, data }) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={<span className="text-lg">{`Leave Balance Breakdown`}</span>}
      style={{ top: 120 }}
    >
      <p className="mt-2">The breakdown reflects your current leave balance.</p>
      <table className="w-full text-center mt-6">
        <thead>
          <tr>
            <th className="text-left">Leave Type</th>
            <th>Number of days remaining</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ name, balance }, i) => (
            <tr key={i}>
              <td className="p-1 capitalize text-left">{name}</td>
              <td>{formatNumberWithCommas(balance, 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
};

export default LeaveBalanceOverviewDetails;
