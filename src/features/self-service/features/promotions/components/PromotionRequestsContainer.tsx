import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewPromotionRequest } from "./NewPromotionRequest";
import { PromotionRequestsTableContainer } from "./PromotionRequestsTableContainer";
import { Tabs } from "antd";
import PromotionApprovalRequestsTableContainer from "./PromotionApprovalRequestsTableContainer";
import { EmployeePromotionRequests } from "./EmployeePromotionRequests";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";

const PromotionRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeePromotionRequests />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <PromotionApprovalRequestsTableContainer />,
    },
    {
      key: "All Requests",
      label: "All Requests",
      children: <PromotionRequestsTableContainer />,
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <NewPromotionRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for promotion requests.`}
        actions={[
          { name: "New Request", handleClick: () => setShowM(true) },
          {
            name: "Setting",
            handleClick: () => navigate(appRoutes.selfServiceMonetarySetting),
            btnVariant: "transparent",
          },
        ]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};

export default PromotionRequestsContainer;
