import { Modal, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import { IDivProps } from "types/html";
import { ViewOtherPaymentOptions } from "./ViewOtherPaymentOptions";

type IProps = IModalProps &
  Pick<IDivProps, "className"> & {
    isLoading?: boolean;
    data?: { accountNo: string; bankName: string; channel: string }[];
  };
export const WalletTopUpModal: React.FC<IProps> = ({
  handleClose,
  open,
  className = "border rounded-md p-3 shadow-sm bg-card hover:shadow-md border-caramel",
  isLoading,
  data,
}) => {
  const [action, setAction] = useState<"view-other-payment-options">();
  const handleOtherPaymentOptions = () => {
    handleClose();
    setAction("view-other-payment-options");
  };
  return (
    <>
      <ViewOtherPaymentOptions
        handleClose={() => setAction(undefined)}
        open={action === "view-other-payment-options"}
      />
      <Modal open={open} onCancel={() => handleClose()}>
        <div className={className}>
          <Skeleton loading={isLoading} paragraph={{ rows: 3 }}>
            <>
              <div>
                <h3 className="text-lg font-semibold">Payment Method</h3>
                <span>For Bank Transfer, kindly use: </span>
              </div>
              <div className="flex flex-col py-3 items-start">
                <p className="text-sm font-medium mb-4  capitalize">{`Wallet Details`}</p>
                {data?.map(({ accountNo, bankName, channel }, i, accounts) => (
                  <div
                    key={i}
                    className={`flex flex-col cursor-pointer ${
                      accounts.length === i + 1 ? "" : "border-b"
                    } pb-2 px-3`}
                  >
                    <p className="font-medium">
                      Account Number:
                      <span className="text-sm font-normal capitalize">
                        {accountNo}
                      </span>
                    </p>
                    <p className="font-medium">
                      Bank Name:
                      <span className="text-sm font-normal capitalize">
                        {bankName}
                      </span>
                    </p>
                    <p className="font-medium">
                      Channel:
                      <span className="text-sm font-normal capitalize">
                        {channel}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-y-3">
                <AppButton
                  label="View Other payment Options"
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
export const WalletTopUpBtn: React.FC = () => {
  const [open, setOpen] = useState(false);
  //   TODO: Fetch data n populate in modal
  return (
    <>
      <WalletTopUpModal open={open} handleClose={() => setOpen(false)} />
      <AppButton label="Top Up" />
    </>
  );
};
