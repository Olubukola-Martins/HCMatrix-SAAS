import { Tabs } from "antd";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import React from "react";
import EmployeeLeaveRequests from "./leave-requests/EmployeeLeaveRequests";
import AllLeaveRequests from "./leave-requests/AllLeaveRequests";
import LeaveApprovalRequestsContainer from "./leave-approvals/LeaveApprovalRequestsContainer";
import LeaveRelieveApprovalsContainer from "./leave-approvals/LeaveRelieveApprovalsContainer";
import AllLeaveRecalls from "./leave-recalls/AllLeaveRecalls";
import EmployeeLeaveRecallsTable from "./leave-recalls/EmployeeLeaveRecallsTable";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

const LeaveHomeTabs = () => {
  const { userPermissions } = useGetUserPermissions();
  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
    hidden: boolean;
  }[] = [
    {
      label: "My Requests",
      children: <EmployeeLeaveRequests />,
      key: "My Requests",
      hidden: false,
    },
    {
      label: "My Leave Approvals",
      children: <LeaveApprovalRequestsContainer />,
      key: "Leave Approvals",
      hidden: false,
    },
    {
      label: "My Leave Recalls",
      children: <EmployeeLeaveRecallsTable />,
      key: "My Leave Recalls",
      hidden: false,
    },
    {
      label: "My Relieve Approvals",
      children: <LeaveRelieveApprovalsContainer />,
      key: "Relieve Approvals",
      hidden: false,
    },
    {
      label: "All Leave Requests",
      children: <AllLeaveRequests />,
      key: "All Leave Requests",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-leave-requests"],
      }),
    },
    {
      label: "All Leave Recalls",
      children: <AllLeaveRecalls />,
      key: "All Leave Recalls",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-leave-recalls"],
      }),
    },
  ];
  return (
    <ErrorBoundary>
      <Tabs items={[...tabItems.filter((item) => item.hidden === false)]} />
    </ErrorBoundary>
  );
};

export default LeaveHomeTabs;
