import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewPositionChangeRequest } from "./NewPositionChangeRequest";
import { PositionChangeRequestsTableContainer } from "./PositionChangeRequestsTableContainer";

const PositionChangeRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <NewPositionChangeRequest
        open={showM}
        handleClose={() => setShowM(false)}
      />
      <PageSubHeader
        description={`You can now approve and request for monetary requests.`}
        actions={[
          { name: "New Monetary Request", handleClick: () => setShowM(true) },
        ]}
      />
      <PositionChangeRequestsTableContainer />
    </div>
  );
};

export default PositionChangeRequestsContainer;
