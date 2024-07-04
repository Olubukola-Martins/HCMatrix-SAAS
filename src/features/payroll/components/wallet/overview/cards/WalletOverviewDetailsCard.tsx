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
  className = "border rounded-md p-3 shadow-sm bg-card hover:shadow-md border-caramel",
  showActions = false,
}) => {
  return (
    <div className={className}>
      <Skeleton loading={isLoading} paragraph={{ rows: 3 }}>
        <>
          <div className="flex flex-col py-3 items-start">
            <p className="text-sm font-medium mb-4  capitalize">{`Wallet Details`}</p>
            {data?.map(({ accountNo, bankName }, i, accounts) => (
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
              </div>
            ))}

            {showActions ? (
              <div className="flex flex-col items-center gap-y-3">
                <WalletTopUpBtn />
              </div>
            ) : null}
          </div>
        </>
      </Skeleton>
    </div>
  );
};

export default WalletOverviewDetailsCard;
