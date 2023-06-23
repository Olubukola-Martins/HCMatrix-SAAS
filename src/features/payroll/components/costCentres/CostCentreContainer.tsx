import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { AddCostCentre } from "./AddCostCentre";
import { Pagination } from "antd";
import { usePagination } from "hooks/usePagination";

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
const DUMMY_DATA = Array(12).fill({
  name: "Abuja Branch Cost Centre",
  createdAt: "03/07/2020",
  updatedAt: "03/07/2020",
  accountNo: "00090872780",
});
const CostCentreCardList = () => {
  const { pagination, onChange } = usePagination();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10 gap-y-10">
        {DUMMY_DATA.map((item, i) => (
          <CostCentreCard key={i} {...item} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination
          {...{ ...pagination, total: DUMMY_DATA.length }}
          onChange={onChange}
          size="small"
        />
      </div>
    </div>
  );
};
const CostCentreCard: React.FC<{
  name: string;
  createdAt: string;
  updatedAt: string;
  accountNo: string;
}> = ({ name, createdAt, updatedAt, accountNo }) => {
  return (
    <>
      {/* view */}
      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3 flex justify-between items-center">
          <h4 className="font-medium text-lg">{name}</h4>
          <div className="flex gap-2 text-lg">
            <i className="ri-pencil-line  cursor-pointer" />

            <i className="ri-delete-bin-6-line  cursor-pointer" />
          </div>
        </div>
        <div className="px-3">
          <div className="border-b flex gap-5 text-sm">
            <div className="py-7">
              <p className="pb-2">Date Created: {createdAt}</p>
              <p>Last Modified: {updatedAt}</p>
            </div>
            <div className="border-r-2" />
            <div className="py-7">
              <p className="pb-2">Account Details</p>
              <span className="bg-card px-3 rounded-lg font-medium">
                {accountNo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
