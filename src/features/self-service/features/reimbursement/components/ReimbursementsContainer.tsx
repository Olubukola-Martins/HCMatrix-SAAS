import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewReimbursement } from "./NewReimbursement";
import { ReimbursmentsRequestsTableContainer } from "./ReimbursmentsRequestsTableContainer";
import { Tabs } from "antd";
import ReimbursementApprovalRequestsContainer from "./ReimbursementApprovalRequestsContainer";
import { EmployeeReimbursementRequests } from "./EmployeeReimbursementRequests";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";

const ReimbursementsContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeeReimbursementRequests />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <ReimbursementApprovalRequestsContainer />,
    },
    {
      key: "All Requests",
      label: "All Requests",
      children: <ReimbursmentsRequestsTableContainer />,
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      <NewReimbursement open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for reimbursements.`}
        actions={[
          { name: "New Request", handleClick: () => setShowM(true) },
          {
            name: "Setting",
            handleClick: () => navigate(appRoutes.selfServiceReimbursement),
            btnVariant: "transparent",
          },
        ]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};

export default ReimbursementsContainer;
