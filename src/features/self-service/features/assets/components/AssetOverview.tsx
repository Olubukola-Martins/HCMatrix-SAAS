import React, { useState } from "react";

import { AssetMonthlyInsightsCard } from "./AssetMonthlyInsightsCard";

import { AppButtonList } from "components/button/AppButtonList";
import AddSingleAsset from "./AddSingleAsset";
import AddAssetType from "./AddAssetsType";
import { NewAssetRequest } from "./NewAssetRequest";
import { RecentAssetRequestsCard } from "./RecentAssetRequestsCard";
import { AssetTypeCardList } from "./AssetTypeCardList";

const AssetOverview = () => {
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
            <RecentAssetRequestsCard />
          </div>
        </div>

        <h3 className="pt-10 pb-6 font-semibold">Asset Type</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-3">
            <AssetTypeCardList />
          </div>

          <div className="border rounded-md p-2 shadow">
            <p>Asset by Status[Create PieCha reusable]</p>
            <div className="flex justify-center my-4">
              <img
                src="https://res.cloudinary.com/ddvaelej7/image/upload/v1664348855/roundGraph1_kz4hem.svg"
                alt="graph"
                className="h-28"
              />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-caramel" />
                <span className="text-sm">0 Assigned</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ background: "#FFA600" }}
                />
                <span className="text-sm">0 Unassigned</span>
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ background: "#FFF0F0" }}
                />
                <span className="text-sm">0 Under Repair</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-card" />
                <span className="text-sm">0 Condemned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetOverview;
