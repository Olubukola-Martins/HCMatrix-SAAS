import React from "react";

const SubTopBar = () => {
  return (
    <>
      <div
        className="w-full shadow-lg py-3 flex items-center gap-3"
        style={{
          background: "var(--background)",
          boxShadow: "0px 15px 10px -15px var(--scrollBg)",
        }}
      >
        <div className="Container flex items-center gap-4 text-accent font-medium text-sm">
          <div className="flex items-center gap-1 cursor-pointer hover:text-caramel">
            <i class="ri-scales-line text-base"></i>
            <span>Performance</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-caramel">
            <i class="ri-money-dollar-circle-line text-base"></i>
            <span>Payroll</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-caramel">
            <i class="ri-team-line text-base"></i>
            <span>Manage employee</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-caramel">
            <i class="ri-user-shared-2-line text-base"></i>
            <span>Recruitment</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-caramel">
            <i class="ri-honour-line text-base"></i>
            <span>Attendance</span>
          </div>
        </div>
      </div>
      <div className="Container text-right">
        <span className="text-xs text-caramel font-medium">
          Enjoy your free 30 days trial
        </span>
      </div>
    </>
  );
};

export default SubTopBar;
