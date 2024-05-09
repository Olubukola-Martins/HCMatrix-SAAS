import AssetListTable from "./AssetListTable";
import { Select } from "antd";
import { useState } from "react";
import AddSingleAsset from "./AddSingleAsset";
import { TAssetStatus } from "../types";
import { ASSET_STATUSES } from "../constants";
import { useApiAuth } from "hooks/useApiAuth";
import DropdownButton from "components/button/DropdownButton";
import { ImportAssets } from "./bulk/ImportAssets";
import { useGetAssetTypes } from "../hooks/asset-type/useGetAssetTypes";

const AssetList = () => {
  const { companyId, token } = useApiAuth();
  type TAction = "add-asset" | "add-asset-in-bulk";
  const [action, setAction] = useState<TAction>();
  const [assetStatus, setAssetStatus] = useState<TAssetStatus>();
  const [typeId, setTypeId] = useState<number>();
  const { data: assetTypes, isLoading: isAssTypeLoading } = useGetAssetTypes({
    pagination: { offset: 0, limit: 20 },
    companyId,
    token,
  });

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

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Select
              loading={isAssTypeLoading}
              placeholder="Asset Type"
              allowClear
              onClear={() => setTypeId(undefined)}
              value={typeId}
              options={assetTypes?.data.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              onSelect={(val: number) => setTypeId(val)}
            />
            <Select
              allowClear
              onClear={() => setAssetStatus(undefined)}
              value={assetStatus}
              placeholder="Status"
              options={ASSET_STATUSES.map((item) => ({
                label: item,
                value: item,
              }))}
              onSelect={(val: TAssetStatus) => setAssetStatus(val)}
            />
          </div>
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
        </div>

        <AssetListTable status={assetStatus} typeId={typeId} />
      </div>
    </>
  );
};

export default AssetList;
