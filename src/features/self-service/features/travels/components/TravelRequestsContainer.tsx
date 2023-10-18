import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";

import { NewTravelRequest } from "./NewTravelRequest";
import { TravelRequestsTableContainer } from "./TravelRequestsTableContainer";
import { Tabs } from "antd";
import TravelApprovalRequestsContainer from "./TravelApprovalRequestsContainer";
import { EmployeeTravelRequests } from "./EmployeeTravelRequests";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";

const TravelRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeeTravelRequests />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <TravelApprovalRequestsContainer />,
    },

    {
      key: "All Requests",
      label: "All Requests",
      children: <TravelRequestsTableContainer />,
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      <NewTravelRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for travel requests.`}
        actions={[
          { name: "New Request", handleClick: () => setShowM(true) },
          {
            name: "Setting",
            handleClick: () => navigate(appRoutes.selfServiceTravelSetting),
            btnVariant: "transparent",
          },
        ]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};

export default TravelRequestsContainer;
