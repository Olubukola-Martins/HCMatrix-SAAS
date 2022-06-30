import React from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";

const EmployeeProfiles = () => {
  return (
    <DashboardLayout>
      <div className="Container pb-10">
        <div className="flex justify-between mt-5">
          <h4 className="flex items-center gap-2 cursor-pointer hover:text-caramel text-accent">
            <span>Employee Status</span>
            <i className="ri-arrow-down-s-line text-xl"></i>
          </h4>
          <div className="flex items-center gap-3">
            <button className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium hover:opacity-25">
              Add Employee Profile
            </button>
            <button className="py-1 px-2 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300">
              Import Employee Profile
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfiles;
