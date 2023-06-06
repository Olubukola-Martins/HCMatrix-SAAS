import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";

import { NewTravelRequest } from "./NewTravelRequest";
import { TravelRequestsTableContainer } from "./TravelRequestsTableContainer";

const TravelRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <NewTravelRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for travel requests.`}
        actions={[
          { name: "New Travel Request", handleClick: () => setShowM(true) },
        ]}
      />
      <TravelRequestsTableContainer />
    </div>
  );
};

export default TravelRequestsContainer;
