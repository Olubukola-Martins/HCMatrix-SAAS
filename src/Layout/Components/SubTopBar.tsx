import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Themes from "../../Themes/Themes";
import { Link } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

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

  const toggleDrawer = (anchor: string, open: boolean) => () => {
    setModuleDrawer({ ...moduleDrawer, [anchor]: open });
  };

  const toggleDrawerFeatures = (anchor: string, open: boolean) => () => {
    setFeaturesDrawer({ ...moduleDrawer, [anchor]: open });
  };
  const signOut = useSignOut();
  const handleLogOut = () => signOut();

  return (
    <>
      {/* Modules mobile drawer */}
      <Drawer open={moduleDrawer["left"]} onClose={toggleDrawer("left", false)}>
        <Themes>
          <div className="  flex justify-end">
            <i
              className="ri-close-line text-right pt-5 text-xl cursor-pointer"
              onClick={toggleDrawer("left", false)}
            ></i>
          </div>
          <div
            className="flex items-center overflow-auto"
            style={{ height: "97vh" }}
          >
            <div className="  flex gap-4 flex-col text-accent font-medium">
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
        </Themes>
      </Drawer>

      {/* Features drawer mobile */}
      <Drawer
        open={featuresDrawer["left"]}
        onClose={toggleDrawerFeatures("left", false)}
      >
        <Themes>
          <div className="  flex justify-end">
            <i
              className="ri-close-line text-right pt-5 text-xl cursor-pointer"
              onClick={toggleDrawerFeatures("left", false)}
            ></i>
          </div>

          <div
            className="flex items-center overflow-auto"
            style={{ height: "97vh" }}
          >
            <div className="  flex gap-4 flex-col text-accent font-medium">
              <div className="module_list_item_mobile">
                <i className="ri-home-smile-line text-base"></i>
                <span>Home</span>
              </div>

              <div className="module_list_item_mobile">
                <i className="ri-check-double-line text-base"></i>
                <span>Approval</span>
              </div>

              <div className="module_list_item_mobile">
                <i className="ri-line-chart-line text-base"></i>
                <span>Evaluation</span>
              </div>

              <div className="module_list_item_mobile">
                <i className="ri-organization-chart text-base"></i>
                <span>Self-service</span>
              </div>

              <div className="module_list_item_mobile">
                <i className="ri-creative-commons-sa-line text-base"></i>
                <span>Review 360</span>
              </div>

              <div className="module_list_item_mobile">
                <i className="ri-hard-drive-2-line text-base"></i>
                <span>Visitor Module</span>
              </div>

              <div className="module_list_item_mobile">
                <i className="ri-customer-service-line text-base"></i>
                <span>Support</span>
              </div>
              <div
                className="module_list_item_mobile"
                onClick={() => handleLogOut()}
              >
                <i className="ri-logout-circle-line text-base"></i>
                <span>Logout</span>
              </div>
            </div>
          </div>
        </Themes>
      </Drawer>
      {/* Features drawer mobile End*/}

      <div
        className="w-full shadow-lg py-3 flex items-center gap-3"
        style={{
          background: "var(--background)",
          boxShadow: "0px 15px 10px -15px var(--scrollBg)",
        }}
      >
        <div className="  lg:hidden flex justify-between ">
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
        <div className="  hidden lg:flex  items-center md:flex-row flex-col gap-4 text-accent font-medium text-sm">
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
          <Link to="/disciplinary">Disciplinary</Link>
        </div>
      </div>
      {hideOrShow ? (
        ""
      ) : (
        <div className="  text-right">
          <span className="text-xs text-caramel font-medium">
            Enjoy your free 30 days trial
          </span>
        </div>
      )}
    </>
  );
};

export default SubTopBar;
