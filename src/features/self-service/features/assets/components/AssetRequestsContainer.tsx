import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewAssetRequest } from "./NewAssetRequest";
import { AssetRequestsTableContainer } from "./AssetRequestsTableContainer";

const AssetRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <NewAssetRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={``}
        hideBackground
        actions={[
          { name: "New Asset Request", handleClick: () => setShowM(true) },
        ]}
      />
      <AssetRequestsTableContainer />
    </div>
  );
};

export default AssetRequestsContainer;
