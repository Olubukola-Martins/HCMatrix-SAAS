import React, { useState } from "react";

import { AssetMonthlyInsightsCard } from "./AssetMonthlyInsightsCard";

import { AppButtonList } from "components/button/AppButtonList";
import AddSingleAsset from "./AddSingleAsset";
import AddAssetType from "./AddAssetsType";
import { NewAssetRequest } from "./NewAssetRequest";
import { RecentAssetRequestsCard } from "./RecentAssetRequestsCard";
import { AssetTypeCardList } from "./AssetTypeCardList";
import { AssetsByStatusCard } from "./AssetsByStatusCard";
import { TAssetTabKey } from "../pages/Assets";

interface IProps {
  handleTabKey: (val: TAssetTabKey) => void;
}

const AssetOverview: React.FC<IProps> = ({ handleTabKey }) => {
  type TAction = "add-asset" | "add-asset-type" | "request-asset";
  const [action, setAction] = useState<TAction>();

  return (
    <>
      <AddSingleAsset
        open={action === "add-asset"}
        handleClose={() => setAction(undefined)}
      />
      <AddAssetType
        open={action === "add-asset-type"}
        handleClose={() => setAction(undefined)}
      />
      <NewAssetRequest
        open={action === "request-asset"}
        handleClose={() => setAction(undefined)}
      />
      <div>
        <div className="flex justify-end">
          <AppButtonList
            data={[
              {
                handleClick: () => {
                  setAction("add-asset");
                },
                label: "Add Assest",
                variant: "default",
              },
              {
                handleClick: () => {
                  setAction("add-asset-type");
                },

                label: "Add Assest Type",
                variant: "transparent",
              },
              {
                handleClick: () => {
                  setAction("request-asset");
                },

                label: "New Requisition",
                variant: "transparent",
              },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5  mt-4">
          <div className="col-span-3">
            <AssetMonthlyInsightsCard />
          </div>

          <div>
            <RecentAssetRequestsCard
              handleSeeAll={() => handleTabKey("My Requests")}
            />

          </div>
        </div>

        <h3 className="pt-10 pb-6 font-semibold">Asset Type</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-3">
            <AssetTypeCardList />
          </div>

          <div>
            <AssetsByStatusCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetOverview;
