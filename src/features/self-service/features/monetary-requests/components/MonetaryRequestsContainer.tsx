import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { MonetaryRequestsTableContainer } from "./MonetaryRequestsTableContainer";
import { NewMonetaryRequest } from "./NewMonetaryRequest";
import { Tabs } from "antd";
import MoneyApprovalRequestsContainer from "./MoneyApprovalRequestsContainer";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { EmployeeMoneyRequests } from "./EmployeeMoneyRequests";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

const MonetaryRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const { userPermissions } = useGetUserPermissions();

  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeeMoneyRequests />,
      hidden: false,
    },
    {
      key: "My Approvals",
      label: "My Approvals",
      children: <MoneyApprovalRequestsContainer />,
      hidden: false,
    },
    {
      key: "All Requests",
      label: "All Requests",
      children: <MonetaryRequestsTableContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-requsition-settings"],
      }),
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <NewMonetaryRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for monetary requests.`}
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

export default MonetaryRequestsContainer;
