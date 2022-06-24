import React from "react";
import DashboardLayout from "../../Layout/DashboardLayout";

const Domains = () => {
  return (
    <DashboardLayout>
      <div className="Container">
        <div className="flex items-center justify-between">
          <h4 className="text-accent text-base">
            Create and Manage Domain information of your organization
          </h4>
          <div className="flex items-center gap-1">
            <span className="text-caramel font-medium text-sm">
              + Add Domain
            </span>
            <i
              className="ri-question-fill text-gray-500"
              title="Add domain"
            ></i>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Domains;
