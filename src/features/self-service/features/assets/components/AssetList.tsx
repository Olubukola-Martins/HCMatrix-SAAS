import AssetListTable from "./AssetListTable";
import { AppButton } from "components/button/AppButton";
import { Select } from "antd";
import { useState } from "react";
import AddSingleAsset from "./AddSingleAsset";
import { TAssetStatus } from "../types";
import { ASSET_STATUSES } from "../constants";
import { useGetAssetTypes } from "../hooks/useGetAssetTypes";
import { useApiAuth } from "hooks/useApiAuth";

// TO DO : Refactor to use antd comps

const AssetList = () => {
  const { companyId, token } = useApiAuth();
  const [showD, setShowD] = useState(false);
  const [assetStatus, setAssetStatus] = useState<TAssetStatus>();
  const [typeId, setTypeId] = useState<number>();
  const { data: assetTypes, isLoading: isAssTypeLoading } = useGetAssetTypes({
    pagination: { offset: 0, limit: 20 },
    companyId,
    token,
  });

  return (
    <>
      <AddSingleAsset open={showD} handleClose={() => setShowD(false)} />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          {/* TO DO: Refactor asset status && type to be their own comps && type should be debounce searchable */}
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
          <AppButton label="Add Asset" handleClick={() => setShowD(true)} />
        </div>

        <AssetListTable status={assetStatus} typeId={typeId} />
      </div>
    </>
  );
};

export default AssetList;
