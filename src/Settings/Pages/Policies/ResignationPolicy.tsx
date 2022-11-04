import React from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import ResignationPolicyHeader from "../../Components/Policies/ResignationPolicyHeader";
import ResignationPolicyTable from "../../Components/Policies/ResignationPolicyTable";

const ResignationPolicy = () => {
  return (
    <DashboardLayout>
      <div className="Container">
        <div className="flex flex-col gap-4">
          <ResignationPolicyHeader />
          <ResignationPolicyTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResignationPolicy;
