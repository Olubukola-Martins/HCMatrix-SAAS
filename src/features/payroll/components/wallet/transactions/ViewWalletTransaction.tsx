import { ConfigProvider, Modal } from "antd";
import { TWalletTransaction } from "features/payroll/types/payrollWallet";
import moment from "moment";
import React from "react";
import { IModalProps } from "types";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import { truncateString } from "utils/dataHelpers/truncateString";

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
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "#F6F7FB",
        },
      }}
    >
      <Modal
        open={open}
        onCancel={() => handleClose()}
        footer={null}
        title={<div className="bg-[#F6F7FB]">Transaction Details</div>}
        style={{ top: 20 }}
      >
        <div className="bg-mainBg border rounded-lg text-sm shadow py-4 px-3 flex flex-col gap-3 mt-6">
          <div className="space-y-3 text-center">
            <p className="font-semibold text-lg capitalize">
              {transaction.type === "credit" ? "+" : "-"}
              {formatNumberWithCommas(transaction.amount)}
            </p>
            <span>
              {moment(transaction.createdAt).format("DD/MM/YY, hh:mm A")}
            </span>
          </div>
          {[
            {
              label: "Sender",
              accName: transaction.sender.accountName,
              bankName: transaction.sender.bankName,
              accNo: transaction.sender.accountNumber,
            },
            {
              label: "Beneficiary",
              accName: transaction.beneficiary.accountName,
              bankName: transaction.beneficiary.bankName,
              accNo: transaction.beneficiary.accountNumber,
            },
          ].map(({ label, accName, accNo, bankName }, i) => (
            <div
              className={`flex items-center justify-between cursor-pointer pb-2 `}
              key={i}
            >
              <span className="text-sm capitalize">{label}</span>
              <div className="text-right">
                <h5 className="font-semibold text-lg">{accName}</h5>
                <p className="capitalize">
                  {accNo} - {bankName || truncateString(accName, 12)}
                </p>
              </div>
            </div>
          ))}
          <div
            className={`flex items-center justify-between cursor-pointer pb-2 `}
          >
            <span className="text-sm capitalize">{`Session ID`}</span>
            <div className="text-right">
              <h5 className="font-semibold">{transaction.reference}</h5>
            </div>
          </div>
          <div
            className={`flex items-center justify-between cursor-pointer pb-2 `}
          >
            <span className="text-sm capitalize">{`Narration`}</span>
            <div className="text-right">
              <h5 className="font-medium">
                {truncateString(transaction.narration || "", 20)}
              </h5>
            </div>
          </div>
          <div
            className={`flex items-center justify-between cursor-pointer pb-2 `}
          >
            <span className="text-sm capitalize">{`Total`}</span>
            <h5 className="font-medium">
              {formatNumberWithCommas(transaction.amount)}
            </h5>
          </div>

          <div className="space-y-3 text-center">
            <span>Transaction Status</span>
            <p
              className="font-semibold text-lg capitalize"
              style={{
                color: transaction.status === "completed" ? "green" : "red",
              }}
            >
              {transaction.status}
            </p>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};
