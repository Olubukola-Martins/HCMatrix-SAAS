import { Tabs } from "antd";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import React from "react";
import EmployeeLeaveRequests from "./leave-requests/EmployeeLeaveRequests";
import AllLeaveRequests from "./leave-requests/AllLeaveRequests";
import LeaveApprovalRequestsContainer from "./leave-approvals/LeaveApprovalRequestsContainer";
import LeaveRelieveApprovalsContainer from "./leave-approvals/LeaveRelieveApprovalsContainer";
import AllLeaveRecalls from "./leave-recalls/AllLeaveRecalls";

const LeaveHomeTabs = () => {
  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
  }[] = [
    {
      label: "My Requests",
      children: <EmployeeLeaveRequests />,
      key: "My Requests",
    },
    {
      label: "My Leave Approvals",
      children: <LeaveApprovalRequestsContainer />,
      key: "Leave Approvals",
    },
    {
      label: "My Relieve Approvals",
      children: <LeaveRelieveApprovalsContainer />,
      key: "Relieve Approvals",
    },
    {
      label: "All Leave Requests",
      children: <AllLeaveRequests />,
      key: "All Leave Requests",
    },
    {
      label: "All Leave Recalls",
      children: <AllLeaveRecalls />,
      key: "All Leave Recalls",
    },
  ];
  return (
    <ErrorBoundary>
      <Tabs items={[...tabItems]} />
    </ErrorBoundary>
  );
};

export default LeaveHomeTabs;
