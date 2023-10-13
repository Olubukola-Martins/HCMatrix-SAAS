import React from "react";
import PageSubHeader from "components/layout/PageSubHeader";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import HandOverTableContainer from "./HandOverTableContainer";
import { Tabs } from "antd";
import HandOverApprovalRequestsContainer from "./approvalRequests/HandOverApprovalRequestsContainer";

export const HandOverContainer = () => {
  const navigate = useNavigate();
  const tabItems = [
    {
      key: "Hand Overs",
      label: "Hand Overs",
      children: <HandOverTableContainer />,
    },
    {
      key: "Approvals",
      label: "Approvals",
      children: <HandOverApprovalRequestsContainer />,
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

        <Tabs items={tabItems} />
      </div>
    </>
  );
};
