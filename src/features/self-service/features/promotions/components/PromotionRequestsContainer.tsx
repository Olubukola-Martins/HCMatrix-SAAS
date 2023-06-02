import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewPromotionRequest } from "./NewPromotionRequest";
import { PromotionRequestsTableContainer } from "./PromotionRequestsTableContainer";

const PromotionRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <NewPromotionRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for promotion requests.`}
        actions={[
          { name: "New Monetary Request", handleClick: () => setShowM(true) },
        ]}
      />
      <PromotionRequestsTableContainer />
    </div>
  );
};

export default PromotionRequestsContainer;
