import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { Tabs } from "antd";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { EmployeeProfileEditRequests } from "./EmployeeProfileEditRequests";
import ProfileEditApprovalRequestsTableContainer from "./ProfileEditApprovalRequestsTableContainer";
import { ProfileEditRequestsTableContainer } from "./ProfileEditRequestsTableContainer";
import { NewProfileEditRequest } from "./NewProfileEditRequest";

const ProfileEditRequestsContainer = () => {
  const [showM, setShowM] = useState(false);
  const { userPermissions } = useGetUserPermissions();
  const tabItems = [
    {
      key: "My Requests",
      label: "My Requests",
      children: <EmployeeProfileEditRequests />,
      hidden: false,
    },
    {
      key: "My Approvals",
      label: "My Approvals",
      children: <ProfileEditApprovalRequestsTableContainer />,
      hidden: false,
    },
    {
      key: "All Requests",
      label: "All Requests",
      children: <ProfileEditRequestsTableContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-promotion-requests"],
      }),
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <NewProfileEditRequest open={showM} handleClose={() => setShowM(false)} />
      <PageSubHeader
        description={`You can now approve and request for profile edit requests.`}
        actions={[
          { name: "New Request", handleClick: () => setShowM(true) },
          {
            name: "Setting",
            handleClick: () => navigate(appRoutes.selfServiceProfileEditSetting),
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

export default ProfileEditRequestsContainer;
