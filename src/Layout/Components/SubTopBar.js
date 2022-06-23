import React, { useState } from "react";

const SubTopBar = () => {
  const [hideOrShow, setHideOrShow] = useState(false);

  const hideTrial = () => {
    if (window.scrollY >= 5) {
      setHideOrShow(true);
    } else {
      setHideOrShow(false);
    }
  };

  window.addEventListener("scroll", hideTrial);

  return (
    <>
      <div
        className="w-full shadow-lg py-3 flex items-center gap-3"
        style={{
          background: "var(--background)",
          boxShadow: "0px 15px 10px -15px var(--scrollBg)",
        }}
      >
        <div className="Container md:hidden flex justify-between ">
          <span className="text-accent font-medium cursor-pointer hover:text-caramel">
            Modules
          </span>
          <i className="ri-menu-line text-accent text-xl cursor-pointer"></i>
        </div>
        <div className="Container hidden md:flex  items-center md:flex-row flex-col gap-4 text-accent font-medium text-sm">
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
      {hideOrShow ? (
        ""
      ) : (
        <div className="Container text-right">
          <span className="text-xs text-caramel font-medium">
            Enjoy your free 30 days trial
          </span>
        </div>
      )}
    </>
  );
};

export default SubTopBar;
