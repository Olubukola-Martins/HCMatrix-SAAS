import React, { useState } from "react";
import { AssetMonthlyInsightsCard } from "./AssetMonthlyInsightsCard";
import { AppButtonList } from "components/button/AppButtonList";
import AddSingleAsset from "./AddSingleAsset";
import { NewAssetRequest } from "./NewAssetRequest";
import { RecentAssetRequestsCard } from "./RecentAssetRequestsCard";
import { AssetTypeCardList } from "./AssetTypeCardList";
import { AssetsByStatusCard } from "./AssetsByStatusCard";
import { TAssetTabKey } from "../pages/Assets";
import DropdownButton from "components/button/DropdownButton";
import { ImportAssets } from "./bulk/ImportAssets";
import AddAssetTypeButton from "./asset-type/AddAssetTypeButton";

interface IProps {
  handleTabKey: (val: TAssetTabKey) => void;
}

const AssetOverview: React.FC<IProps> = ({ handleTabKey }) => {
  type TAction = "add-asset" | "request-asset" | "add-asset-in-bulk";
  const [action, setAction] = useState<TAction>();

  return (
    <>
      <ImportAssets
        open={action === "add-asset-in-bulk"}
        handleClose={() => setAction(undefined)}
      />
      <AddSingleAsset
        open={action === "add-asset"}
        handleClose={() => setAction(undefined)}
      />

      <NewAssetRequest
        open={action === "request-asset"}
        handleClose={() => setAction(undefined)}
      />
      <div>
        <div className="flex justify-end gap-4">
          <DropdownButton
            label="Add Asset"
            items={[
              {
                key: "add-asset",
                label: "Add Single Asset",
                onClick: () => setAction("add-asset"),
              },
              {
                key: "bulk-import",
                label: "Import Assets",
                onClick: () => setAction("add-asset-in-bulk"),
              },
            ]}
          />
          <AddAssetTypeButton />
          <AppButtonList
            data={[
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
              handleSeeAll={() => handleTabKey("All Requests")}
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
