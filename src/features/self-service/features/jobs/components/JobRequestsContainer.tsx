import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";

import { JobRequestsTableContainer } from "./JobRequestsTableContainer";
import { NewJobRequest } from "./NewJobRequest";
import { Tabs } from "antd";
import JobApprovalRequestsContainer from "./JobApprovalRequestsContainer";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import { EmployeeJobRequests } from "./EmployeeJobRequests";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

const JobRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const { userPermissions } = useGetUserPermissions();
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeeJobRequests />,
      hidden: false,
    },
    {
      key: "My Approvals",
      label: "My Approvals",
      children: <JobApprovalRequestsContainer />,
      hidden: false,
    },

    {
      key: "All Requests",
      label: "All Requests",
      children: <JobRequestsTableContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-job-requests"],
      }),
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

export default JobRequestsContainer;
