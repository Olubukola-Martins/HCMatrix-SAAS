import React from "react";
import { AssetAssigneeHistoryList } from "./AssetAssigneeHistoryList";
import { TAsset } from "../types";

export const AssetAssigneeHistory: React.FC<{ asset: TAsset }> = ({
  asset,
}) => {
  return (
    <div>
      <div className="flex items-center gap-3 justify-end">
        <div className="my-5 flex justify-end gap-3">
          <i className="ri-download-2-line text-lg"></i>
        </div>
      </div>
      <AssetAssigneeHistoryList asset={asset} />
    </div>
  );
};
