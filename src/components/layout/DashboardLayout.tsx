import { useState } from "react";
import { Outlet } from "react-router-dom";
import GlobalSupport from "components/GlobalSupport";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import AdminWelcomeContainer from "components/AdminWelcomeContainer";
import ApprovalContainer from "components/ApprovalContainer";
import UserFeedbackContainer from "components/UserFeedbackContainer";
import useHandleColorTheme from "hooks/theme/useHandleColorTheme";

const DashboardLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  const { color, mode } = useHandleColorTheme(); //TODO: Remove this after verifying its not needed for the div its passed to

  return (
    <>
      <UserFeedbackContainer />
      <AdminWelcomeContainer />
      <ApprovalContainer />
      <div className="mode_color" data-theme={mode} color-theme={color}>
        <div className="h-screen overflow-y-auto">
          <TopBar
            sidebarToggle={sidebarToggle}
            setSidebarToggle={() => setSidebarToggle(!sidebarToggle)}
          />
          <GlobalSupport />
          <div className="flex w-full relative">
            <div
              className={
                sidebarToggle
                  ? "w-28 fixed z-40 overflow-hidden lg:flex hidden transition-all duration-500 ease-in-out"
                  : "w-0 overflow-hidden "
              }
            >
              <SideBar />
            </div>

            <div
              className={
                sidebarToggle
                  ? "w-full lg:pl-28 mt-4 pb-10"
                  : "lg:pl-0 w-full transition-all duration-500 ease-in-out mt-4 pb-10"
              }
            >
              <main className="Containe">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
