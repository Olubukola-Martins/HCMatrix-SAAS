import { Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import { HighLightItemList } from "components/highlight/HighLightItemList";
import React from "react";

interface IData {
  totalTransactions: number;
  balance: number;
  lastFundedAmount: number;
  createdAt: string;
  updatedAt: string;
  totalDebit: number;
  totalCredit: number;
}

interface IProps {
  data?: Partial<IData>;
  isLoading?: boolean;
  handleUpdate: () => void;
  handleFund: () => void;
  handleDelete: () => void;
}

export const CostCentreOverview: React.FC<IProps> = ({
  data,
  isLoading,
  handleUpdate,
  handleDelete,
  handleFund,
}) => {
  const {
    totalTransactions = "0",
    balance = "0",
    lastFundedAmount = "0",
    createdAt = "",
    updatedAt = "",
    totalDebit = "0",
    totalCredit = "0",
  } = data as unknown as IData;

  return (
    <>
      <div className="bg-card shadow-sm rounded-md p-4">
        <div className="bg-mainBg shadow-md rounded-md p-4 flex gap-3 justify-between">
          <Skeleton loading={isLoading} active paragraph={{ rows: 4 }}>
            <>
              <div className="flex gap-3 items-center md:flex-row flex-col">
                <div className="flex flex-col gap-3 text-accent mt-4">
                  <HighLightItemList
                    items={[
                      { name: "Last Funded Amount", value: lastFundedAmount },
                      { name: "Total Transactions", value: totalTransactions },
                      { name: "Balance", value: balance },
                    ]}
                  />
                  <HighLightItemList
                    items={[
                      { name: "Total Debit", value: totalDebit },
                      { name: "Total Credit", value: totalCredit },
                    ]}
                  />
                  <HighLightItemList
                    items={[
                      { name: "Created At", value: createdAt },
                      { name: "Last Modified", value: updatedAt },
                    ]}
                  />
                </div>
              </div>
              <div className="flex gap-3 text-xl">
                <div>
                  <AppButton label="Fund" handleClick={handleFund} />
                </div>
                <i
                  title="Edit Cost Centre"
                  className="ri-pencil-line cursor-pointer hover:text-caramel"
                  onClick={() => handleUpdate()}
                ></i>
                <i
                  title="Delete Cost Centre"
                  className="ri-delete-bin-line cursor-pointer hover:text-caramel"
                  onClick={() => handleDelete()}
                ></i>
              </div>
            </>
          </Skeleton>
        </div>
      </div>
    </>
  );
};
