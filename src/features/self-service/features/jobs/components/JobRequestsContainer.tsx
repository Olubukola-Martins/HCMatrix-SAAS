import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";

import { JobRequestsTableContainer } from "./JobRequestsTableContainer";
import { NewJobRequest } from "./NewJobRequest";
import { Tabs } from "antd";
import JobApprovalRequestsContainer from "./JobApprovalRequestsContainer";

const JobRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <JobRequestsTableContainer />,
    },
    {
      key: "Approval Requests",
      label: "Approval Requests",
      children: <JobApprovalRequestsContainer />,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <NewJobRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for job requests.`}
        actions={[
          { name: "New Job Request", handleClick: () => setShowM(true) },
        ]}
      />
      <Tabs items={tabItems} />
    </div>
  );
};

export default JobRequestsContainer;
