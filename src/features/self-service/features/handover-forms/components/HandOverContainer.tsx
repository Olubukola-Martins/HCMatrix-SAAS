import React from "react";
import PageSubHeader from "components/layout/PageSubHeader";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import HandOverTableContainer from "./HandOverTableContainer";
import { Tabs } from "antd";
import HandOverApprovalRequestsContainer from "./approvalRequests/HandOverApprovalRequestsContainer";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

export const HandOverContainer = () => {
  const navigate = useNavigate();
  const { userPermissions } = useGetUserPermissions();
  const tabItems = [
    {
      key: "All Hand Overs",
      label: "All Hand Overs",
      children: <HandOverTableContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-exit-handover-forms"],
      }),
    },
    {
      key: "Approvals",
      label: "Approvals",
      children: <HandOverApprovalRequestsContainer />,
      hidden: false,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-6">
        <PageSubHeader
          description={`You can now manage hand-overs`}
          actions={[
            {
              name: "Hand Over",
              handleClick: () => navigate(appRoutes.newHandOverForm),
            },
          ]}
        />

        <Tabs items={tabItems.filter((item) => item.hidden === false)} />
      </div>
    </>
  );
};
