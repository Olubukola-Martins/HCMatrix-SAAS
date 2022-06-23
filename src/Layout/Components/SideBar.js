import React, { useState } from "react";
import "../style/style.css";
import Popover from "@mui/material/Popover";

const SideBar = ({green, yellow, orange}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
    <div
      className="h-screen overflow-y-auto flex-col flex items-center text-center pb-32 scrollBar"
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
        <span className="sideBarName">Approval</span>
      </div>
      <div className="sideBarItemWrap">
        <div className="flex justify-center">
          <span className="sideBarList">
            <i className="ri-line-chart-line"></i>
          </span>
        </div>
        <span className="sideBarName">Evaluation</span>
      </div>
      <div className="sideBarItemWrap">
        <div className="flex justify-center">
          <span className="sideBarList">
            <i className="ri-creative-commons-sa-line"></i>
          </span>
        </div>
        <span className="sideBarName">Review 360</span>
      </div>
      <div className="sideBarItemWrap">
        <div className="flex justify-center">
          <span className="sideBarList">
            <i className="ri-hard-drive-2-line"></i>
          </span>
        </div>
        <span className="sideBarName">Visitor Module</span>
      </div>
      <div className="sideBarItemWrap">
        <div className="flex justify-center">
          <span className="sideBarList">
            <i className="ri-customer-service-line"></i>
          </span>
        </div>
        <span className="sideBarName">Support</span>
      </div>
      <div className="sideBarItemWrap" onClick={handleClick}>
        <div className="flex justify-center">
          <span className="sideBarList">
            <i className="ri-settings-3-line"></i>
          </span>
        </div>
        <span className="sideBarName">Settings</span>
      </div>
     
      <div className="mt-28" />
      <div className="sideBarItemWrap">
        <div className="flex justify-center">
          <span className="sideBarList">
            <i className="ri-logout-circle-line"></i>
          </span>
        </div>
        <span className="sideBarName">Logout</span>
      </div>
    </div>

    {/* settings popup */}
    <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
  >
    <div className="flex items-center gap-4 p-9 rounded">
      <div
        className="h-4 w-4 rounded-full cursor-pointer"
        style={{ background: "#d69a00" }}
        onClick={yellow}
      />
      <div
        className="h-4 w-4 rounded-full cursor-pointer"
        style={{ background: "#01966b" }}
        onClick={green}
      />
      <div
        className="h-4 w-4 rounded-full cursor-pointer"
        style={{ background: "#ff6647" }}
        onClick={orange}
      />
    </div>
  </Popover>
    </>
  );
};

export default SideBar;
