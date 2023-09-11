import { Dropdown, Skeleton } from "antd";
import { HighLightItemList } from "components/highlight/HighLightItemList";
import React, { useState } from "react";

interface IData {
  totalTransactions: string;
  balance: string;
  lastFundedAmount: string;
  createdAt: string;
  updatedAt: string;
  totalDebit: string;
  totalCredit: string;
}

interface IProps {
  data?: Partial<IData>;
  isLoading?: boolean;
  handleUpdate: () => void;
  handleDelete: () => void;
}

export const CostCentreOverview: React.FC<IProps> = ({
  data,
  isLoading,
  handleUpdate,
  handleDelete,
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
                <i
                  title="Edit Project"
                  className="ri-pencil-line cursor-pointer hover:text-caramel"
                  onClick={() => handleUpdate()}
                ></i>
                <i
                  title="Delete Project"
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
