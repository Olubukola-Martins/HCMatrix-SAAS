import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewPositionChangeRequest } from "./NewPositionChangeRequest";
import { PositionChangeRequestsTableContainer } from "./PositionChangeRequestsTableContainer";
import { Tabs } from "antd";
import PositionChangeApprovalRequestsContainer from "./PositionChangeApprovalRequestsContainer";
import { EmployeePositionChangeRequests } from "./EmployeePositionChangeRequests";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";

const PositionChangeRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeePositionChangeRequests />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <PositionChangeApprovalRequestsContainer />,
    },

    {
      key: "All Requests",
      label: "All Requests",
      children: <PositionChangeRequestsTableContainer />,
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
          },
        ]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};

export default PositionChangeRequestsContainer;
