import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";

import { JobRequestsTableContainer } from "./JobRequestsTableContainer";
import { NewJobRequest } from "./NewJobRequest";
import { Tabs } from "antd";
import JobApprovalRequestsContainer from "./JobApprovalRequestsContainer";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import { EmployeeJobRequests } from "./EmployeeJobRequests";

const JobRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeeJobRequests />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <JobApprovalRequestsContainer />,
    },

    {
      key: "All Requests",
      label: "All Requests",
      children: <JobRequestsTableContainer />,
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <NewJobRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for job requests.`}
        actions={[
          { name: "New Request", handleClick: () => setShowM(true) },
          {
            name: "Setting",
            handleClick: () => navigate(appRoutes.selfServiceJobSetting),
            btnVariant: "transparent",
          },
        ]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};

export default JobRequestsContainer;
