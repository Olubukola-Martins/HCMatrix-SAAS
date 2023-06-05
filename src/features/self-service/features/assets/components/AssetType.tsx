import { AppButton } from "components/button/AppButton";
import { AssetTypeCardList } from "./AssetTypeCardList";
import { useState } from "react";
import AddAssetType from "./AddAssetsType";

const AssetType = () => {
  const [showD, setShowD] = useState(false);
  return (
    <>
      <AddAssetType open={showD} handleClose={() => setShowD(false)} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <AppButton
            label="Add Asset Type"
            handleClick={() => setShowD(true)}
          />
        </div>
        <AssetTypeCardList layout="4-col" />
      </div>
    </>
  );
};

export default AssetType;
