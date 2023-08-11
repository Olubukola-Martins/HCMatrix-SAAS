import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { AddCostCentre } from "./AddCostCentre";
import { Empty, Pagination, Skeleton } from "antd";
import { usePagination } from "hooks/usePagination";
import { useGetCostCentres } from "features/payroll/hooks/costCentres/useGetCostCentres";
import { TCostCentre } from "features/payroll/types";
import moment from "moment";
import { FundCostCentre } from "./FundCostCentre";
import { DeleteCostCentre } from "./DeleteCostCentre";
import { AppButton } from "components/button/AppButton";

export const CostCentreContainer = () => {
  const [showD, setShowD] = useState(false);
  return (
    <>
      <AddCostCentre open={showD} handleClose={() => setShowD(false)} />
      <div className="flex flex-col gap-8">
        <PageSubHeader
          description={`You can now create/edit cost centres`}
          actions={[
            {
              name: "Add Cost Centre",
              handleClick: () => setShowD(true),
            },
          ]}
        />
        <CostCentreCardList />
      </div>
    </>
  );
};

const CostCentreCardList = () => {
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetCostCentres({
    pagination,
  });
  return (
    <div>
      <Skeleton loading={isFetching} paragraph={{ rows: 8 }}>
        {data?.data && data?.data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10 gap-y-10">
            {data?.data.map((item) => (
              <CostCentreCard key={item.id} data={item} />
            ))}
          </div>
        )}
        {data?.data && data?.data.length === 0 && (
          <Empty description="No Cost Centres" />
        )}
      </Skeleton>
      <div className="mt-4 flex justify-end">
        <Pagination
          {...{ ...pagination, total: data?.total }}
          onChange={onChange}
          size="small"
        />
      </div>
    </div>
  );
};

type TAction = "fund" | "delete";
const CostCentreCard: React.FC<{ data: TCostCentre }> = ({ data }) => {
  const [action, setAction] = useState<TAction>();
  return (
    <>
      <FundCostCentre
        open={action === "fund"}
        handleClose={() => setAction(undefined)}
        costCentre={data}
      />
      <DeleteCostCentre
        open={action === "delete"}
        handleClose={() => setAction(undefined)}
        costCentre={data}
      />

      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3 flex justify-between items-center">
          <h4 className="font-medium text-lg">{data.name}</h4>
          <div className="flex gap-4 items-center">
            <AppButton label="Fund" handleClick={() => setAction("fund")} />

            <i
              className="ri-delete-bin-6-line text-lg cursor-pointer"
              onClick={() => setAction("delete")}
            />
          </div>
        </div>
        <div className="px-3">
          <div className="border-b flex  gap-5 text-sm">
            <div className="py-7 ">
              <p className="pb-2">
                Date Created: {moment(data.createdAt).format("YYYY-MM-DD")}
              </p>
              <p>
                Last Modified: {moment(data.updatedAt).format("YYYY-MM-DD")}
              </p>
            </div>
            <div className="border-r-2" />
            <div className="py-7 flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <p className="pb-2">Amount Entered:</p>
                <span className="bg-card px-3 rounded-lg font-medium flex items-center">
                  {data.amountEntered}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <p className="pb-2">Amount Paid:</p>
                <span className="bg-card px-3 rounded-lg font-medium flex items-center">
                  {data.amountPaid}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <p className="pb-2">Balance:</p>
                <span className="bg-card px-3 rounded-lg font-medium flex items-center">
                  {data.balance}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
