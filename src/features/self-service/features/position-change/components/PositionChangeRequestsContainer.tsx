import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { NewPositionChangeRequest } from "./NewPositionChangeRequest";
import { PositionChangeRequestsTableContainer } from "./PositionChangeRequestsTableContainer";
import { Tabs } from "antd";
import PositionChangeApprovalRequestsContainer from "./PositionChangeApprovalRequestsContainer";

const PositionChangeRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <PositionChangeRequestsTableContainer />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <PositionChangeApprovalRequestsContainer />,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <NewPositionChangeRequest
        open={showM}
        handleClose={() => setShowM(false)}
      />
      <PageSubHeader
        description={`You can now approve and request for position change requests.`}
        actions={[
          {
            name: "New Position Change Request",
            handleClick: () => setShowM(true),
          },
        ]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};

export default PositionChangeRequestsContainer;
