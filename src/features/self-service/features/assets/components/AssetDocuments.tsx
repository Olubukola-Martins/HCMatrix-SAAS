import React, { useState } from "react";
import { TAsset } from "../types";
import { AssetDocumentList } from "./AssetDocumentList";
import { AppButton } from "components/button/AppButton";
import { AddAssetDocument } from "./AddAssetDocument";

export const AssetDocuments: React.FC<{ asset: TAsset }> = ({ asset }) => {
  const [showD, setShowD] = useState(false);
  return (
    <>
      <AddAssetDocument
        open={showD}
        handleClose={() => setShowD(false)}
        asset={asset}
      />
      <div>
        <div className="flex items-center gap-3 justify-end">
          <div className="my-5 flex justify-end gap-3">
            <i className="ri-download-2-line text-lg"></i>
            <AppButton
              variant="transparent"
              label="Add Document"
              handleClick={() => setShowD(true)}
            />
          </div>
        </div>
        <AssetDocumentList asset={asset} />
      </div>
    </>
  );
};
