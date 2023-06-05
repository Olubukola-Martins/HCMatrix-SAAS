import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { MonetaryRequestsTableContainer } from "./MonetaryRequestsTableContainer";
import { NewMonetaryRequest } from "./NewMonetaryRequest";

const MonetaryRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <NewMonetaryRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for monetary requests.`}
        actions={[
          { name: "New Monetary Request", handleClick: () => setShowM(true) },
        ]}
      />
      <MonetaryRequestsTableContainer />
    </div>
  );
};

export default MonetaryRequestsContainer;
