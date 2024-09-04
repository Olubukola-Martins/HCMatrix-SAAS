import { Modal } from "antd";
import { TWalletTransaction } from "features/payroll/types/payrollWallet";
import React from "react";
import { IModalProps } from "types";

interface IProps extends IModalProps {
  transaction?: TWalletTransaction;
}

export const ViewWalletTransaction: React.FC<IProps> = ({
  open,
  handleClose,
  transaction,
}) => {
  if (!transaction) return null;

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Transaction Details"}
      style={{ top: 20 }}
    >
      <div className="bg-mainBg border rounded-lg text-sm shadow py-4 px-3 flex flex-col gap-3">
        {[{ label: "Account Name", value: "James" }].map(
          ({ label, value }, i) => (
            <div
              className={`flex items-center justify-between cursor-pointer pb-2 `}
              key={i}
            >
              <span className="text-sm capitalize">{label}</span>
              <h5 className="font-medium">{value}</h5>
            </div>
          )
        )}
        <div
          className={`flex items-center justify-between cursor-pointer pb-2 `}
        >
          <span className="text-sm capitalize">{`Total`}</span>
          <h5 className="font-medium">{transaction.amount}</h5>
        </div>

        <div className="space-y-4 text-center">
          <span>Transaction Status</span>
          <p className="font-semibold text-lg">{transaction.status}</p>
        </div>
      </div>
    </Modal>
  );
};
