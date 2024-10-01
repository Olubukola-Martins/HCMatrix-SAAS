import { Modal } from "antd";
import { TPayrollWalletDashboardAnalytics } from "features/payroll/types/wallet";
import React from "react";
import { IModalProps } from "types";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

const WalletBalanceOverviewDetails: React.FC<
  IModalProps & { data?: TPayrollWalletDashboardAnalytics["balance"] }
> = ({ open, handleClose, data }) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={<span className="text-lg">{`Wallet Balance Overview`}</span>}
      style={{ top: 120 }}
    >
      <p className="mt-2">
        The breakdown reflects your current wallet balance.
      </p>
      <table className="w-full text-center mt-6">
        <thead>
          <tr>
            <th className="text-left">Wallet</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data ?? {}).map(([key, value], i) => (
            <tr key={i}>
              <td className="p-1 capitalize text-left">{key}</td>
              <td>{formatNumberWithCommas(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
};

export default WalletBalanceOverviewDetails;
