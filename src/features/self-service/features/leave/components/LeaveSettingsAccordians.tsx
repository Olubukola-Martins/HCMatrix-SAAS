import React from "react";
import LeaveCyclesAccordian from "./settings/LeaveCyclesAccordian";
import LeaveTypesAccordian from "./settings/LeaveTypesAccordian";
import LeavePolicyAccordian from "./settings/LeavePolicyAccordian";

const LeaveSettingsAccordians = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <LeaveCyclesAccordian />
      <LeavePolicyAccordian />
      <LeaveTypesAccordian />
    </div>
  );
};

export default LeaveSettingsAccordians;
