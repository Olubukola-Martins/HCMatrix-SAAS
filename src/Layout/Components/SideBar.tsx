import React from "react";
import { NavLink } from "react-router-dom";
import "../style/style.css";

const SideBar = () => {
  return (
    <>
      <div
        className="h-screen overflow-y-auto flex-col bg-card flex items-center px-2 text-center pb-32 scrollBar"
      >
        <NavLink to={`/`} className="sideBarItemWrap">
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-home-smile-line"></i>
            </span>
          </div>
          <span className="sideBarName">Home</span>
        </NavLink>

        <NavLink to="/self-service/home" className="sideBarItemWrap">
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-organization-chart"></i>
            </span>
          </div>
          <span className="sideBarName">Self-service</span>
        </NavLink>

        <NavLink className="sideBarItemWrap" to={`/payroll/home`}>
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-check-double-line"></i>
            </span>
          </div>

          <span className="sideBarName">Payroll</span>
        </NavLink>
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
              <i className="ri-time-line"></i>
            </span>
          </div>
          <span className="sideBarName">Time & Attendance</span>
        </div>
        <div className="sideBarItemWrap">
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-book-2-line"></i>
            </span>
          </div>
          <span className="sideBarName">Learning & Development</span>
        </div>
        <div className="sideBarItemWrap">
          <div className="flex justify-center">
            <span className="sideBarList">
              <i className="ri-bill-line"></i>
            </span>
          </div>
          <span className="sideBarName">Subscriptions</span>
        </div>
      </div>
    </>
  );
};

export default SideBar;
