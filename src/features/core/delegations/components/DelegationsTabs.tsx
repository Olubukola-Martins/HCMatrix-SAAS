import { Tabs } from "antd";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import React from "react";
import AllDelegatedDelegations from "./AllDelegatedDelegations";
import AllDelegationsDelegated from "./AllDelegationsDelegated";
import { TPermissionLabel } from "features/core/roles-and-permissions/types";
import { canUserAccessComponent } from "components/permission-restriction/PermissionRestrictor";

const DelegationsTabs: React.FC<{
  userPermissions: TPermissionLabel[];
}> = ({ userPermissions }) => {
  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
    hidden: boolean;
  }[] = [
    {
      label: "My Delegations",
      children: <AllDelegatedDelegations />,
      key: "My Delegations",
      hidden: false,
    },
    {
      label: "Delegated Delegations",
      children: <AllDelegationsDelegated />,
      key: "Delegated Delegations",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-delegations"],
      }),
    },
  ];
  return (
    <ErrorBoundary>
      <Tabs items={[...tabItems.filter((item) => item.hidden === false)]} />
    </ErrorBoundary>
  );
};

export default DelegationsTabs;
