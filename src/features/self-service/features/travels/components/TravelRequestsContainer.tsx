import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";

import { NewTravelRequest } from "./NewTravelRequest";
import { TravelRequestsTableContainer } from "./TravelRequestsTableContainer";
import { Tabs } from "antd";
import TravelApprovalRequestsContainer from "./TravelApprovalRequestsContainer";

const TravelRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <TravelRequestsTableContainer />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <TravelApprovalRequestsContainer />,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <NewTravelRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for travel requests.`}
        actions={[
          { name: "New Travel Request", handleClick: () => setShowM(true) },
        ]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};

export default TravelRequestsContainer;
