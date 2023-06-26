import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewTransfer } from "./NewTransfer";
import { TransferRequestsTableContainer } from "./TransferRequestsTableContainer";
import { Tabs } from "antd";
import TransferApprovalRequestsContainer from "./TransferApprovalRequestsContainer";

export const TransfersContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <TransferRequestsTableContainer />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <TransferApprovalRequestsContainer />,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <NewTransfer open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for tranfers.`}
        actions={[{ name: "New Transfer", handleClick: () => setShowM(true) }]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};
