import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { MonetaryRequestsTableContainer } from "./MonetaryRequestsTableContainer";
import { NewMonetaryRequest } from "./NewMonetaryRequest";
import { Tabs } from "antd";
import MoneyApprovalRequestsContainer from "./MoneyApprovalRequestsContainer";

const MonetaryRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <MonetaryRequestsTableContainer />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <MoneyApprovalRequestsContainer />,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <NewMonetaryRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for monetary requests.`}
        actions={[
          { name: "New Monetary Request", handleClick: () => setShowM(true) },
        ]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};

export default MonetaryRequestsContainer;
