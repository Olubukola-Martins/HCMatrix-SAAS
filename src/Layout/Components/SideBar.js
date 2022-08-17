import React from "react";
import "../style/style.css";

const SideBar = () => {
  return (
    <>
      <div
        className="h-screen overflow-y-auto flex-col flex items-center px-2 text-center pb-32 scrollBar"
        style={{ background: "var(--sideBar)" }}
      >
        <div className="mt-10 cursor-pointer">
          <div className="flex justify-center">
            <span
              className="sideBarList"
              style={{ background: "var(--caramel)" }}
            >
              <i className="ri-home-smile-line" style={{ color: "#fff" }}></i>
            </span>
          </div>
          <span className="sideBarName">Home</span>
        </div>
        <div className="sideBarItemWrap">
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-organization-chart"></i>
            </span>
          </div>
          <span className="sideBarName">Self-service</span>
        </div>

        <div className="sideBarItemWrap">
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-check-double-line"></i>
            </span>
          </div>
          <span className="sideBarName">Payroll</span>
        </div>
        <div className="sideBarItemWrap">
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-line-chart-line"></i>
            </span>
          </div>
          <span className="sideBarName">Recruitment</span>
        </div>
        <div className="sideBarItemWrap">
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-creative-commons-sa-line"></i>
            </span>
          </div>
          <span className="sideBarName">Performance</span>
        </div>
        <div className="sideBarItemWrap">
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-hard-drive-2-line"></i>
            </span>
          </div>
          <span className="sideBarName">Time & Attendance</span>
        </div>
        <div className="sideBarItemWrap">
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-hard-drive-2-line"></i>
            </span>
          </div>
          <span className="sideBarName">Learning & Development</span>
        </div>
        <div className="sideBarItemWrap">
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-customer-service-line"></i>
            </span>
          </div>
          <span className="sideBarName">Subscriptions</span>
        </div>
      </div>
    </>
  );
};

export default SideBar;
