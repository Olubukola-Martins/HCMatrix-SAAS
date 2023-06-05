import AssetListTable from "./AssetListTable";
import { AppButton } from "components/button/AppButton";
import { Select } from "antd";
import { useState } from "react";
import AddSingleAsset from "./AddSingleAsset";

// TO DO : Refactor to use antd comps

const AssetList = () => {
  const [showD, setShowD] = useState(false);

  return (
    <>
      <AddSingleAsset open={showD} handleClose={() => setShowD(false)} />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Select placeholder="Asset Type" />
            <Select placeholder="Status" />
          </div>
          <AppButton label="Add Asset" handleClick={() => setShowD(true)} />
        </div>

        <AssetListTable />
      </div>
    </>
  );
};

export default AssetList;
