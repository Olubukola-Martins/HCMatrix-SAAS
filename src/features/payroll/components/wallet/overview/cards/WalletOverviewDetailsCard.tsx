import { Skeleton } from "antd";
import React from "react";
import { IDivProps } from "types/html";
import { WalletTopUpBtn } from "../../topup/WalletTopUp";

type IProps = Pick<IDivProps, "className"> & {
  isLoading?: boolean;
  data?: { accountNo: string; bankName: string }[];
  showActions?: boolean;
};
const WalletOverviewDetailsCard: React.FC<IProps> = ({
  data,
  isLoading,
  className = "border rounded-md p-4 shadow-sm bg-card hover:shadow-md",
  showActions = false,
}) => {
  return (
    <div className={className}>
      <Skeleton loading={isLoading} paragraph={{ rows: 3 }}>
        <>
          <div className="flex flex-col py-3 items-start">
            <p className="text-base font-semibold mb-2 capitalize">{`Wallet Details`}</p>
            {data?.map(({ accountNo, bankName }, i, accounts) => (
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
              </div>
            ))}

            {showActions ? (
              <div className="flex flex-col items-center w-full mt-4">
                <WalletTopUpBtn
                  buttonProps={{
                    label: "Top Up",
                    variant: "transparent",
                  }}
                />
              </div>
            ) : null}
          </div>
        </>
      </Skeleton>
    </div>
  );
};

export default WalletOverviewDetailsCard;
