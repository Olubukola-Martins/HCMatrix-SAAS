import { AssetTypeCardList } from "./AssetTypeCardList";
import AddAssetTypeButton from "./asset-type/AddAssetTypeButton";

const AssetType = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <AddAssetTypeButton />
        </div>
        <AssetTypeCardList layout="4-col" displayActions={true} />
      </div>
    </>
  );
};

export default AssetType;
