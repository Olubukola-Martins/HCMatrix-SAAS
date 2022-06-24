import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import SideBar from "./SideBar";

const SubTopBar = () => {
  const [hideOrShow, setHideOrShow] = useState(false);
  const [moduleDrawer, setModuleDrawer] = useState({
    left: false,
  });

  const [featuresDrawer, setFeaturesDrawer] = useState({
    left: false,
  });

  const hideTrial = () => {
    if (window.scrollY >= 5) {
      setHideOrShow(true);
    } else {
      setHideOrShow(false);
    }
  };

  window.addEventListener("scroll", hideTrial);

  const toggleDrawer = (anchor, open) => () => {
    setModuleDrawer({ ...moduleDrawer, [anchor]: open });
  };

  const toggleDrawerFeatures = (anchor, open) => () => {
    setFeaturesDrawer({ ...moduleDrawer, [anchor]: open });
  };

  return (
    <>
      {/* Modules mobile drawer */}
      <Drawer open={moduleDrawer["left"]} onClose={toggleDrawer("left", false)}>
        <div className="flex items-center h-screen overflow-auto">
          <div className="Container flex gap-4 flex-col text-accent font-medium text-sm">
            <div className="module_list_item_mobile">
              <i className="ri-scales-line text-base"></i>
              <span>Performance</span>
            </div>
            <div className="module_list_item_mobile">
              <i className="ri-money-dollar-circle-line text-base"></i>
              <span>Payroll</span>
            </div>
            <div className="module_list_item_mobile">
              <i className="ri-team-line text-base"></i>
              <span>Manage employee</span>
            </div>
            <div className="module_list_item_mobile">
              <i className="ri-user-shared-2-line text-base"></i>
              <span>Recruitment</span>
            </div>
            <div className="module_list_item_mobile">
              <i className="ri-honour-line text-base"></i>
              <span>Attendance</span>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Features drawer mobile */}
      <Drawer
        open={featuresDrawer["left"]}
        onClose={toggleDrawerFeatures("left", false)}
      >
        <div>
          <SideBar/>
        </div>
      </Drawer>
      <div
        className="w-full shadow-lg py-3 flex items-center gap-3"
        style={{
          background: "var(--background)",
          boxShadow: "0px 15px 10px -15px var(--scrollBg)",
        }}
      >
        <div className="Container lg:hidden flex justify-between ">
          <span
            className="text-accent font-medium cursor-pointer hover:text-caramel"
            onClick={toggleDrawer("left", true)}
          >
            Modules
          </span>
          <i
            className="ri-menu-line text-accent text-xl cursor-pointer"
            onClick={toggleDrawerFeatures("left", true)}
          ></i>
        </div>
        <div className="Container hidden lg:flex  items-center md:flex-row flex-col gap-4 text-accent font-medium text-sm">
          <div className="module_list_item">
            <i className="ri-scales-line text-base"></i>
            <span>Performance</span>
          </div>
          <div className="module_list_item">
            <i className="ri-money-dollar-circle-line text-base"></i>
            <span>Payroll</span>
          </div>
          <div className="module_list_item">
            <i className="ri-team-line text-base"></i>
            <span>Manage employee</span>
          </div>
          <div className="module_list_item">
            <i className="ri-user-shared-2-line text-base"></i>
            <span>Recruitment</span>
          </div>
          <div className="module_list_item">
            <i className="ri-honour-line text-base"></i>
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
