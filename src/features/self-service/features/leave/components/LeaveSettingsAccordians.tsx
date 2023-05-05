import React from "react";
import LeavePolicyAccordian from "./LeavePolicyAccordian";
import LeaveTypeAccordian from "./LeaveTypeAccordian";

const LeaveSettingsAccordians = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <LeaveTypeAccordian />
      <LeavePolicyAccordian />
    </div>
  );
};

export default LeaveSettingsAccordians;
