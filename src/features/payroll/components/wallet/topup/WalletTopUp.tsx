import { Modal, Skeleton } from "antd";
import { AppButton, IAppBtnProps } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import { IDivProps } from "types/html";
import { ViewOtherPaymentOptions } from "./ViewOtherPaymentOptions";
import { useRetrievePayrollWallets } from "features/payroll/hooks/wallet/useRetrievePayrollWallets";
import { TPayrollWallet } from "features/payroll/types/wallet";

type IProps = IModalProps &
  Pick<IDivProps, "className"> & {
    isLoading?: boolean;
    data?: { accountNo: string; bankName: string; channel: string }[];
  };
export const WalletTopUpModal: React.FC<IProps> = ({
  handleClose,
  open,
  className = "p-3",
  isLoading,
  data,
}) => {
  const [action, setAction] = useState<"view-other-payment-options">();
  const handleOtherPaymentOptions = () => {
    handleClose();
  };
  return (
    <>
      <ViewOtherPaymentOptions
        handleClose={() => setAction(undefined)}
        open={action === "view-other-payment-options"}
      />
      <Modal
        open={open}
        onCancel={() => handleClose()}
        footer={null}
        title={null}
      >
        <div className={className}>
          <Skeleton loading={isLoading} paragraph={{ rows: 3 }}>
            <>
              <div>
                <h3 className="text-xl font-bold rounded-none">
                  Payment Method
                </h3>
                <span>For Bank Transfer, kindly use: </span>
              </div>
              <div className="flex flex-col py-3 items-start">
                {data?.map(({ accountNo, bankName, channel }, i, accounts) => (
                  <div
                    key={i}
                    className={`flex flex-col w-full cursor-pointer ${
                      accounts.length === i + 1 ? "" : "border-b-2"
                    } py-4 px-3`}
                  >
                    <p className="font-normal">
                      Account Number:
                      <span className="text-sm ml-1 font-semibold capitalize">
                        {accountNo}
                      </span>
                    </p>
                    <p className="font-normal">
                      Bank Name:
                      <span className="text-sm ml-1 font-semibold capitalize">
                        {bankName}
                      </span>
                    </p>
                    <p className="font-normal">
                      Channel:
                      <span className="text-sm ml-1 font-semibold capitalize">
                        {channel}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-y-3">
                <AppButton
                  label="Close payment Options"
                  handleClick={handleOtherPaymentOptions}
                  variant="transparent"
                />
              </div>
            </>
          </Skeleton>
        </div>
      </Modal>
    </>
  );
};
export const WalletTopUpBtn: React.FC<{
  buttonProps?: Omit<IAppBtnProps, "handleClick">;
  data?:TPayrollWallet[];
  isLoading?:boolean;
}> = ({ buttonProps = { label: "Top Up" }, isLoading, data }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WalletTopUpModal
        open={open}
        isLoading={isLoading}
        handleClose={() => setOpen(false)}
        data={data?.map(({accountNumber, bankName, provider}) => ({
          accountNo: accountNumber,
          bankName,
          channel: provider,
        }))}
      />
      <AppButton {...buttonProps} handleClick={() => setOpen(true)} />
    </>
  );
};
