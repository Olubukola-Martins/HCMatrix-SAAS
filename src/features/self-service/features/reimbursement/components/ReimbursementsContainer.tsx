import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewReimbursement } from "./NewReimbursement";
import { ReimbursmentsRequestsTableContainer } from "./ReimbursmentsRequestsTableContainer";
import { Tabs } from "antd";
import ReimbursementApprovalRequestsContainer from "./ReimbursementApprovalRequestsContainer";

const ReimbursementsContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <ReimbursmentsRequestsTableContainer />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <ReimbursementApprovalRequestsContainer />,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <NewReimbursement open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for reimbursements.`}
        actions={[
          { name: "New Reimbursement", handleClick: () => setShowM(true) },
        ]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};

export default ReimbursementsContainer;
