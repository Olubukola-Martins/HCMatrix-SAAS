import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewPromotionRequest } from "./NewPromotionRequest";
import { PromotionRequestsTableContainer } from "./PromotionRequestsTableContainer";
import { Tabs } from "antd";
import PromotionApprovalRequestsTableContainer from "./PromotionApprovalRequestsTableContainer";

const PromotionRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <PromotionRequestsTableContainer />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <PromotionApprovalRequestsTableContainer />,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <NewPromotionRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for promotion requests.`}
        actions={[
          { name: "New Promotion Request", handleClick: () => setShowM(true) },
        ]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};

export default PromotionRequestsContainer;
