import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewPositionChangeRequest } from "./NewPositionChangeRequest";
import { PositionChangeRequestsTableContainer } from "./PositionChangeRequestsTableContainer";
import { Tabs } from "antd";
import PositionChangeApprovalRequestsContainer from "./PositionChangeApprovalRequestsContainer";
import { EmployeePositionChangeRequests } from "./EmployeePositionChangeRequests";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

const PositionChangeRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const { userPermissions } = useGetUserPermissions();
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeePositionChangeRequests />,
      hidden: false,
    },
    {
      key: "My Approvals",
      label: "My Approvals",
      children: <PositionChangeApprovalRequestsContainer />,
      hidden: false,
    },

    {
      key: "All Requests",
      label: "All Requests",
      children: <PositionChangeRequestsTableContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-position-change-requests"],
      }),
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <NewPositionChangeRequest
        open={showM}
        handleClose={() => setShowM(false)}
      />
      <PageSubHeader
        description={`You can now approve and request for position change requests.`}
        actions={[
          { name: "New Request", handleClick: () => setShowM(true) },
          {
            name: "Setting",
            handleClick: () =>
              navigate(appRoutes.selfServicePositionChangeSetting),
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

export default PositionChangeRequestsContainer;
