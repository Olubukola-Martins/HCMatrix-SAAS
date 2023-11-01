import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewReimbursement } from "./NewReimbursement";
import { ReimbursmentsRequestsTableContainer } from "./ReimbursmentsRequestsTableContainer";
import { Tabs } from "antd";
import ReimbursementApprovalRequestsContainer from "./ReimbursementApprovalRequestsContainer";
import { EmployeeReimbursementRequests } from "./EmployeeReimbursementRequests";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

const ReimbursementsContainer = () => {
  const [showM, setShowM] = useState(false);
  const { userPermissions } = useGetUserPermissions();
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeeReimbursementRequests />,
      hidden: false,
    },
    {
      key: "My Approvals",
      label: "My Approvals",
      children: <ReimbursementApprovalRequestsContainer />,
      hidden: false,
    },
    {
      key: "All Requests",
      label: "All Requests",
      children: <ReimbursmentsRequestsTableContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-reimbursement-requests"],
      }),
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
            hidden: !canUserAccessComponent({
              userPermissions,
              requiredPermissions: ["manage-requsition-settings"],
            }),
          },
        ]}
      />

      <Tabs items={tabItems.filter((item) => item.hidden === false)} />
    </div>
  );
};

export default ReimbursementsContainer;
