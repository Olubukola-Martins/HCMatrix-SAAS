import { ConfigProvider, Modal } from "antd";
import { HELPFUL_COLORS } from "constants/color";
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
        title={
          <div className="bg-[#F6F7FB] text-xl font-bold">
            Transaction Details
          </div>
        }
        width={`52%`}
        style={{ top: 20 }}
      >
        <div className="bg-mainBg border rounded-lg text-sm shadow py-4 px-4 flex flex-col gap-y-6 mt-6 ">
          <div className="space-y-3 text-center">
            <p className="font-bold text-xl capitalize">
              {transaction.type === "credit" ? "+" : "-"}
              {` `}₦{formatNumberWithCommas(transaction.amount)}
            </p>
            <p className="text-sm">
              {moment(transaction.createdAt).format("DD/MM/YY, hh:mm A")}
            </p>
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
              className={`flex items-center justify-between cursor-pointer`}
              key={i}
            >
              <span className="text-lg capitalize">{label}</span>
              <div className="text-right">
                <h5 className="font-bold text-xl">{accName}</h5>
                <p className="capitalize">
                  {accNo} - {bankName || truncateString(accName, 12)}
                </p>
              </div>
            </div>
          ))}
          <div
            className={`flex items-center justify-between cursor-pointer pb-2 `}
          >
            <span className="text-lg capitalize">{`Session ID`}</span>
            <div className="text-right">
              <h5 className="font-bold">{transaction.reference}</h5>
            </div>
          </div>
          <div
            className={`flex items-center justify-between cursor-pointer pb-2 `}
          >
            <span className="text-lg capitalize">{`Narration`}</span>
            <div className="text-right text-lg">
              <h5 className="">
                {truncateString(transaction.narration || "", 20)}
              </h5>
            </div>
          </div>

          <div className="space-y-1 text-center">
            <p className="">Transaction Status</p>
            <p
              className="font-bold text-2xl capitalize"
              style={{
                color:
                  transaction.status === "completed"
                    ? HELPFUL_COLORS.completed
                    : HELPFUL_COLORS.rejected,
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
