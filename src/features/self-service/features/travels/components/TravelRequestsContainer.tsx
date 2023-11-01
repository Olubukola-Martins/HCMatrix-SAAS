import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";

import { NewTravelRequest } from "./NewTravelRequest";
import { TravelRequestsTableContainer } from "./TravelRequestsTableContainer";
import { Tabs } from "antd";
import TravelApprovalRequestsContainer from "./TravelApprovalRequestsContainer";
import { EmployeeTravelRequests } from "./EmployeeTravelRequests";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

const TravelRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const { userPermissions } = useGetUserPermissions();
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeeTravelRequests />,
      hidden: false,
    },
    {
      key: "My Approvals",
      label: "My Approvals",
      children: <TravelApprovalRequestsContainer />,
      hidden: false,
    },

    {
      key: "All Requests",
      label: "All Requests",
      children: <TravelRequestsTableContainer />,
      hidden: !canUserAccessComponent({
        requiredPermissions: ["view-all-travel-requests"],
        userPermissions,
      }),
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      <NewTravelRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for travel requests.`}
        actions={[
          { name: "New Request", handleClick: () => setShowM(true) },
          {
            name: "Setting",
            handleClick: () => navigate(appRoutes.selfServiceTravelSetting),
            btnVariant: "transparent",
            hidden: !canUserAccessComponent({
              requiredPermissions: ["manage-requsition-settings"],
              userPermissions,
            }),
          },
        ]}
      />
      <Tabs items={tabItems.filter((item) => item.hidden === false)} />
    </div>
  );
};

export default TravelRequestsContainer;
