import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewPromotionRequest } from "./NewPromotionRequest";
import { PromotionRequestsTableContainer } from "./PromotionRequestsTableContainer";
import { Tabs } from "antd";
import PromotionApprovalRequestsTableContainer from "./PromotionApprovalRequestsTableContainer";
import { EmployeePromotionRequests } from "./EmployeePromotionRequests";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

const PromotionRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const { userPermissions } = useGetUserPermissions();
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeePromotionRequests />,
      hidden: false,
    },
    {
      key: "My Approvals",
      label: "My Approvals",
      children: <PromotionApprovalRequestsTableContainer />,
      hidden: false,
    },
    {
      key: "All Requests",
      label: "All Requests",
      children: <PromotionRequestsTableContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-promotion-requests"],
      }),
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

export default PromotionRequestsContainer;
